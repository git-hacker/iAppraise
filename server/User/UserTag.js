'use strict';

const router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('../utility');

const LCObject = LeanCloud.Object, UserTag = LeanCloud.Object.extend('UserTag');


/**
 * @api {post} /user/:uid/tag 添加用户标签
 *
 * @apiName    addUserTag
 * @apiVersion 1.0.0
 * @apiGroup   UserTag
 *
 * @apiParam {String} uid 用户索引
 * @apiParam {String} id  标签索引
 *
 * @apiSampleRequest
 */
router.post('/:uid/tag',  function (request, response) {

    Utility.reply(
        response,
        (new UserTag()).save({
            creator:    request.currentUser,
            tag:        LCObject.createWithoutData('Tag', request.body.id),
            user:       LCObject.createWithoutData('_User', request.params.uid)
        })
    );
});


/**
 * @api {delete} /user/:uid/tag/:id 取消用户标签
 *
 * @apiName    removeUserTag
 * @apiVersion 1.0.0
 * @apiGroup   UserTag
 *
 * @apiParam {String} uid 用户索引
 * @apiParam {String} id  标签索引
 *
 * @apiPermission Creator
 */
router.delete('/:uid/tag/:id',  function (request, response) {

    Utility.reply(
        response,
        (new LeanCloud.Query('UserTag')).equalTo(
            'user',  LCObject.createWithoutData('_User', request.params.uid)
        ).equalTo(
            'tag',  LCObject.createWithoutData('Tag', request.params.id)
        ).first().then(function (relation) {

            return relation.destroy();
        })
    );
});


/**
 * @api {get} /user/:id/tag 查询用户标签
 *
 * @apiName    listUserTag
 * @apiVersion 1.0.0
 * @apiGroup   UserTag
 *
 * @apiParam {String} id 用户索引
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String} list.title 标签名
 * @apiSuccess {Number} list.type  褒贬义
 * @apiSuccess {Number} list.count 引用计数
 *
 * @apiSampleRequest
 */
router.get('/:id/tag',  function (request, response) {

    Utility.reply(
        response,
        Utility.query.call(
            request.currentUser,
            {user:  LCObject.createWithoutData('_User', request.params.id)},
            'UserTag',
            null,
            ['tag']
        ).then(function (data) {

            data.list = Utility.groupBy(data.list.map(function (relation) {

                return relation.tag;
            }));

            return data;
        })
    );
});


module.exports = router;
