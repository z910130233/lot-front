import React from 'react';
import {connect} from 'dva';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Layout, Menu} from "antd";
import {Link} from 'react-router-dom'
import iconEnum from "@/custdef/IconEnum";
import style from "./index.less"
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";

const {Header, Footer, Sider, Content} = Layout;
const {SubMenu} = Menu;

const namespace = 'PageManage';

const mappingIcon = menuData => {
  const mappingMenu = menuData.map(item => ({
    ...item,
    icon: iconEnum[item.icon],
    children: item.children ? mappingIcon(item.children) : [],
  }));
  return mappingMenu;
};

class PageManage extends React.Component {
  handleIcon = (title) =>(
    <Link>{title}<span className={style.index_top}><PlusCircleOutlined className={style.iconHover} onClick={(e)=>this.IconOnClick(e)}/></span></Link>
  )

  IconOnClick(e) {
    console.log(e)
  }
  menuTag = function deep(menuData) {
    if (menuData && menuData.length > 0) {
      return menuData.map(item => {
        if (item.title != "" && item.title != null) {
          if (item.children && item.children.length > 0) {
            return (
              <SubMenu className={style.tops} key={item.path} icon={item.icon} title={this.handleIcon(item.title)}>
                {deep(item.children)}
              </SubMenu>
            )
          }
          return (
            <Menu.Item key={item.path} icon={item.icon}>
              {/*<Link to={item.path}>{item.name}</Link>*/}
              <Link>{item.title}</Link>
            </Menu.Item>)
        }
      })
    }
  }

  render() {
    const {loading, routesData} = this.props;
    const {routes} = routesData;

    const iconMenuData = mappingIcon(routes);

    return (
      <PageHeaderWrapper>
        <Layout className={style.layouts}>
          <Sider theme="light" width={300}>
            <Menu
              mode="inline"
              theme="light"
            >
              {this.menuTag(iconMenuData)}
            </Menu>
          </Sider>
          <Layout>
            <Content>
              Content
            </Content>
          </Layout>
        </Layout>
      </PageHeaderWrapper>
    );
  }
}

function mapStateToProps(state) {
  const {loading, routesData} = state[namespace];
  return {loading, routesData};
}

export default connect(mapStateToProps)(PageManage);
