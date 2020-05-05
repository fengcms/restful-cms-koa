module.exports = {
  ls (data, role, ctx) {
    data.list.map(r => {
      delete r.password
    })
    return data
  },
  get (data, role, ctx) {
    delete data.password
    return data
  }
}
