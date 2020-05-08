const { getItem } = require(':query')
module.exports = {
  ls (data, ctx, allParams) {
    data.list.map(r => {
      delete r.content
      delete r.markdown
    })
    return data
  },
  async get (data, ctx, allParams) {
    const channel = await getItem('Channel', data.channel_id)
    data.channel_name = channel.name
    return data
  }
}
