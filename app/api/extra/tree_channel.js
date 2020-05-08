/*
  树形栏目菜单接口
*/
const { succ } = global.tool
const { getList } = require(':query')
module.exports = async ctx => {
  // 从栏目表拿出所有的栏目数据
  const { list } = await getList('Channel', { pagesize: -1, sort: '-sort,-id' })
  // 递归函数
  const makeTree = (pid, arr) => {
    const res = []
    for (const i of arr) {
      // 直接构型成 element 等 vue 框架的默认数据格式，避免前端需要转化
      const obj = { value: i.id, label: i.name }
      if (i.pid === pid) {
        const child = makeTree(i.id, arr)
        if (child.length) obj.children = child
        res.push(obj)
      }
    }
    return res
  }
  // 得到结果并返回
  const tree = makeTree(0, list)
  ctx.body = succ(tree)
}
