import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { ModalType } from '../application/enumerate';

/**
 * @param  formRef 表单dom
 * @param  onSubmit 表单提交方法
 * @param  modalType 弹窗类型 1:添加 2:编辑 3:查看
**/

const ComponentModalContent = ({formRef,onSubmit,modalType}) => {
  let modalFormData = {} 
  return (
    <Form
      form={formRef}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item label="ID" name="id" style={{display:'none'}}>
        <Input value={modalFormData.id} disabled={modalType === ModalType.view} />
      </Form.Item>
      <Form.Item label="姓名" name="name">
        <Input value={modalFormData.name} disabled={modalType === ModalType.view} />
      </Form.Item>
      <Form.Item label="年龄" name="age">
        <Input value={modalFormData.age} disabled={modalType === ModalType.view} />
      </Form.Item>
      <Form.Item label="地址" name="address">
        <Input value={modalFormData.address} disabled={modalType === ModalType.view} />
      </Form.Item>
    </Form>
  )
}

ComponentModalContent.propTypes = {
  // 表单ref
  formRef: PropTypes.object.isRequired,
  // 提交
  onSubmit: PropTypes.func.isRequired,
  // 弹窗类型
  modalType: PropTypes.number.isRequired, 
}

export default ComponentModalContent