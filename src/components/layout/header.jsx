/**
 * 布局的header
 * */
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { authorize } from '../../application';

const Header = ({ logout }) => {
  return (
    <header>
      <div style={{ width: '180px', float: 'left'}}>dva-antd-admin</div>
      <div style={{ float: 'right' }}>
        <span> <UserOutlined /> { authorize.account.username } </span>
        <Button type="link" onClick={logout}>
          <LogoutOutlined /> <span>退出系统</span>
        </Button> 
      </div>
    </header>
  );
};

// 校验
Header.propTypes = {
  logout: PropTypes.func,
};

// 默认值
Header.defaultProps = {
  logout: () => {},
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 退出登陆
    logout: () => dispatch({ type: 'authorize/logout', payload: {} }),
  };
}

export default connect(({params}) => ({params}), mapDispatchToProps)(Header);
