/**
 *  侧栏导航
 * */
import { Menu } from 'antd';
import React from 'react';
import * as Icons from '@ant-design/icons';
import { authorize } from '../../application';
const { SubMenu } = Menu

/** 实现思路
用户信息
返回结果
const account = {
  name:'admin',
  roles:[admin,accAdmin],
  modules:[system,account,roles]
}
所有模块
const Modules = [
  system,
  account,
  roles,
]
所有角色
const roles = [
  admin:[system,account,roles]
  accAdmin:[system,account]
]
从账号的角色中获取模块白名单
whiteList = account.roles.map.concat(item.modules) 
判断模块是否在白名单的方法
isInWhiteList(module)=>{
  return module.is.in(whiteList)
}
导航配置结构
const navigation= {
  .....
}
导航渲染所有模块，判断此模块是否在白名单里
renderNav = () => {
  navigation.map.isInWhiteList(item)
}
*/

const Navigation = () => {
  // 此账号拥有的模块
  const { modules } = authorize.account
  // 导航结构
  const navigation = [
    {
      canAccess:false, // 权限
      icon:"SettingFilled", 
      key:"system",
      title:"系统管理",
      path:"/",
      children:[
        {
          canAccess:false, 
          icon:"UserOutlined", 
          key:"account",
          title:"账号管理",
          path:"system/account",
        },
        {
          canAccess:false, 
          icon:"SkinOutlined", 
          key:"roles",
          title:"角色管理",
          path:"system/roles",
        }
      ]
    }
  ];
  // 判断账号绑定的角色，如果有多个角色，合并角色数组

  // 根据账号拥有的模块改变导航数据
  const authentication = (menus,modules) => {
    for (const menu of menus) {
      for (const module of modules) {
        if(menu.key === module){
          menu.canAccess = true
          if(menu.children){
            authentication(menu.children,modules)
          }
        }
      }
    }
  }
  authentication(navigation,modules)

  // 动态渲染Icon
  const renderIcon = (icon) => {
    if (icon === '' || !Icons[icon]) {
      return '';
    }
    const ElementIcon = Icons[icon];
    return <ElementIcon />;
  }

  // 渲染菜单
  const renderMenu = (data, level = 0) => data.map((item) => {
    // 判断模块是否有权限可以访问, 并且可以显示在菜单栏上
    if (item.canAccess === false) {
      return undefined;
    }
    const iconComponent = renderIcon(item.icon);
    // 有子菜单
    if (item.children) {
      return (
        <SubMenu
          key={item.key}
          title={(<span>{iconComponent}<span>{item.title}</span></span>)}
        >
          {renderMenu(item.children, level + 1)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.key}>
        <a href={`/#/${item.path}`}>
          <span>{iconComponent}<span>{item.title}</span></span>
        </a>
      </Menu.Item>
    );
  })

  return (
    <Menu theme="dark" mode="inline">
      {renderMenu(navigation)}
    </Menu>
  );
}

export default Navigation;
