import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Table, Popconfirm, Button, Modal, message } from 'antd';
import SearchForm from './searchForm';
import ModalContent from './modalContent';
import { ModalType } from '../application/enumerate';

const ProductList = ({ onSearch, onDelete, onCreate, onUpdate, products }) => {
  // 初始化列表数据
  useEffect(() => { onSearch() },[])
  // 弹窗显隐
  const [isShowModal, setIsShowModal] = useState(false);
  // 弹窗类型
  const [modalType, setModalType] = useState(0)
  // 查询区域表单
  const [searchForm] = Form.useForm();
  // 弹窗表单
  const [modalForm] = Form.useForm();  
  // 查询
  const _onSearch = (values) => {
    values.age && (values.age = parseInt(values.age, 0))
    onSearch(values)
  }
  // 清空
  const _onReset = () => {
    searchForm.resetFields();
    onSearch()
  };
  // 打开弹窗
  const onOpenModal = (type,record) => {
    setIsShowModal(true)
    setModalType(type)
    modalForm.setFieldsValue(record ? record : { name:'', age:'', address:'', id:Math.random() })
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
  // 列
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    }, 
    {
      title: '年龄',
      dataIndex: 'age',
    }, 
    {
      title: '地址',
      dataIndex: 'address',
    }, 
    {
      title: '操作',
      render: (text, record) => {
        return (
          <div key={record.id}>
            <Button onClick={()=>{ onOpenModal(2,record) }}>编辑</Button>
            <Button onClick={()=>{ onOpenModal(3,record) }} style={{ margin:'0 10px' }}>查看</Button>
            <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
              <Button>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    }
  ];

  return (
    <div>
      {/* 查询区域 */}
      <SearchForm 
        formRef={searchForm} 
        onSearch={_onSearch} 
        onReset={_onReset} 
        onOpenModal={onOpenModal}
      />
      {/* 列表 */}
      <Table dataSource={products.tableList} columns={columns}/>
      {/* 弹层 */}
      <Modal 
        title={ModalType.description(modalType)} 
        maskClosable ={false}  
        visible={isShowModal} 
        onOk={() => modalForm.submit()} 
        onCancel={()=>{ setIsShowModal(false) }}
      > 
        <ModalContent 
          formRef={modalForm}
          onSubmit={onSubmit}
          modalType={modalType}
        />
      </Modal>
    </div>
  );
};

ProductList.propTypes = {
  // 查询
  onSearch: PropTypes.func.isRequired,
  // 删除
  onDelete: PropTypes.func.isRequired,
  // 创建
  onCreate: PropTypes.func.isRequired, 
  // 更新
  onUpdate: PropTypes.func.isRequired,
  // 数据
  products: PropTypes.object.isRequired,
};

export default ProductList;