const fs = require('fs')
const path = require('path')

const getJSFile = filePath => {
  console.log(1)
  const srcPath = path.resolve(__dirname, filePath)
  const JSFile = []
  const result = fs.readdirSync(srcPath)
  result.forEach(r => {
    const JSFileName = r.split('.')[0]
    JSFileName && JSFile.push(JSFileName)
  })
  return JSFile
}

const succ = data => {
  return {
    status: 0,
    data
  }
}
const fail = (msg, status = 1) => {
  return {
    status,
    msg
  }
}

module.exports = {
  getJSFile,
  succ,
  fail
}
