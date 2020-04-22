// 各类校验数据工具集中放在这里
module.exports = {
  isNumer (num) {
    return /^-[0-9]|[0-9]*$/.test(num)
  }
}
