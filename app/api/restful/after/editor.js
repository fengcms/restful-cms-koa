module.exports = {
  ls (data, ctx, allParams) {
    data.list.map(r => {
      delete r.password
    })
    return data
  },
  get (data, ctx, allParams) {
    delete data.password
    return data
  }
}
