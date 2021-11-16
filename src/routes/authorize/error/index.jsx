/**
 * 404 错误页面
 * */
 import React from 'react';
 import { Button } from 'antd';
 import styles from './index.less';
 
 const PageNotFound = () => (
   <div>
     <div className={styles['page-authorize-error-wrapper']}>
       <div className={styles['page-authorize-error-code']}>
         错误<span>404</span>
       </div>
       <p>
         <Button type="link"><a href="/#/">返回</a></Button>
       </p>
     </div>
   </div>
 );
 
 export default PageNotFound;
 