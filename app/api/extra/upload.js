const fs = require('fs')
const path = require('path')

const { toType, succ, makeDir, moveFile, sleep } = global.tool
const calcFileExt = path => {
  let fileBuffer = fs.readFileSync(path)
  // 将上文提到的 文件标识头 按 字节 整理到数组中
  const imageBufferHeaders = [
    { bufBegin: [0xff, 0xd8], bufEnd: [0xff, 0xd9], suffix: '.jpg' },
    { bufBegin: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], suffix: '.png' },
    { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], suffix: '.gif' },
    { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], suffix: '.gif' },
    { bufBegin: [0x42, 0x4d], suffix: '.bmp' }
  ]
  for (const imageBufferHeader of imageBufferHeaders) {
    let isEqual
    // 判断标识头前缀
    if (imageBufferHeader.bufBegin) {
      const buf = Buffer.from(imageBufferHeader.bufBegin)
      isEqual = buf.equals(
        // 使用 buffer.slice 方法 对 buffer 以字节为单位切割
        fileBuffer.slice(0, imageBufferHeader.bufBegin.length)
      )
    }
    // 判断标识头后缀
    if (isEqual && imageBufferHeader.bufEnd) {
      const buf = Buffer.from(imageBufferHeader.bufEnd)
      isEqual = buf.equals(fileBuffer.slice(-imageBufferHeader.bufEnd.length))
    }
    if (isEqual) {
      fileBuffer = undefined
      return imageBufferHeader.suffix
    }
  }
  // 未能识别到该文件类型
  fileBuffer = undefined
  return ''
}
const calcSavePath = (hash, fileExt) => {
  const rootPath = process.cwd()
  const saveDir = path.resolve(rootPath, './static/upfiles/', hash.substring(0, 2))
  const savePath = path.resolve(saveDir, hash.substring(2) + fileExt)
  const returnPath = savePath.replace(rootPath + '/static', '')
  return [saveDir, savePath, returnPath]
}
const saveFile = (ctx, file) => {
  const { path, hash } = file
  const fileExt = calcFileExt(path)
  if (!fileExt) ctx.throw(415, '仅支持 png/jpg/gif/bmp 等图片文件格式')
  const [saveDir, savePath, returnPath] = calcSavePath(hash, fileExt)
  return new Promise((resolve, reject) => {
    makeDir(saveDir).then(() => {
      moveFile(path, savePath).then(() => {
        resolve(returnPath)
      })
    })
  })
}

module.exports = async ctx => {
  const { files, type } = ctx.request
  if (type !== 'multipart/form-data' || !files) {
    ctx.throw(400, '请求类型错误，上传文件接口仅支持 multipart/form-data')
  }
  const { file } = files
  if (!file) {
    ctx.throw(400, '上传文件不能为空！')
  }
  const fileType = toType(file)

  // 模拟上传延时
  await sleep(500)

  if (fileType === 'object') {
    const imgUrl = await saveFile(ctx, file)
    ctx.body = succ({ path: imgUrl })
  } else if (fileType === 'array') {
    // 多文件上传
    const imgUrls = []
    await Promise.all(file.map(async i => {
      imgUrls.push(await saveFile(ctx, i))
    }))
    ctx.body = succ({ path: imgUrls })
  }
}
