import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/productList';

const Products = ({ dispatch, products }) => {
  // 查询
  const onSearch = (params) => {
    dispatch({ type: 'products/search', payload: params });
  }
  // 删除
  const onDelete = (id) => {
    dispatch({ type: 'products/remove', payload: id });
  }
  // 创建
  const onCreate = (formData) => {
    dispatch({ type: 'products/create', payload: formData })
  }
  // 更新
  const onUpdate = (record) => {
    dispatch({ type: 'products/update', payload: record })
  }
  return (
    <div style={{padding:'40px'}}>
      <h2>List of Products</h2>
      <ProductList 
        onSearch={onSearch} 
        onDelete={onDelete} 
        onCreate={onCreate}
        onUpdate={onUpdate}
        products={products} 
      />
    </div>
  );
};

export default connect(({ products }) => ({
  products,
}))(Products);