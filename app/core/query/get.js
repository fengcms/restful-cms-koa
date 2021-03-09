// 获取单条数据方法
const { models } = require(':@/model')
module.exports = async (ctx, model, method, params, id) => {
  const condition = id === 'first' ? {} : { where: { id } }
  const res = await models[model].findOne(condition)
  if (res == null && Object.keys(ctx).length) ctx.throw(404, '404')
  return res
}
