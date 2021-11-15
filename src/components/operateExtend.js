import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal, Popconfirm, message } from 'antd';
import { ModalType } from '../application/enumerate';
import ComponentModalContent from './modalContent';

const ComponentOperateExtend = ({onCreate,onUpdate,onDelete,record,isDisplay}) => {
  // 弹窗显隐
  const [isShowModal, setIsShowModal] = useState(false);
  // 弹窗类型
  const [modalType, setModalType] = useState(ModalType.init)
  // 弹窗表单
  const [modalForm] = Form.useForm()
  // 打开弹窗
  const onOpenModal = (type,record) => {
    setIsShowModal(true)
    setModalType(type)
    modalForm.setFieldsValue(record ? record : { name:'', age:'', address:'', key:Math.random() })
  }
  // 提交
  const onSubmit = (values) => {
    if(values.name && values.age && values.address){
      modalType === ModalType.create ? onCreate(values) : onUpdate(values)
      setIsShowModal(false) 
    }else{
      message.warning('内容为必填项');
    }   
  } 
  // 弹窗按钮
  const RenderButton = ({type,record}) => {
    return (
      <Button onClick={()=>{ onOpenModal(type,record) }}>{ ModalType.description(type) }</Button>
    )
  }
  // 弹窗
  const RenderModal = () => {
    return (
      <Modal 
        title={ModalType.description(modalType)} 
        maskClosable ={false}  
        visible={isShowModal} 
        onOk={() => modalForm.submit()} 
        onCancel={()=>{ setIsShowModal(false) }}
      > 
        <ComponentModalContent
          formRef={modalForm}
          onSubmit={onSubmit}
          modalType={modalType}        
        />
      </Modal>
    )
  }

  return(
    <div>
      {/* 添加 */}
      <RenderButton style={{display:isDisplay}} type={ModalType.create} />
      {/* 编辑 */}
      <RenderButton type={ModalType.update} record={record}/>
      {/* 查看 */}
      <RenderButton type={ModalType.view} record={record}/>
      {/* 删除 */}
      <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}><Button>删除</Button></Popconfirm>
      {/* 弹窗 */}
      <RenderModal />
    </div>
  )
}

ComponentOperateExtend.propTypes = {
  // 创建
  onCreate: PropTypes.func, 
  // 更新
  onUpdate: PropTypes.func,
  // 删除
  onDelete: PropTypes.func,
  // 数据
  record: PropTypes.object,
};

export default ComponentOperateExtend