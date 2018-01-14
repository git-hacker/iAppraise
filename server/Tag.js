'use strict';

const URL_Utility = require('url'),
      router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');



router.get('/tag',  function (request, response) {

    response.json({total: 0});
});


module.exports = router;
