const crypto = require('crypto')

const beHash = (str, type) => {
  const hash = crypto.createHash(type)
  hash.update(str)
  return hash.digest('hex')
}

const getStrMd5 = (str) => {
  return beHash(str, 'md5')
}
const getStrSha1 = (str) => {
  return beHash(str, 'sha1')
}
const getStrSha256 = (str) => {
  return beHash(str, 'sha256')
}

module.exports = {
  getStrMd5,
  getStrSha1,
  getStrSha256
}
