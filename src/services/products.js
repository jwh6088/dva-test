// import request from '../utils/request';
// 获取初始数据
const data = window.application.storage.get('productList') || []

// 新增
export const createQuery = (params) => {
  let result = data.concat([params])
  window.application.storage.set('productList', result)
  return result;
}

// 删除
export const deleteQuery = (params) => {
  const result = data.filter(item => item.id !== params)
  window.application.storage.set('productList', result)
  return result;
}

// 更新
export const updateQuery = (params) => {
  for (let item of data) {
    if(item.id === params.id){
      Object.assign(item,params)
    }
  }
  return data;
}

// 查询
const conditionJudge = (a,b) => {
  if(a){
    return a === b
  }else{
    return true
  }
}
export const searchQuery = (params) => {
  if(params){
    return data.filter(item => 
      conditionJudge(params.name,item.name)
      && conditionJudge(params.age,item.age)
      && conditionJudge(params.address,item.address)
    )
  }else{
    return data
  }
}
