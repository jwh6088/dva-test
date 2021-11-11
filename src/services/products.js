// import request from '../utils/request';
const data = [
  { name: 'dva', age: 18, address: '中国', id: 1 },
  { name: 'dvaddd', age: 25, address: '意大利', id: 2 },
  { name: '刚忒虾', age: 32, address: '墨西哥', id: 3 },
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
    (item.id === params.id) && (Object.assign(item,params))
  }
  return data;
}

// 查询
export const searchQuery = (params) => {
  if(params){
    return data.filter(item => 
      (params.name ? item.name === params.name : true)
      && (params.age ? item.age === params.age : true)
      && (params.address ? item.address === params.address :true)
    )
  }else{
    return data
  }
}
