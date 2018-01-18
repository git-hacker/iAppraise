'use strict';

const Router = require('express').Router,
      LeanCloud = require('leanengine'),
      Utility = require('../utility');

const User = Router(), Person = Router();


User.use('/user', require('./Session'));


/**
 * @api {post} /user 新增用户
 *
 * @apiName    createUser
 * @apiVersion 1.0.0
 * @apiGroup   User
 *
 * @apiParam {String}      mobilePhoneNumber 手机号
 * @apiParam {String{5..}} [QQ]              QQ 号
 * @apiParam {String}      [WeChat]          微信号
 */
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


/**
 * @api {put} /user/:id 修改用户信息
 *
 * @apiName    updateUser
 * @apiVersion 1.0.0
 * @apiGroup   User
 *
 * @apiParam {String}      id                  用户索引
 * @apiParam {String}      [mobilePhoneNumber] 手机号
 * @apiParam {String{5..}} [QQ]                QQ 号
 * @apiParam {String}      [WeChat]            微信号
 */
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


/**
 * @api {get} /user/:id 获取用户信息
 *
 * @apiName    getUser
 * @apiVersion 1.0.0
 * @apiGroup   User
 *
 * @apiParam {String} id 用户索引
 *
 * @apiUse Model_Meta
 *
 * @apiSuccess {String} username          用户名
 * @apiSuccess {String} mobilePhoneNumber 手机号
 * @apiSuccess {String} QQ                QQ 号
 * @apiSuccess {String} WeChat            微信号
 */
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
 * @apiSuccess {String} list.username          用户名
 * @apiSuccess {String} list.mobilePhoneNumber 手机号
 * @apiSuccess {String} list.QQ                QQ 号
 * @apiSuccess {String} list.WeChat            微信号
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


User.use('/user', Utility.checkSession, Person);



module.exports = User;
