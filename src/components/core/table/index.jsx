import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

/**
 * @param  formParams 表单内容
 * @param  onSearch 查询方法
 * @param  onReset 重制方法
 * @param  operateParams 操作扩展
**/

const CoreTable = ({rowKey, columns, dataSource, pagination}) => {

  return (
    <Table rowKey={rowKey} pagination={pagination} dataSource={dataSource} columns={columns} bordered />
  )

}

CoreTable.propTypes = {
  // 表格key
  rowKey: PropTypes.string,
  // 表格列
  columns: PropTypes.array.isRequired, 
  // 表格数据
  dataSource: PropTypes.array
}

export default CoreTable