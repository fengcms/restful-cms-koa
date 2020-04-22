const { models } = require(':@/model')
module.exports = async (ctx, model, method, params, id) => {
  const res = await models[model]
    .findOne({
      where: { id }
    })
    .then(r => r.dataValues)
    .catch(() => null)
  return res
}
