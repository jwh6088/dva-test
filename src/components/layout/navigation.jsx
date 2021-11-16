/**
 *  侧栏导航
 * */
import { Menu } from 'antd';
import React from 'react';
import * as Icons from '@ant-design/icons';
import { authorize } from '../../application';
const { SubMenu } = Menu

const Navigation = () => {
  // 获取菜单数据
  const navigation = [
    {
      canAccess:true, // 权限
      icon:"", // 图标
      key:1,
      title:"系统管理",
      path:"/", // 路由
    }
  ];

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
    // if (item.module.canAccess === false) {
    //   return undefined;
    // }
    // 子菜单
    if (item.routes) {
      const iconComponent = renderIcon(item.module.icon);
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
          {renderMenu(item.routes, level + 1)}
        </Menu.SubMenu>
      );
    }
    // icon组件
    const iconComponent = renderIcon(item.module.icon);
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

  return (
    <Menu theme="dark" mode="inline">
      {/* {renderMenu(navigation)} */}
      <SubMenu key="sub1" title="subnav 1">
        <Menu.Item key="1">option1</Menu.Item>
        <Menu.Item key="2">option2</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default Navigation;
