import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Layout, Menu, Modal, Skeleton, Tooltip } from 'antd';
import iconEnum from '@/custdef/IconEnum';
import style from './index.less';
import PlusCircleOutlined from '@ant-design/icons/lib/icons/PlusCircleOutlined';
import PageDataShow from '@/pages/pageManage/PageDataShow';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const namespace = 'PageManage';

let props;

const mappingIcon = menuData => {
  const mappingMenu = menuData.map(item => ({
    ...item,
    icon: iconEnum[item.icon],
    children: item.children ? mappingIcon(item.children) : [],
  }));
  return mappingMenu;
};

const IconOnClick = (e, routesId) => {
  e.stopPropagation();
  const { dispatch } = props;
  dispatch({
    type: namespace + '/changeModal',
    payload: {
      visible: true,
      routesId: routesId,
    },
  });
};

class PageManage extends React.Component {

  componentWillMount() {
    props = this.props;
    const { keys, dispatch } = this.props;
    dispatch({
      type: namespace + '/changeKey',
      payload: {
        key: keys,
      },
    });
  }

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
                         onClick={(e) => IconOnClick(e, item.routesId)}/></Tooltip></span></span>}>
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
                onClick={(e) => IconOnClick(e, item.routesId)}/></Tooltip></span></span>
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

  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    const { visible, routesData, loading, keys } = this.props;
    let routes = [];
    if (typeof routesData == 'undefined') {
    } else {
      routes = routesData.routes;
    }
    const iconMenuData = mappingIcon(routes);

    return (
      <PageHeaderWrapper>
        <Layout className={style.layouts}>
          <Sider theme="light" width={350}>
            <Menu
              mode="inline"
              theme="light"
              defaultSelectedKeys={[keys]}
              onClick={this.handleClick}
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
            <Content className={style.contents}>
              <Skeleton loading={loading} className={style.contents_Skeleton} active paragraph={{ rows: 25 }}>
                <div className={style.top_box}>
                  <div>页面管理设置</div>
                </div>
                <PageDataShow/>
              </Skeleton>
            </Content>
          </Layout>
        </Layout>
      </PageHeaderWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { visible, routesData, loading, keys } = state[namespace];
  return { visible, routesData, loading, keys };
}

export default connect(mapStateToProps)(PageManage);
