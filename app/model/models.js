const Sequelize = require('sequelize')
const { STRING, INTEGER, TEXT, DATE, NOW } = Sequelize

// 自定义私有字段类型
const privateTypes = {
  Mobile: {
    type: INTEGER,
    validate: {
      is: /^1[3456789]\d{9}$/i
    }
  },
  Url: {
    type: STRING,
    validate: {
      isUrl: true
    }
  },
  Email: {
    type: STRING,
    validate: {
      isEmail: true
    }
  },
  Date: { type: DATE, defaultValue: NOW }
}

module.exports = {
  // 文章表
  Article: {
    title: STRING, // 文章标题
    channel_id: INTEGER, // 归属栏目ID
    description: TEXT, // 文章描述
    tags: TEXT, // 文章 Tag
    content: TEXT, // 正文
    markdown: TEXT, // markdown 格式正文
    img: STRING, // 文章封面图片
    author: STRING, // 文章作者
    origin: STRING, // 文章来源
    editor: STRING, // 文章编辑
    hits: INTEGER, // 文章点击热度
    isdelete: STRING, // 文章是否删除
    time: privateTypes.Date
  },
  // 文章栏目
  Channel: {
    pid: INTEGER, // 归属父ID
    name: STRING, // 栏目名称
    sort: INTEGER, // 栏目排序
    keywords: STRING, // 栏目关键词
    description: TEXT, // 栏目描述
    time: privateTypes.Date
  },
  // 超级管理员
  Manages: {
    account: STRING, // 超级管理员账号
    password: TEXT, // 超级管理员密码
    name: STRING, // 姓名
    mobile: privateTypes.Mobile,
    email: privateTypes.Email,
    time: privateTypes.Date
  },
  // 站点基本信息配置
  Site: {
    name: STRING, // 站点名称
    title: STRING, // 站点标题
    logo: STRING, // 站点 logo
    keywords: TEXT, // 站点关键词
    description: TEXT, // 站点描述
    copyright: TEXT, // 站点版权
    time: privateTypes.Date
  },
  // 作者
  Author: {
    name: STRING, // 作者姓名
    avatar: STRING, // 作者头像
    mark: TEXT, // 备注
    mobile: privateTypes.Mobile,
    email: privateTypes.Email,
    website: privateTypes.Url,
    time: privateTypes.Date
  },
  // 来源
  Origin: {
    name: STRING,
    avatar: STRING,
    mark: TEXT,
    mobile: privateTypes.Mobile,
    email: privateTypes.Email,
    website: privateTypes.Url,
    time: privateTypes.Date
  },
  // 文章编辑
  Editor: {
    account: STRING,
    password: TEXT,
    name: STRING,
    avatar: STRING,
    mobile: privateTypes.Mobile,
    email: privateTypes.Email,
    website: privateTypes.Url,
    time: privateTypes.Date
  },
  // 关键词
  Tags: {
    tag: STRING,
    channel_id: INTEGER,
    hits: INTEGER,
    time: privateTypes.Date
  }
}
