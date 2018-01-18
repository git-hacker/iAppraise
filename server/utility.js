'use strict';

/** @module utility */

const LeanCloud = require('leanengine');



function fixData(data) {

    if (! (data != null))  return;

    if (data.toJSON instanceof Function)  data = data.toJSON();

    if ( data.objectId ) {

        data.id = data.objectId;

        delete data.objectId;
    }

    delete data.authData;

    return data;
}


function fetchPointer(data) {

    var fetch = [ ], _data_ = data.attributes;

    for (let key in _data_)
        if (_data_[ key ]  instanceof  LeanCloud.Object)
            fetch.push([key,  _data_[ key ]]);

    data = fixData( data );

    return  Promise.all(fetch.map(function (item) {

        return LeanCloud.Object.createWithoutData(
            item[1].className, item[1].id
        ).fetch().then(function (_data_) {

            data[ item[0] ] = fixData(_data_);

            _data_ = _data_.attributes;

            for (let key in _data_)
                if (_data_[ key ]  instanceof  LeanCloud.Object)
                    delete  data[ item[0] ][ key ];
        });
    })).then(function () {  return data;  });
}


/**
 * 承诺对象
 *
 * @typedef {Promise} Promise
 *
 * @see     {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 */

/**
 * 响应异步结果
 *
 * @author TechQuery <shiy007@qq.com>
 *
 * @param  {Response} response - Express 响应对象
 * @param  {Promise}  promise  - 异步查询
 *
 * @return {Promise}
 */
exports.reply = function (response, promise) {

    return  promise.then( fetchPointer ).then(function (data) {

        response.json( data ).end();

    },  function (error) {

        response.status(error.status || 400).json({
            code:       error.code,
            message:    error.message || error.rawMessage
        }).end();
    });
};


/**
 * 会话验证中间件
 *
 * @author TechQuery
 *
 * @param {object}   request
 * @param {object}   response
 * @param {function} next
 */
exports.checkSession = function (request, response, next) {
    if (
        (
            (request.hostname === 'localhost')  &&    //  APIDoc Sample
            (request.headers['x-requested-with'] === 'XMLHttpRequest')
        ) ||
        (request.currentUser instanceof LeanCloud.User)
    )
        return next();

    var error = new ReferenceError('Unauthorized');

    error.status = 401;

    exports.reply(response,  Promise.reject( error ));
};


function conditionOf(where, parameter) {

    var pointer = [ ], like = '';

    for (let key in parameter) {

        let item = parameter[ key ];

        if (item instanceof LeanCloud.Object)
            pointer.push(
                `${key} = pointer('${item.className}', '${item.id}')`
            );
    }

    pointer = pointer.join(' and ');

    if ((where || '')[0]  &&  parameter.keyWord)
        like = where.map(function () {

            return  `${arguments[0]} like ${
                JSON.stringify(`%${parameter.keyWord}%`)
            }`;
        }).join(' or ');

    where = (pointer && like)  ?
        `${pointer} and (${like})`  :  (pointer || like);

    return  where  ?  `where (${where})`  :  '';
}


function queryList(table, where, include, rows, page) {

    var link = include || '';

    if ( link[0] )
        link = link.map(function () {

            return  `include ${arguments[0]}`;

        }).join(', ')  +  ', ';

    return LeanCloud.Query.doCloudQuery(
        `select ${link}* from ${table} ${where} limit ${(page - 1) * rows},${rows}`,
        this
    ).then(function (data) {

        return  data.results.map(function (item) {

            item = fixData( item );

            for (let key of include)  item[ key ] = fixData( item[ key ] );

            return item;
        });
    });
}


function queryCount(table, where) {

    return LeanCloud.Query.doCloudQuery(
        `select count(*) from ${table} ${where}`,  this
    );
}


/**
 * 批量查询
 *
 * @author TechQuery <shiy007@qq.com>
 *
 * @param  {object}       parameter    - 查询条件（如 Express 中的 `request.query`）
 * @param  {string|Array} table        - 数据表名（单表查询 或 列表计数）
 * @param  {string[]}     [where=[]]   - 模糊查询的字段
 * @param  {string[]}     [include=[]] - 查询包含的其它表数据
 *
 * @return {Promise}  查询结果
 */
exports.query = function (parameter, table, where = [ ], include = [ ]) {

    Object.assign(parameter, {
        rows:       parameter.rows || 10,
        page:       parameter.page || 1,
        keyWord:    (parameter.keyWord || '').trim()
    });

    where = conditionOf(where, parameter);

    var auth = (this instanceof LeanCloud.User)  ?  {user: this}  :  { },
        count = { };

    if (table instanceof Array)
        return  Promise.all(table.map(function (name) {

            return  queryCount.call(auth, name, where).then(function (data) {

                count[ data.className ] = data.count;
            });
        })).then(function () {

            return count;
        });

    return Promise.all([
        queryCount.call(auth, table, where),
        queryList.call(
            auth,  table,  where,  include,  parameter.rows,  parameter.page
        )
    ]).then(function (data) {

        return {
            total:    data[0].count,
            list:     data[1]
        };
    });
};


/**
 * 对象数组分组计数
 *
 * @author TechQuery
 *
 * @param {object[]} list
 *
 * @return {object[]}
 */
exports.groupBy = function (list) {

    var map = { }, rows = [ ];

    for (let item of list)
        if (item.id in map)
            map[ item.id ].count++;
        else {
            (map[ item.id ] = Object.assign({ }, item)).count = 1;

            rows.push( map[item.id] );
        }

    return rows;
};
