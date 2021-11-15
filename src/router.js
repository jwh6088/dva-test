import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { PreLoadRoutes, ModuleRoutes } from './application/define';
import { authorize } from './application';
import Layout from './components/layout';
class AppRouter extends Component {
  // 渲染动态路由
  renderDynamicRoutes = (routes = []) => {
    const { app } = this.props;
    return routes.map((route, index) => {
      // 动态加载，dva支持的dynamic初始化，返回Promise对象。dynamic说明见 https://dvajs.com/api/#dva-dynamic
      const DynamicComponent = dynamic({
        app, // dva 实例，加载 models 时需要
        component: route.component,
      });
      // 初始化路由节点
      // eslint-disable-next-line react/no-array-index-key
      return (<Route key={index} exact={route.path !== '*'} path={route.path} component={DynamicComponent} />);
    });
  }

  // 渲染主节点路由
  renderRootRoute = ({ location }) => {
    const PreLoadRoutesPath = PreLoadRoutes.map((item) => item.path);
    const ModuleRoutesPath = ModuleRoutes.map((item) => item.path);
    const pathname = location.pathname || location.location.pathname;
    const noRedirectPath = ['/', '/authorize/login']; // 不需要记录跳转的路由
    // 过滤预加载地址，防止循环重定向。
    if (PreLoadRoutes.map((item) => item.path).indexOf(location.pathname) !== -1) {
      return <div />;
    }
    const isLogin = authorize.isLogin();
    // 如果是未登录状态 && 当前路由属于不需要记录的页面
    if (isLogin === false && noRedirectPath.indexOf(pathname) === -1) {
      return <Redirect to={`/authorize/login?redirectUri=${encodeURIComponent(pathname)}`} />;
    }
    // 如果未登陆，未授权，则跳转到登录页面
    if (isLogin === false) {
      return <Redirect to="/authorize/login" />;
    }

    // 如果已登录，跳转到默认的欢迎页
    if (location.pathname === '/' && isLogin === true) {
      return <Redirect to="/welcome" />;
    }

    // 如果没有权限访问，则跳转到404
    if (PreLoadRoutesPath.includes(location.pathname) === false
      && ModuleRoutesPath.includes(location.pathname) === false
    ) {
      return <Redirect to="/404" />;
    }

    // 加载默认的布局
    return (
      <Layout location={location}>
        <Switch>
          {this.renderDynamicRoutes(ModuleRoutes)}
        </Switch>
      </Layout>
    );
  }

  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        {/* 只渲染单一路径条件，https://reacttraining.com/react-router/web/api/Switch */}
        <Switch>
          {/* 渲染预加载路由 */}
          {this.renderDynamicRoutes(PreLoadRoutes)}
          {/* 渲染根路由 */}
          <Route path="/" render={this.renderRootRoute} />
        </Switch>
      </Router>
    );
  }
}

export default function ({ history, app }) {
  return (
    <AppRouter history={history} app={app} />
  );
}
