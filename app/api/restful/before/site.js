const { getItem } = require(':query')
const { succ } = global.tool
module.exports = {
  async ls (params, role, ctx) {
    const res = await getItem('Site', 'first')
    ctx.body = succ(res)
  }
}
