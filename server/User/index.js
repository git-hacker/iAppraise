'use strict';

const Router = require('express').Router,
      LeanCloud = require('leanengine'),
      Utility = require('../utility');

const User = Router(), Person = Router();


User.use('/session', require('./Session'));



Person.post('/',  function (request, response) {

    var data = request.body, user = new LeanCloud.User();

    Utility.reply(
        response,
        user.save(Object.assign(data, {
            username:    data.mobilePhoneNumber || data.email ||
                (data.QQ && `QQ_${data.QQ}`)  ||
                (data.WeChat && `WeChat_${data.WeChat}`),
            password:    Math.random() + ''
        }))
    );
});


Person.put('/:id',  function (request, response) {

    var user = new LeanCloud.Object.createWithoutData('_User', request.params.id);

    Utility.reply(
        response,
        user.save(request.body, {
            user:            request.currentUser,
            useMasterKey:    true
        })
    );
});


Person.get('/:id',  function (request, response) {

    Utility.reply(
        response,
        (new LeanCloud.Query('_User')).equalTo('objectId', request.params.id).first()
    );
});


/**
 * @api {get} /user 全局查询用户
 *
 * @apiName    listUser
 * @apiVersion 1.0.0
 * @apiGroup   User
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String} list.username  用户名
 */
Person.get('/',  function (request, response) {

    Utility.reply(
        response,
        Utility.query.call(
            request.currentUser,
            request.query,
            '_User',
            ['username', 'email', 'mobilePhoneNumber', 'QQ', 'WeChat']
        )
    );
});


User.use(Utility.checkSession, Person);



module.exports = User;
