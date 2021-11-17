import Storage from './library/storage';
import Authorize from './service/authorize';

// 初始化应用
function createApp() {
  // 授权信息
  const authorize = new Authorize();
  // 初始化storage模拟数据库
  const storage = new Storage('ct.app.storage', { container: "db" });
  storage.set({
    accountInfo:[
      { id:"1", username:'admin', password:'123456', modules:["system","account","roles"] },
      { id:"2", username:'test', password:'123456', modules:["system","roles"] }
    ]
  })
  

  return {
    storage,
    authorize
  };
}

export const { storage, authorize } = createApp();
