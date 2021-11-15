/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-deprecated */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * 布局layout,容器组件
 * */

import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import HeaderComponent from './header';
// import Navigation from './navigation';


const {
  Sider, Content, Header,
} = Layout;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否隐藏侧边栏菜单
      isHideSiderNavigation: false,
      pathname: props.location.pathname,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ pathname: nextProps.location.pathname });
  };

  render() {
    return (
      <Layout className={'app-layout'}>
        <Header className={'app-layout-header'}>
          <HeaderComponent />
        </Header>

        <Layout>
          {/* 渲染侧边栏菜单 */}
          <Sider collapsible width={180}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                Option 1
              </Menu.Item>
              <Menu.Item key="2">
                Option 2
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout>
            <Content className={'app-layout-content'}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 72px)',
              }}
              >
                <div>
                  <div>
                    {this.props.children}
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default IndexPage;
