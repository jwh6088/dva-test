/**
 *  侧栏导航
 * */
 import dot from 'dot-prop';
 import { Menu } from 'antd';
 import PropTypes from 'prop-types';
 import React, { Component } from 'react';
 import * as Icons from '@ant-design/icons';
  import { authorize } from '../../application';
 
 class Navigation extends Component {
   constructor(props) {
     super(props);
   }
 
   // 动态渲染Icon，全局统一控制
   renderIcon = (icon) => {
     // 如果icon为空 或 icon元素不存在，则直接返回
     if (icon === '' || !Icons[icon]) {
       return '';
     }
 
     // 动态加载icon对象
     const ElementIcon = Icons[icon];
     return <ElementIcon />;
   }
 
   // 渲染菜单
   renderMenu = (data, level = 0) => data.map((item) => {
     // 判断模块是否有权限可以访问, 并且可以显示在菜单栏上
     if (item.module.canAccess === false) {
       return undefined;
     }
     // 子菜单
     if (item.routes) {
       const iconComponent = this.renderIcon(item.module.icon);
       return (
         <Menu.SubMenu
           key={item.module.key}
           title={(
             <span>
               {iconComponent}
               <span>{item.module.title}</span>
             </span>
           )}
         >
           {/* {this.renderMenu(item.routes, level + 1)} */}
         </Menu.SubMenu>
       );
     }
 
     const iconComponent = this.renderIcon(item.module.icon);
     return (
       <Menu.Item key={item.module.key}>
         <a href={`/#/${item.module.path}`}>
           <span>
             {iconComponent}
             <span>{item.module.title}</span>
           </span>
         </a>
       </Menu.Item>
     );
   })
 
   render() {
     const { selectedMenu, selectedModule } = this.props;
     // 默认展开的菜单和选中的菜单
     const defaultOpenKeys = dot.get(selectedMenu, 'key');
     const defaultSelected = dot.get(selectedModule, 'key'); 
     return (
       <Menu theme="dark" mode="inline" defaultOpenKeys={[defaultOpenKeys]} selectedKeys={[defaultSelected]}>
         {/* {this.renderMenu(navigation)} */}
       </Menu>
     );
   }
 }
 
 Navigation.propTypes = {
   selectedMenu: PropTypes.object, // 选中的菜单
   selectedModule: PropTypes.object, // 选中的模块
 };
 
 Navigation.defaultProps = {
   selectedMenu: {},
   selectedModule: {},
 };
 
 export default Navigation;
 