import Storage from './library/storage';
import Authorize from './service/authorize';

// 初始化应用
function createApp() {
  // 授权信息
  const authorize = new Authorize();
  // 初始化storage
  const storage = new Storage('ct.app.storage', { container: authorize.account.id });
  storage.set({
    accountInfo:[
      {id:"111",username:"admin",password:"123456",modules:[]}
    ]
  })
  

  return {
    storage,
    authorize
  };
}

export const { storage, authorize } = createApp();
