'use strict';

const Router = require('express').Router,
      LeanCloud = require('leanengine'),
      Utility = require('../utility');

const User = Router(),
      Appraise = Router(),
      LCObject = LeanCloud.Object,
      UserTag = LeanCloud.Object.extend('UserTag');


/**
 * @api {post} /user/:uid/tag 添加用户标签
 *
 * @apiName    addUserTag
 * @apiVersion 1.0.0
 * @apiGroup   UserTag
 *
 * @apiParam {String} uid 用户索引
 * @apiParam {String} id  标签索引
 */
User.post('/:uid/tag',  function (request, response) {

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
User.delete('/:uid/tag/:id',  function (request, response) {

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
 */
User.get('/:id/tag',  function (request, response) {

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

            data.total = data.list.length;

            return data;
        })
    );
});


/**
 * @api {get} /user/:id/appraise 查询贴标记录
 *
 * @apiName    listUserAppraise
 * @apiVersion 1.0.0
 * @apiGroup   UserTag
 *
 * @apiParam {String} id 用户索引
 *
 * @apiUse List_Query
 *
 * @apiSuccess {Object} list.user 用户
 * @apiSuccess {Object} list.tag  标签
 */
User.get('/:id/appraise',  function (request, response) {

    Utility.reply(
        response,
        Utility.query.call(
            request.currentUser,
            {user:  LCObject.createWithoutData('_User', request.params.id)},
            'UserTag',
            null,
            ['user', 'tag', 'creator']
        )
    );
});


/**
 * @api {get} /appraise 全局查询贴标记录
 *
 * @apiName    listAppraise
 * @apiVersion 1.0.0
 * @apiGroup   UserTag
 *
 * @apiUse List_Query
 *
 * @apiSuccess {Object} list.user 用户
 * @apiSuccess {Object} list.tag  标签
 */
Appraise.get('/appraise',  function (request, response) {

    Utility.reply(
        response,
        Utility.query(
            request.query,  'UserTag',  null,  ['user', 'tag', 'creator']
        )
    );
});



Appraise.use('/user', Utility.checkSession, User);



module.exports = Appraise;
