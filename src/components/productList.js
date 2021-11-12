import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'antd';
import SearchForm from './searchForm';
import ComponentOperateExtend from './operateExtend'

const ProductList = ({ onSearch, onDelete, onCreate, onUpdate, products }) => {
  // 初始化列表数据
  useEffect(() => { onSearch() },[])
  // 查询区域表单
  const [searchForm] = Form.useForm();
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
  // 列
  const columns = [
    { title: '姓名', dataIndex: 'name' }, 
    { title: '年龄', dataIndex: 'age' }, 
    { title: '地址', dataIndex: 'address' },  
    {
      title: '操作',
      render: (text, record) => {
        return (
          <ComponentOperateExtend
            onCreate={onCreate}
            onUpdate={onUpdate} 
            onDelete={onDelete}
            record={record}
          />
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
      />
      {/* 列表 */}
      <Table dataSource={products.tableList} columns={columns}/>
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