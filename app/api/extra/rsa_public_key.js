const { RSA_PUBLIC_KEY_PATH } = require(':config').KEY
const { succ, readTextFile } = global.tool
module.exports = async ctx => {
  const publicKey = await readTextFile(RSA_PUBLIC_KEY_PATH)
  ctx.body = succ(publicKey)
}
