const { makeDir } = global.tool
const { TMP_DIR } = require(':config').APP_DIR
// 检查临时文件夹是否存在，若不存在则新建
makeDir(TMP_DIR)

module.exports = {
  multipart: true,
  parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
  formidable: {
    uploadDir: TMP_DIR,
    hash: 'md5',
    maxFieldsSize: 2 * 1024 * 1024,
    maxFileSize: 2 * 1024 * 1024,
    onFileBegin (name, file) {
      global.tmpFileUrl = global.tmpFileUrl || 0
      file.path = TMP_DIR + '/upfile_' + global.tmpFileUrl
      global.tmpFileUrl = global.tmpFileUrl >= 10 ? 0 : global.tmpFileUrl + 1
    },
    keepExtensions: false
  },
  onError (_, ctx) {
    ctx.throw(413, '文件超过限制大小！')
  }
}
