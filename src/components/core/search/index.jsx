import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less'
import PropTypes from 'prop-types';

/**
 * @param  formParams 表单内容
 * @param  onSearch 查询方法
 * @param  onReset 重制方法
 * @param  operateParams 操作扩展
**/

const CoreSearch = ({formParams, onSearch, onReset, operateParams}) => {
  const [form] = Form.useForm();
  // 查询回调
  const _onSearch = (values) => {
    if (onSearch) {
      onSearch(values);
    }
  }

  // 重置回调
  const _onReset = () => {
    form.resetFields();
    const params = form.getFieldsValue();
    console.log(params)
    if(onReset){
      onReset(params)
    }
  }

  // 渲染表单
  const RenderForm = () => formParams.map((item) => {
    return (
      <Form.Item label={item.label} name={item.name} key={item.key}>
        <Input />
      </Form.Item>
    )
  })

  // 渲染扩展按钮
  const RenderOperate = () => {
    if(operateParams){
      return (
        operateParams.map((item) => {
          return (
            <Form.Item key={item.key}>
              <Button type={item.type} onClick={item.event}>{item.text}</Button>
            </Form.Item>
          )
        })
      )
    }
    return null
  }

  return (
    <Form
      form={form}
      layout="inline"
      className={styles['search-form']}
      onFinish={_onSearch}
    >
      <RenderForm />
      {/* 查询 */}
      <Form.Item><Button type="primary" htmlType="submit">查询</Button></Form.Item>
      {/* 重置 */}
      <Form.Item><Button onClick={_onReset}>重置</Button></Form.Item>
      {/* 扩展 */}
      <RenderOperate />
    </Form>
  )
}

CoreSearch.propTypes = {
  // 查询内容
  formParams: PropTypes.array.isRequired,
  // 查询方法
  onSearch: PropTypes.func, 
  // 重制方法
  onReset: PropTypes.func,
  // 扩展内容
  operateParams: PropTypes.array
}

export default CoreSearch