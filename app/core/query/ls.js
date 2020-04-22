const { models } = require(':@/model')
const { PAGE_SIZE } = require(':config')
module.exports = async (ctx, model, method, params) => {
  const { pageSize = PAGE_SIZE, page = 0 } = params || {}
  const offset = page * pageSize
  const res = await models[model].findAndCountAll({
    offset,
    limit: pageSize
  }).then(r => {
    return {
      page,
      list: r.rows,
      count: r.count
    }
  })
  return res
}
