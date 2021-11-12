// import request from '../utils/request';
const data = [
  { key:1, name: 'dva', age: 18, address: '中国', id: 1 },
  { key:2, name: 'dvaddd', age: 25, address: '意大利', id: 2 },
  { key:3, name: '刚忒虾', age: 32, address: '墨西哥', id: 3 },
]

// 新增
export const createQuery = (params) => {
  return data.concat([params]);
}

// 删除
export const deleteQuery = (params) => {
  return data.filter(item => item.id !== params);
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
