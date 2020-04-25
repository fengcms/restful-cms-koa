module.exports = {
  ls (data, role, ctx) {
    data.list.map(r => {
      delete r.content
      delete r.markdown
    })
    return data
  }
}
