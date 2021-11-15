/**
 * 布局的header
 * */
import React from 'react';
import { connect } from 'dva';
import { Menu, Row, Col, Dropdown, Button } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';

const Header = ({ logout }) => {

  // 渲染下拉菜单
  const renderDropDownMenu = () => {
    const menu = (
      <Menu style={{ maxHeight: 500, overflowY: 'auto' }}>
        <Menu.Item>
          <Button type="link" onClick={logout}>
            <LogoutOutlined />
            <span>
              退出系统
            </span>
          </Button>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button type="link" className="ant-dropdown-link" rel="noopener noreferrer" href="#">
          <DownOutlined
          />
        </Button>
      </Dropdown>
    );
  };

  return (
    <header>
      <div style={{ width: '180px', float: 'left' }}>
        11111
      </div>

      <Row type="flex" justify="end" align="middle">
        <Col span={24}>
          <div>
            {renderDropDownMenu()}
          </div>
        </Col>
      </Row>
    </header>
  );
};

// 变量&函数声明
Header.propTypes = {
  logout: PropTypes.func,
};
const defaultFunc = () => { };
// 默认值
Header.defaultProps = {
  chatUnread: 0,
  chatModalVisible: false,
  logout: defaultFunc,
  fetchAsyncTaskList: defaultFunc,
  setChatSessionList: defaultFunc,
  asyncTaskData: {},
  profileInfo: {}, // 获取的个人详情信息
};

const mapStateToProps = ({
  mServiceChat: { chatUnread, chatModalVisible },
  mAppCore: { asyncTaskData },
  mProfile: { profileInfo },
}) => ({
  chatUnread,
  chatModalVisible,
  asyncTaskData,
  profileInfo,
});

function mapDispatchToProps(dispatch) {
  return {
    // 退出登陆
    logout: () => dispatch({ type: 'mAppAuthorize/logout', payload: {} }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
