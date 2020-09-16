import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Layout, Menu, Modal, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import iconEnum from '@/custdef/IconEnum';
import style from './index.less';
import PlusCircleOutlined from '@ant-design/icons/lib/icons/PlusCircleOutlined';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const namespace = 'PageManage';

const mappingIcon = menuData => {
  const mappingMenu = menuData.map(item => ({
    ...item,
    icon: iconEnum[item.icon],
    children: item.children ? mappingIcon(item.children) : [],
  }));
  return mappingMenu;
};

const IconOnClick = (e, props, routesId) => {
  e.stopPropagation();
  const { dispatch } = props;
  dispatch({
    type: namespace + '/changeModal',
    payload: {
      visible: true,
      routesId: routesId,
    },
  });
  console.log(props);
  console.log(routesId);
};

class PageManage extends React.Component {

  menuTag = function deep(menuData) {
    if (menuData && menuData.length > 0) {
      return menuData.map(item => {
        if (item.title != '' && item.title != null) {
          if (item.children && item.children.length > 0) {
            return (
              <SubMenu className={style.tops} key={item.routesId} icon={item.icon}
                       title={<span>{item.title}<span className={style.index_top}><Tooltip
                         title="添加子菜单"><PlusCircleOutlined
                         className={style.iconHover}
                         onClick={(e) => IconOnClick(e, this.props, item.routesId)}/></Tooltip></span></span>}>
                {deep(item.children)}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={item.routesId} icon={item.icon}>
              {/*<Link to={item.path}>{item.name}</Link>*/}
              {/*<span>{item.title}</span>*/}
              <span>{item.title}<span className={style.index_top}><Tooltip title="添加子菜单"><PlusCircleOutlined
                className={style.iconHover}
                onClick={(e) => IconOnClick(e, this.props, item.routesId)}/></Tooltip></span></span>
            </Menu.Item>);
        }
      });
    }
  };

  handleChangeModel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/changeModal',
      payload: {
        visible: false,
      },
    });
  };

  render() {
    const { visible, routesData } = this.props;
    const { routes } = routesData;

    const iconMenuData = mappingIcon(routes);

    return (
      <PageHeaderWrapper>
        <Layout className={style.layouts}>
          <Sider theme="light" width={350}>
            <Menu
              mode="inline"
              theme="light"
            >
              {this.menuTag(iconMenuData)}
            </Menu>
            <Modal
              title="添加菜单"
              centered={true}
              visible={visible}
              onOk={this.handleChangeModel}
              onCancel={this.handleChangeModel}
            >
              <p>Some contents...</p>
            </Modal>
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
  const { visible, routesData } = state[namespace];
  return { visible, routesData };
}

export default connect(mapStateToProps)(PageManage);
