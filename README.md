# openapi-extends-mock

## 项目目的
这是一份个人练习作品。目的如下：
- 学习sequelize ORM，侧重migrate迁移。 达成渐进开发。
- 严格按照TDD（测试驱动开发Test-Driven Development）原则进行开发。
- 完善与扩展[egg-openapi-router](https://npmjs.org/package/egg-openapi-router)的功能

## 项目内容规划
山寨一个类似POSTMAN的API项目管理工具。

用户给定OpenAPI文档（可多个），服务器构建符合文档描述规范的mock server。

## 功能参考
- [POSTMAN](https://www.postman.com/)
- [easy-mock](https://github.com/easy-mock/easy-mock)

## 依赖本人项目：
- [egg-openapi-router](https://npmjs.org/package/egg-openapi-router)
- [@rickyli79/json-schema-mock](https://github.com/RickyLi79/json-schema-mock)