'use strict';

const router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('../utility');



router.get('/',  function (request, response) {

    Utility.reply(
        response,
        request.currentUser  ?  request.currentUser.fetch()  :  Promise.resolve({ })
    );
});


router.post('/SMSCode',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Cloud.requestSmsCode( request.body.mobilePhoneNumber )
    );
});


router.post('/',  function (request, response) {

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


router.delete('/',  function (request, response) {

    if (! request.currentUser)  return;

    request.currentUser.logOut();

    response.clearCurrentUser();

    response.json({ });
});


module.exports = router;
