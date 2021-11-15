import Storage from './library/storage';
import Authorize from './service/authorize';

// 初始化应用
function createApp() {
  // 存储storage
  const storage = new Storage('ct.app.storage', { container: 'dva-antd' });
  // 授权信息
  const authorize = new Authorize();

  return {
    storage,
    authorize
  };
}

export const { storage, authorize } = createApp();
