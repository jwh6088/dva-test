import is from 'is_js';
import { login } from '../../services/authorize'
import { message } from 'antd';
import { authorize } from '../../application';

export default {
  namespace: 'authorize',
  state: {},
  effects: {
    // 登录
    *login({ payload }, { call }){
      const params = {
        username:payload.username, 
        password:payload.password,
      };
      // 获取账号信息
      const detail = yield call(login, params);
      if (is.not.existy(detail) || is.empty(detail) || is.not.existy(detail.id) || is.empty(detail.id)) {
        // 清理掉本地授权数据，本次登陆失败
        authorize.clear();
        return message.error('无法获用户详情信息，登陆失败');
      }
      // 保存账号详情信息
      authorize.account = detail;
      // 登陆成功跳转
      message.success('登录成功, 页面跳转中...', 2, () => {
        window.location.href = '/#/';
      });
    },
    // 退出登录
    // eslint-disable-next-line
    *logout(){
      authorize.clear();
      // 跳转到首页
      window.location.href = '/';
    }
  },
  reducers: {
    // 更新列表
    'reducerGetList'(state, data) {
      return { ...state, tableList:data.list};
    },
  },
};