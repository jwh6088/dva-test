// 登录
export const login = (params) => {
  // 返回结果
  let result = {}
  // 获取所有账号信息
  const accountInfo = window.application.storage.get('accountInfo')
  if(accountInfo){
    // 查询此账号以及对应的信息
    for (const item of accountInfo) {
      if(item.username === params.username && item.password === params.password){
        result = item
      }
    }
  }
  return result;
}