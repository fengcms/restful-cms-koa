const { models } = require(':@/model')
const { logger } = global.tool

module.exports = async (ctx, model, method, params, id) => {
  // 构建返回数据结构
  const res = { succ: [], fail: [] }
  const ids = id.split(',')
  await Promise.all(ids.map(async id => {
    const dat = await models[model]
      .findOne({ where: { id }, raw: false })
      .catch(e => logger.error(e.message))
    if (dat) {
      await dat.destroy()
      res.succ.push(dat.id)
    } else {
      res.fail.push(id)
    }
  }))
  return res
}
