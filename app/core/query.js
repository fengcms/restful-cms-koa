const { models } = require(':@/model')

const ls = async (ctx, model, method, params, id) => {
}

const post = async (ctx, model, method, params, id) => {
  let resId = null
  await (async () => {
    const res = await models[model].create(params)
    resId = res.id
  })()
  return { id: resId }
}
const get = async (ctx, model, method, params, id) => {}
const put = async (ctx, model, method, params, id) => {}
const del = async (ctx, model, method, params, id) => {}

module.exports = {
  ls, post, get, put, del
}
