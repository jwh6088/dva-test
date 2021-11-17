/**
* 账号管理页
**/
import React from 'react';
import CoreSearch from '../../../components/core/search'
import CoreTable from '../../../components/core/table'

const PageAccount = () => {
  // 查询区域参数
  const searchParams = {
    formParams: [{ label:"账号", name:"account", key:"1"}]
  }

  // 表格参数
  const tableParams = {
    rowKey:"id",
    columns: [
      { title: '账号', dataIndex: 'account' }, 
      { title: '创建时间', dataIndex: 'createTime' }, 
      { title: '状态', dataIndex: 'status' },  
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>按钮</div>
          );
        },
      }
    ],
    dataSource:[
      {account: 'admin', createTime:'2021-11-11', status:'启用', id:"1"}
    ]
  }

  return(
    <div>
      <CoreSearch {...searchParams}/>
      <CoreTable {...tableParams}/>
    </div>   
  )
};

export default PageAccount;