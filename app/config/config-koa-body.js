const path = require('path')
module.exports = {
  multipart: true,
  parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
  formidable: {
    uploadDir: path.resolve(process.cwd(), './tmp'),
    hash: 'md5',
    maxFieldsSize: 20 * 10,
    maxFileSize: 20 * 10,
    onFileBegin (name, file) {
      file.path = path.resolve(process.cwd(), './tmp/xxx')
    },
    keepExtensions: false
  },
  onError (_, ctx) {
    ctx.throw(411, '文件超过限制大小！')
  }
}
