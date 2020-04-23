// 定义控制方法
const ls = 'ls'
const get = 'get'
const put = 'put'
const post = 'post'
const del = 'del'
// 定义默认权限组
const nil = []
const anyone = [ls, get]
const editor = [ls, get, put, post]
const admin = [ls, get, put, post, del]
// 导出接口权限
module.exports = {
  article: { anyone, editor, admin },
  channel: { anyone, editor, admin },
  manages: {
    anyone: nil, editor: nil, admin
  },
  site: {
    anyone: [ls], editor: [ls], admin
  },
  author: { anyone, editor, admin: [] },
  origin: { anyone, editor, admin },
  editor: { anyone, editor, admin },
  tags: { anyone, editor, admin },
  upload: {
    anyone: nil, editor: [post], admin: [post]
  },
  login: {
    anyone: [post], editor: [post], admin: [post]
  },
  logout: {
    anyone: [ls], editor: [ls], admin: [ls]
  }
}
