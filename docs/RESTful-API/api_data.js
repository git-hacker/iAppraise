define({ "api": [
  {
    "type": "post",
    "url": "/tag",
    "title": "新增标签",
    "name": "addTag",
    "version": "1.0.0",
    "group": "Tag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..10",
            "optional": false,
            "field": "title",
            "description": "<p>标签名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "-1",
              "0",
              "1"
            ],
            "optional": false,
            "field": "type",
            "description": "<p>褒贬义（-1：贬义；0：中性；1：褒义）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>标签索引</p>"
          }
        ]
      }
    },
    "filename": "server/Tag.js",
    "groupTitle": "Tag",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/tag"
      }
    ]
  },
  {
    "type": "get",
    "url": "/tag",
    "title": "全局查询标签",
    "name": "listTag",
    "version": "1.0.0",
    "group": "Tag",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.title",
            "description": "<p>标签名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.type",
            "description": "<p>褒贬义</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.count",
            "description": "<p>引用计数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    },
    "filename": "server/Tag.js",
    "groupTitle": "Tag",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/tag"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/user/session/SMSCode",
    "title": "发送短信验证码",
    "name": "createSMSCode",
    "version": "1.0.0",
    "group": "UserSession",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobilePhoneNumber",
            "description": "<p>手机号</p>"
          }
        ]
      }
    },
    "filename": "server/User/Session.js",
    "groupTitle": "UserSession",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/session/SMSCode"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/session",
    "title": "用户登录",
    "name": "createUserSession",
    "version": "1.0.0",
    "group": "UserSession",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobilePhoneNumber",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "SMSCode",
            "description": "<p>短信验证码</p>"
          }
        ]
      }
    },
    "filename": "server/User/Session.js",
    "groupTitle": "UserSession",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/session"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/user/session",
    "title": "用户登出",
    "name": "deleteUserSession",
    "version": "1.0.0",
    "group": "UserSession",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Cookie",
            "description": ""
          }
        ]
      }
    },
    "filename": "server/User/Session.js",
    "groupTitle": "UserSession",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/session"
      }
    ]
  },
  {
    "type": "get",
    "url": "/session",
    "title": "查询当前用户会话",
    "name": "getUserSession",
    "version": "1.0.0",
    "group": "UserSession",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Cookie",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobilePhoneNumber",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "QQ",
            "description": "<p>QQ 号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "WeChat",
            "description": "<p>微信号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
    },
    "filename": "server/User/Session.js",
    "groupTitle": "UserSession",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/session"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/:uid/tag",
    "title": "添加用户标签",
    "name": "addUserTag",
    "version": "1.0.0",
    "group": "UserTag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>用户索引</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>标签索引</p>"
          }
        ]
      }
    },
    "filename": "server/User/UserTag.js",
    "groupTitle": "UserTag",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/:uid/tag"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/:id/tag",
    "title": "查询用户标签",
    "name": "listUserTag",
    "version": "1.0.0",
    "group": "UserTag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户索引</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.title",
            "description": "<p>标签名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.type",
            "description": "<p>褒贬义</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.count",
            "description": "<p>引用计数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    },
    "filename": "server/User/UserTag.js",
    "groupTitle": "UserTag",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/:id/tag"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/user/:uid/tag/:id",
    "title": "取消用户标签",
    "name": "removeUserTag",
    "version": "1.0.0",
    "group": "UserTag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>用户索引</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>标签索引</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "Creator"
      }
    ],
    "filename": "server/User/UserTag.js",
    "groupTitle": "UserTag",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/:uid/tag/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user",
    "title": "新增用户",
    "name": "createUser",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobilePhoneNumber",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "QQ",
            "description": "<p>QQ 号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "WeChat",
            "description": "<p>微信号</p>"
          }
        ]
      }
    },
    "filename": "server/User/index.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "获取用户信息",
    "name": "getUser",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户索引</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobilePhoneNumber",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "QQ",
            "description": "<p>QQ 号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "WeChat",
            "description": "<p>微信号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
    },
    "filename": "server/User/index.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user",
    "title": "全局查询用户",
    "name": "listUser",
    "version": "1.0.0",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.mobilePhoneNumber",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.QQ",
            "description": "<p>QQ 号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.WeChat",
            "description": "<p>微信号</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>唯一索引</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.creator",
            "description": "<p>创建者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.editor",
            "description": "<p>编辑者</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>结果总数</p>"
          }
        ]
      }
    },
    "filename": "server/User/index.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rows",
            "defaultValue": "10",
            "description": "<p>结果行数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>结果页码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyWord",
            "description": "<p>关键词</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "修改用户信息",
    "name": "updateUser",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户索引</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "mobilePhoneNumber",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "QQ",
            "description": "<p>QQ 号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "WeChat",
            "description": "<p>微信号</p>"
          }
        ]
      }
    },
    "filename": "server/User/index.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/:id"
      }
    ]
  }
] });
