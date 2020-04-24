const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { readTextFile, deleteFile } = global.tool
const { SESSION_TYPE = 'memory', APP_DIR } = require(':config')
const { TMP_DIR } = APP_DIR

/*
  session type 支持 memory 内存存储 和 file 文件存储
  除非是在开发阶段 否则推荐 memory 存储
  因为 file 存储的 session 文件不会自动删除，会越来越多
  有更高要求，可参考 memory 写法，增加 redis 数据库
*/

// 存储 token
const setToken = async (role, account, token, time) => {
  const types = {
    async memory () {
      if (!global.session) global.session = {}
      global.session[token] = {
        role,
        account,
        time
      }
    },
    async file () {
      const filename = `session_||${token}`
      const filePath = path.resolve(TMP_DIR, filename)
      const fileContent = `${role}||${account}||${token}||${time}`
      await fs.writeFile(filePath, fileContent, err => {
        if (err) return new Error('session 文件写入失败')
      })
    }
  }
  await types[SESSION_TYPE]()
}

// 读取 token 并返回结果
const getToken = async token => {
  const types = {
    async memory () {
      if (!global.session) global.session = {}
      return global.session[token] || {}
    },
    async file () {
      const filename = `session_||${token}`
      const filePath = path.resolve(TMP_DIR, filename)
      const data = await readTextFile(filePath).catch(() => false)
      if (data) {
        const [role, account, token, time] = data.split('||')
        return { role, account, token, time }
      } else {
        return {}
      }
    }
  }
  const res = await types[SESSION_TYPE]()
  return res
}

// 删除 token
const removeToken = async token => {
  const types = {
    async memory () {
      if (!global.session) global.session = {}
      delete global.session[token]
    },
    async file () {
      const filename = `session_||${token}`
      const filePath = path.resolve(TMP_DIR, filename)
      const res = await deleteFile(filePath).catch(() => false)
      console.log('删除文件', res)
    }
  }
  await types[SESSION_TYPE]()
}

// 计算 token 值并存储 后返回 token 值
const makeToken = async (role, account) => {
  const now = +new Date()
  const token = crypto.createHash('md5').update(role + account + now).digest('hex')
  await setToken(role, account, token, now)
  return token
}

// 检查 token 是否存在，是否超时，正常返回角色和账号，否则返回 false
const checkToken = async token => {
  let res = false
  if (token) {
    const tokenSave = await getToken(token)
    if (tokenSave) {
      const { role, account, time } = tokenSave
      const now = +new Date()
      if ((now - time) <= 86400000) {
        res = { role, account }
      }
    }
  }
  return res
}

// 更新 token 时间
const updateToken = async token => {
  const rightToken = await checkToken(token)
  if (rightToken) {
    const { role, account } = rightToken
    const now = +new Date()
    await setToken(role, account, token, now)
    return true
  }
  return false
}

module.exports = { getToken, makeToken, checkToken, updateToken, removeToken }
