/**
 * 登录
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
import styles from './index.less'

const PageLogin = ({ login }) => {
  // 表单提交
  const onSubmit = (values) => {
    const { username, password } = values;
    login(username, password);
  };

  return (
    <div className={styles.form}>
      <p>DVA-ANTD</p>
      <Form onFinish={onSubmit}>
        <Form.Item name="username" rules={[{ required: true }]} hasFeedback>
          <Input placeholder="用户名"/>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]} hasFeedback>
          <Input type="password" placeholder="密码"/>
        </Form.Item>
        <Button type="primary" htmlType="submit">登录</Button>    
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 登录
    login: (username, password) => dispatch({ type: 'authorize/login', payload: { username, password } }),
  };
}

export default connect(() => ({}), mapDispatchToProps)(PageLogin);
