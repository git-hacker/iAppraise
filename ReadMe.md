# iAppraise 匿名点评系统

活雷锋、渣男、渣女统统现形！



## 【原型设计】

https://github.com/git-hacker/iAppraise/milestones



## 【参与开发】


### （〇）本机运行

 1. [安装 LeanCloud 命令行工具](https://leancloud.cn/docs/leanengine_cli.html#hash1443149115)

 2. [登录 LeanCloud 账号](https://leancloud.cn/docs/leanengine_cli.html#hash964666)

 3. [关联 LeanCloud 应用](https://leancloud.cn/docs/leanengine_cli.html#hash963776493)

 4. 安装、启动命令：
```
npm install

lean up
```

Web 服务 URL —— http://localhost:3000/


### （一）前端架构

 - UI 组件库：[BootEWA](https://boot-web.tk/)

 - 模块化规范：[AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)

 - MVVM 引擎：[EasyWebApp v4.0+](https://tech_query.oschina.io/easywebapp/)

 - CDN 服务：[BootCDN](http://www.bootcdn.cn/)（依赖库唯一来源，不要写在 `package.json` 中）


### （二）后端架构

 - HTTP 服务器：[Express.js](https://expressjs.com/zh-cn/)

 - 接口文档：https://appraise.leanapp.cn/RESTful-API/

 - 调试工具（推荐）：[NIM](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj)


### （三）编码规范

 - 缩进：**4 半角空格**
 - 行宽：**80 半角字符**
 - 留白：分隔符间一空格，较长语句间一空行
 - 语法：**ECMAScript 5**
 - API：HTML 5、CSS 3、ECMAScript 6

【注】请使用[支持 EditorConfig 规范的代码编辑器（或 第三方插件）](http://editorconfig.org/#download)
