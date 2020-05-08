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

const normal = { anyone, editor, admin }
const onlyRead = { anyone: [ls], editor: [ls], admin: [ls] }
const onlyPost = { anyone: [post], editor: [post], admin: [post] }
// 导出接口权限
module.exports = {
  article: normal,
  channel: normal,
  manages: { anyone: nil, editor: nil, admin },
  site: {
    anyone: [ls], editor: [ls], admin: [ls, get, put]
  },
  author: normal,
  origin: normal,
  editor: normal,
  tags: normal,
  upload: { anyone: nil, editor: [post], admin: [post] },
  login: onlyPost,
  logout: onlyRead,
  tree_channel: onlyRead,
  rsa_public_key: onlyRead,
  profile: { anyone: nil, editor, admin: editor },
  change_password: { anyone: nil, editor: [post], admin: [post] }
}
