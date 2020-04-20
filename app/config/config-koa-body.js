const path = require('path')
const fs = require('fs')

const tempDir = path.resolve(process.cwd(), './tmp')
// 检查临时文件夹是否存在，若不存在则新建
fs.access(tempDir, err => {
  if (err) {
    fs.mkdir(tempDir, { recursive: true }, (err) => {
      if (err) throw err
    })
  }
})

module.exports = {
  multipart: true,
  parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
  formidable: {
    uploadDir: tempDir,
    hash: 'md5',
    maxFieldsSize: 2 * 1024 * 1024,
    maxFileSize: 2 * 1024 * 1024,
    onFileBegin (name, file) {
      global.tmpFileUrl = global.tmpFileUrl || 0
      file.path = tempDir + '/upfile_' + global.tmpFileUrl
      global.tmpFileUrl = global.tmpFileUrl >= 10 ? 0 : global.tmpFileUrl + 1
    },
    keepExtensions: false
  },
  onError (_, ctx) {
    ctx.throw(411, '文件超过限制大小！')
  }
}
