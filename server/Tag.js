'use strict';

const router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');

const Tag = LeanCloud.Object.extend('Tag');


/**
 * @api {post} /tag 新增标签
 *
 * @apiName    addTag
 * @apiVersion 1.0.0
 * @apiGroup   Tag
 *
 * @apiParam {String{1..10}} title 标签名
 * @apiParam {Number=-1,0,1} type  褒贬义（-1：贬义；0：中性；1：褒义）
 *
 * @apiSuccess {String} id 标签索引
 *
 * @apiSampleRequest
 */
router.post('/tag',  Utility.checkSession,  function (request, response) {

    request.body.count = 0;

    Utility.reply(response,  (new Tag()).save( request.body ));
});


/**
 * @api {get} /tag 全局查询标签
 *
 * @apiName    listTag
 * @apiVersion 1.0.0
 * @apiGroup   Tag
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String} list.title 标签名
 * @apiSuccess {Number} list.type  褒贬义
 * @apiSuccess {Number} list.count 引用计数
 *
 * @apiSampleRequest
 */
router.get('/tag',  function (request, response) {

    Utility.reply(
        response,  Utility.query(request.query, 'Tag', ['title', 'type'])
    );
});


module.exports = router;
