/* eslint no-console: ["error", { allow: ["warn", "error", "log"]  }] */
/**
 * 全局定义的路由配置
 */

// 路由报Loading错时，页面需要刷新
const onRouteError = (err) => {
  console.log(`DEBUG: 路由调试 ${err}`);
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = err.match(pattern);
  console.log(err);
  // 检测是否有问题
  if (isChunkLoadFailed) {
    console.log('DEBUG: 路由刷新');
    window.location.reload(); // 刷新
  }
};

// 预加载的路由（预加载，页面布局加载前的逻辑判断使用）
const PreLoadRoutes = [
  // // 登录相关
  {
    path: '/authorize/login',
    component: () => import('../../../routes/authorize/login').catch((err) => onRouteError(`${err}`)),
  },
  // {
  //   path: '/authorize/reset',
  //   component: () => import('../../../routes/authorize/reset').catch((err) => onRouteError(`${err}`)),
  // },
  // // 404
  // {
  //   path: '/404',
  //   component: () => import('../../../routes/authorize/error').catch((err) => onRouteError(`${err}`)),
  // },
];

// 模块路由
const ModuleRoutes = [
  // // -----------------------欢迎页面----------------------
  // {
  //   path: '/welcome',
  //   component: () => import('../../../routes/welcome').catch((err) => onRouteError(`${err}`)),
  // },
  // // -----------------------角色权限----------------------
  // {
  //   path: '/system/roles/manage',
  //   component: () => import('../../../routes/system/roles/manage').catch((err) => onRouteError(`${err}`)),
  // },
  // // -----------------------账号管理----------------------
  // {
  //   path: '/system/account/manage',
  //   component: () => import('../../../routes/system/account/manage').catch((err) => onRouteError(`${err}`)),
  // }
];

export {
  // 预加载的路由（预加载，页面布局加载前的逻辑判断使用）
  PreLoadRoutes,
  // 模块路由
  ModuleRoutes,
};
