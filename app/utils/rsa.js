const fs = require('fs')
const NodeRSA = require('node-rsa')
const { RSA_PRIVATE_KEY_PATH, RSA_PUBLIC_KEY_PATH } = require(':config').KEY
const encrypt = (str) => {
  return new Promise((resolve, reject) => {
    fs.readFile(RSA_PUBLIC_KEY_PATH, (err, data) => {
      if (err) return new Error(err)
      const Rsa = new NodeRSA(data)
      resolve(Rsa.encrypt(str, 'base64'))
    })
  })
}

const decrypt = (str) => {
  return new Promise((resolve, reject) => {
    fs.readFile(RSA_PRIVATE_KEY_PATH, (err, data) => {
      if (err) return new Error(err)
      const Rsa = new NodeRSA(data)
      try {
        const res = Rsa.decrypt(str, 'utf-8')
        resolve(res)
      } catch (e) {
        reject(new Error(e))
      }
    })
  })
}

module.exports = { encrypt, decrypt }
