const PERMISSION = require('./permission')
const { DB_CONN, DB_PREFIX, DB_NAME, DB_USERNAME, DB_PASSWORD } = require('./database')
const path = require('path')

// app 运行设置
const APP_HOST = {
  host: '0.0.0.0',
  port: 4000
}
// 项目接口前缀
const API_PREFIX = '/api/v1/'

// 分页列表默认每页条数
const PAGE_SIZE = 10

// 设置 RSA 秘钥文件配置
const KEY = {
  RSA_PRIVATE_KEY_PATH: path.resolve(__dirname, './key/rsa_private_key.pem'),
  RSA_PUBLIC_KEY_PATH: path.resolve(__dirname, './key/rsa_public_key.pem')
}

// 系统目录设置
const APP_DIR = {
  TMP_DIR: path.resolve(process.cwd(), './tmp'),
  LOG_DIR: path.resolve(process.cwd(), './log')
}

/*
  session type 支持 memory 内存存储 和 file 文件存储
  除非是在开发阶段 否则推荐 memory 存储
  因为 file 存储的 session 文件不会自动删除，会越来越多
  有更高要求，可参考 memory 写法，增加 redis 数据库
    代码在 /app/core/session.js
*/
const SESSION_TYPE = 'file'

// 初始化数据库时是否添加测试数据
const IS_POST_TEST_DB = true

module.exports = {
  DB_CONN,
  DB_PREFIX,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  APP_HOST,
  API_PREFIX,
  PAGE_SIZE,
  PERMISSION,
  KEY,
  APP_DIR,
  SESSION_TYPE,
  IS_POST_TEST_DB
}
