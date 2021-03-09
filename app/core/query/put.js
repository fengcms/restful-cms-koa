/*
  更新数据方法
  1. 支持未知ID单条数据修改
    URL:    /xxx/first
    DATA:   {...}
    此方法会找数据库第一条数据，进行对应修改，用于特殊用途
  2. 支持单ID数据修改
    URL: /xxx/:id
    DATA:   {...}
    正常使用，数据为需要修改的数据字典
  3. 支持多ID单数据修改
    URL: /xxx/1,2,3,4,5,6
    DATA:   {...}
    支持将多条数据的内容进行统一处理，例如批量加入回收站或者批量转移归属栏目等
  4. 支持多ID多数据修改
    URL: /xxx/batch
    DATA:   [{...}, {...}, {...}, {...}]
    将需要多条修改的数据构成数组传进来。
    每个数据里面必须包含 'id' 字段，否则参数错误
*/

const { models } = require(':@/model')
const { toType, logger, filterObjectXss } = global.tool
module.exports = async (ctx, model, method, params, id) => {
  // 构建返回数据结构
  const res = { succ: [], fail: [] }
  // 构建添加数据方法，因 update 方法不会返回数据，故而使用 findOne方法先查询，再 save 的做法
  const putItemFunc = async (id, item) => {
    item = filterObjectXss(item)
    const where = id === 'first' ? {} : { where: { id } }
    where.raw = false
    const dat = await models[model]
      .findOne(where)
      .catch(e => logger.error(e.message))
    if (dat) {
      for (const i in item) dat[i] = item[i]
      const saveDat = await dat.save()
      res.succ.push(saveDat.id)
    } else {
      res.fail.push(id)
    }
  }
  if (id === 'batch') {
    // 多ID多数据修改
    if (toType(params) !== 'array') ctx.throw(412, '批量更新数据，数据参数必须为数组对象')
    if (params.filter(r => !r.id).length) ctx.throw(412, '批量更新数据，每条数据必须包含ID字段')
    await Promise.all(params.map(async item => {
      await putItemFunc(item.id, item)
    }))
  } else {
    // 数据校验
    if (toType(params) !== 'object') ctx.throw(412, '更新数据，数据参数必须为对象')
    delete params.id
    if (!Object.keys(params).length) ctx.throw(412, '更新数据，数据对象不能为空')

    if (id === 'first') {
      // 未知ID单条数据修改
      await putItemFunc(id, params)
    } else {
      // 多ID单数据修改 以及 单ID数据修改
      const ids = id.split(',')
      await Promise.all(ids.map(async itemId => {
        await putItemFunc(itemId, params)
      }))
    }
  }
  return res
}
