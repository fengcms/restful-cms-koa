const { RSA_PUBLIC_KEY_PATH } = require(':config').KEY
const { succ, readTextFile } = global.tool
module.exports = async (ctx, params, roleName, next) => {
  const publicKey = await readTextFile(RSA_PUBLIC_KEY_PATH)
  ctx.body = succ(publicKey)
}
