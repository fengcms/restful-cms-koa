// 获取单条数据方法
const { models } = require(':@/model')
module.exports = async (ctx, model, method, params, id) => {
  const condition = id === 'first' ? {} : { where: { id } }
  const res = await models[model]
    .findOne(condition)
    .then(r => r)
    .catch(() => null)
  return res
}
