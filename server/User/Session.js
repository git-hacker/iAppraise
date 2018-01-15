'use strict';

const router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('../utility');


/**
 * @api {get} /session 查询当前用户会话
 *
 * @apiName    getUserSession
 * @apiVersion 1.0.0
 * @apiGroup   UserSession
 *
 * @apiHeader {String} Cookie
 *
 * @apiUse Model_Meta
 *
 * @apiSuccess {String} username          用户名
 * @apiSuccess {String} mobilePhoneNumber 手机号
 * @apiSuccess {String} QQ                QQ 号
 * @apiSuccess {String} WeChat            微信号
 */
router.get('/session',  function (request, response) {

    Utility.reply(
        response,
        request.currentUser  ?  request.currentUser.fetch()  :  Promise.resolve({ })
    );
});


/**
 * @api {post} /user/session/SMSCode 发送短信验证码
 *
 * @apiName    createSMSCode
 * @apiVersion 1.0.0
 * @apiGroup   UserSession
 *
 * @apiParam {String} mobilePhoneNumber 手机号
 */
router.post('/session/SMSCode',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Cloud.requestSmsCode( request.body.mobilePhoneNumber )
    );
});


/**
 * @api {post} /user/session 用户登录
 *
 * @apiName    createUserSession
 * @apiVersion 1.0.0
 * @apiGroup   UserSession
 *
 * @apiParam {String} mobilePhoneNumber 手机号
 * @apiParam {String} SMSCode           短信验证码
 */
router.post('/session',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.User.signUpOrlogInWithMobilePhone(
            request.body.mobilePhoneNumber, request.body.SMSCode
        ).then(function (user) {

            response.saveCurrentUser( user );

            return user;
        })
    );
});


/**
 * @api {delete} /user/session 用户登出
 *
 * @apiName    deleteUserSession
 * @apiVersion 1.0.0
 * @apiGroup   UserSession
 *
 * @apiHeader {String} Cookie
 */
router.delete('/session',  function (request, response) {

    if (! request.currentUser)  return;

    request.currentUser.logOut();

    response.clearCurrentUser();

    response.json({ });
});


module.exports = router;
