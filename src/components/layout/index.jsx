/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-deprecated */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * 布局layout,容器组件
 * */

import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderComponent from './header';
import styles from './index.less'
import Navigation from './navigation'
const { Sider, Content, Header} = Layout;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否隐藏侧边栏菜单
      isHideSiderNavigation: false,
    };
  }

  render() {
    return (
      <Layout>
        {/* 渲染侧边栏菜单 */}
        <Sider collapsible width={180}>
          <div className={styles['logo']} />
          <Navigation />
        </Sider>
        <Layout className={styles['site-layout']}>      
          <Header className={styles['site-layout-background']}>
            <HeaderComponent />
          </Header>
          <Layout>
            <Content className={styles['site-layout-content']}>
              <div style={{ height: 'calc(100vh - 124px)'}}>
                {this.props.children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default IndexPage;
