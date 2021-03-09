/*
  创建数据方法
  1. 创建单条数据方法
    URL:    /xxx
    DATA:   {...}
  2. 创建多条数据方法
    URL:    /xxx
    DATA:   [{...}, {...}, {...}, {...}]
*/

const { models } = require(':@/model')
const { toType, filterObjectXss } = global.tool
module.exports = async (ctx, model, method, params) => {
  // 如果是单条数据，则转化为多条数据，共用后续处理
  if (toType(params) === 'object') params = [params]
  // 数据基本格式校验
  params.forEach(r => {
    if (r.id) ctx.throw(412, '添加新数据，数据不得包含ID字段')
    if (Object.keys(r).length === 0) ctx.throw(412, '添加新数据，数据不得为空')
  })

  const res = { ids: [] }
  await Promise.all(params.map(async item => {
    item = filterObjectXss(item)
    const id = await models[model]
      .create(item)
      .then(r => r.id)
    res.ids.push(id)
  }))
  return res
}
