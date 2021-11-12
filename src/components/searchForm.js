import { Form, Row, Col, Input, Button } from 'antd';
import PropTypes from 'prop-types';

/**
 * @param  formRef 表单dom
 * @param  onSearch 查询方法
 * @param  onReset 重制方法
**/

const ComponentSearchForm = ({formRef, onSearch, onReset}) => {
  return (
    <Form
      form={formRef}
      className="ant-advanced-search-form"
      onFinish={onSearch}
    >
      <Row gutter={25}>
        <Col span={6}>
          <Form.Item label="姓名" name="name"><Input /></Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="年龄" name="age"><Input /></Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="地址" name="address"><Input /></Form.Item>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ margin: '0 8px' }} onClick={ onReset }>清空</Button>
        </Col>
      </Row>
    </Form>
  )
}

ComponentSearchForm.propTypes = {
  // 表单ref
  formRef: PropTypes.object.isRequired,
  // 查询
  onSearch: PropTypes.func.isRequired, 
  // 重制
  onReset: PropTypes.func.isRequired,
}

export default ComponentSearchForm