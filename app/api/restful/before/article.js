const { filterStrHtml } = global.tool
const marked = require('marked')

const articleHandle = (params, role, ctx) => {
  const { title, channel_id: channelId, content, markdown, description } = params
  if (!title) ctx.throw(400, '文章标题不能为空')
  if (!channelId) ctx.throw(400, '文章归属栏目不能为空')
  if (!content && !markdown) ctx.throw(400, '文章正文不能为空')
  // 如果有 markdown 则将 markdown 转成 html 并存放到 content
  if (markdown) {
    params.content = marked(markdown)
  }
  // 如果没有简介，则从正文中提取前200个字符作为简介
  if (!description) {
    params.description = filterStrHtml(params.content).substring(0, 200)
  }
  return params
}

module.exports = {
  post (ctx, { params, role }) {
    return articleHandle(params, role, ctx)
  },
  put (ctx, { params, role, id }) {
    return articleHandle(params, role, ctx)
  }
}
