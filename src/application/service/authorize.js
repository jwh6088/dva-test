/* eslint no-underscore-dangle: ["error", { "allow": ["_account", '_acl', '_token', '_id'] }] */

import is from 'is_js';
import dot from 'dot-prop';

import Storage from '../library/storage';
// import Router from './router';

class Authorize {
  constructor() {
    // 账号信息
    this._account = new Storage('ct.app.authorize', { container: 'account' });

    // 授权访问acl
    this._acl = new Storage('ct.app.authorize', { container: 'acl' });

    // 授权token
    this._token = new Storage('ct.app.authorize', { container: 'token' });
  }

  get account() {
    return this._account.data;
  }

  set account(info) {
    this._account.set(info);
  }

  get acl() {
    return this._acl.data;
  }

  set acl(info) {
    this._acl.set(info);
  }

  get token() {
    return this._token.data;
  }

  set token(info) {
    this._token.set(info);
  }

  // 获取当前用户能访问的模块
  get modules() {
    return this._acl.get('modules');
  }

  // 判断当前用户是否是管理员
  isAdmin = () => {
    let isAdmin = false;
    const roles = this._account.get('role_list', []);
    roles.forEach((role) => {
      if (role.is_admin === true) {
        isAdmin = true;
      }
    });
    return isAdmin;
  }

  // 判断是否登陆
  isLogin = () => {
    if (is.not.empty(this._account.data)
      && is.existy(this._account.data)
      && is.existy(this._account.data.id)
      && is.existy(this._account.data.modules)) {
      return true;
    }
    return false;
  }

  // 重置密码成功
  resetPasswordSuccess = () => {
    this._account.set('is_need_reset', false);
  }

  // 判断是否有权限使用某内置功能
  canOperate = (operateModule) => {
    // 如果没有登陆则不能访问
    if (this.isLogin() === false) {
      return false;
    }

    // 判断当前用户是否是管理员
    if (this.isAdmin() === true) {
      return true;
    }

    // 判断是否是功能操作模块
    if (is.not.truthy(dot.get(operateModule, 'isOperate'))) {
      return false;
    }

    // 当前角色能访问的所有模块
    const { modules } = this;
    // 遍历角色拥有的所有模块
    let canOperate = false;
    modules.forEach((module) => {
      // 判断当前路径是否存在于模块中
      if (module.key === operateModule.key) {
        canOperate = true;
      }
    });

    return canOperate;
  }

  // 判断模块是否可以被访问
  canAccess = (pathname) => {
    // 默认界面
    if (pathname === '/') {
      return true;
    }

    // 如果没有登陆则不能访问
    if (this.isLogin() === false) {
      return false;
    }

    // 判断当前用户是否是管理员
    if (this.isAdmin() === true) {
      return true;
    }

    // 当前角色能访问的所有模块
    const { modules } = this;

    // 过滤路径中的字符串
    const path = pathname.replace(/\/*([\W\w]+)/, '$1');

    // 遍历角色拥有的所有模块
    let canAccess = false;
    modules.forEach((module) => {
      // console.log(module, module.path, path);
      // 判断当前路径是否存在于模块中
      if (module.path === path) {
        canAccess = true;
      }
    });

    // 调试权限使用的日志
    // console.log('Debug:', pathname, path, canAccess);
    return canAccess;
  }

  // 菜单栏
  // navigation = (isDebugMode = false) => Router.navigationByAccessHook(this.canAccess, isDebugMode)

  // 清空数据
  clear = () => {
    this._account.clear();
    this._token.clear();
    this._acl.clear();

    // TODO:临时做兼容清除
    window.sessionStorage.clear();
  }

  debug = () => {
    // const storage = new Storage('aoao.app.authorize');
    // console.log('DEBUG:storage', storage);
    // console.log('DEBUG:this._account', this._account);
    // console.log('DEBUG:isLogin', this.isLogin());
  }
}

// 上一版 module.exports = Authorize;
export default Authorize;
