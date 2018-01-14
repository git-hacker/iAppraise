'use strict';

const URL_Utility = require('url'),
      router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');



router.get('/user/session',  function (request, response) {

    Utility.reply(response, request.currentUser.fetch());
});


router.post('/user/SMSCode',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Cloud.requestSmsCode( request.body.mobilePhoneNumber )
    );
});


router.post('/user/session',  function (request, response) {

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


router.get('/user/signOut',  function (request, response) {

    request.currentUser.logOut();

    response.clearCurrentUser();

    response.redirect(URL_Utility.resolve(request.headers.referer, '/'));
});


router.post('/user',  function (request, response) {

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


router.all('/user/profile',  function (request, response) {

    var user = request.currentUser, data = request.body, error;

    if ( user ) {
        switch ( request.method.toUpperCase() ) {
            case 'PUT':
                return  Utility.reply(
                    response,
                    user.save(
                        {
                            email:                data.email || null,
                            mobilePhoneNumber:    data.mobilePhoneNumber || null,
                            profile:              data
                        },
                        {user: user}
                    ).then(function () {

                        return data.SMS_Code ?
                            LeanCloud.User.verifyMobilePhone( data.SMS_Code )  :
                            arguments[0];
                    })
                );
            case 'GET':
                return response.json(Object.assign(
                    {
                        emailVerified:          user.get('emailVerified'),
                        mobilePhoneVerified:    user.get('mobilePhoneVerified')
                    },
                    user.get('profile')
                ));
            default:       {
                error = new URIError('Method Not Allowed');

                error.status = 405;
            }
        }
    } else {
        error = new ReferenceError('Unauthorized');

        error.status = 401;
    }

    throw error;
});


router.put('/user/:id',  function (request, response) {

    var user = new LeanCloud.Object.createWithoutData('_User', request.params.id);

    Utility.reply(
        response,
        user.save(request.body, {
            user:            request.currentUser,
            useMasterKey:    true
        })
    );
});


router.get('/user/:id',  function (request, response) {

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
router.get('/user',  function (request, response) {

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


module.exports = router;
