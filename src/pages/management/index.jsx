import React from 'react';
import {connect} from 'dva';
import {PlusOutlined, UnorderedListOutlined, WechatOutlined, LaptopOutlined} from '@ant-design/icons';
import {Table, Avatar, Button, Layout, Drawer, Tag, Popconfirm} from 'antd';
import Link from '../../custdef/Link';
import {formatMessage} from 'umi';
import styles from './index.less';
import appStyle from '../../global.less';
import HeaderSearch from '@/pages/management/HeaderSearch';
import moment from 'moment';
import ManagementEditSlip from '@/pages/management/managementEditSlip';
import ManagementViewSlip from '@/pages/management/managementViewSlip';
import PageHeaderWrapper from '@ant-design/pro-layout/es/PageHeaderWrapper';
import {beautySub} from '@/utils/utils';

const {Content, Header} = Layout;

class Management extends React.Component {
  constructor(props) {
    super(props);
  }

  changePage(current) {
    const {dispatch} = this.props;
    dispatch({
      type: 'management/initData',
      payload: {
        current: current,
      },
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const {dispatch} = this.props;
    dispatch({
      type: `management/tableChange`,
      payload: {
        // pagination,
        orderColumn: sorter.columnKey,
        orderDirection: sorter.order === 'descend' ? 'desc' : 'asc',
      },
    });
  };

  onShowSizeChange = (current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'management/initPageSize',
      payload: {
        pageSize: pageSize,
      },
    });
  };

  handleEdit = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'management/jumpToEdit',
      payload: {
        visibleEdit: true,
        userId: record.userId,
      },
    });
  };

  handleView = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'management/jumpToView',
      payload: {
        visibleView: true,
        userId: record.userId,
      },
    });
  };


  onCloseView = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'management/jumpToView',
      payload: {
        visibleView: false,
      },
    });
  };

  onCloseEdit = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'management/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  confirm = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'management/deleteItem',
      payload: {
        userId: record.userId,
      },
    });
  };

  cancel = () => {

  };

  render() {
    const {userList, total, pages, loading, visibleEdit, visibleView, disableBtn} = this.props;
    const {current, pageSize} = pages;
    // console.log(states);
    const columns = [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'AVATAR',
        width: 120,
        align: 'center',
        fixed: 'left',
        render: (text) => {
          return <Avatar shape="square" size="large" src={text}/>;
        },
      }, {
        title: formatMessage({id: 'management.username'}),
        dataIndex: 'userName',
        key: 'USERNAME',
        width: 200,
        sorter: true,
        fixed: 'left',
      }, {
        title: '用户来源',
        dataIndex: 'openId',
        key: 'OPEN_ID',
        width: 150,
        sorter: true,
        render: (text, row) => {
          if (row.openId != null) {
            return <span style={{color: 'green'}}><WechatOutlined/>微信</span>;
          } else {
            return <span style={{color: 'red'}}><LaptopOutlined/>系统</span>;
          }
        },
      }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'EMAIL',
        width: 200,
        sorter: true,
      }, {
        title: '手机号',
        dataIndex: 'telphone',
        key: 'TELPHONE',
        width: 180,
        sorter: true,
      }, {
        title: '密码',
        dataIndex: 'password',
        key: 'PASSWORD',
        width: 200,
        sorter: true,
        render: (text) => {
          return <span>{beautySub(text, 11)}</span>
        },
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'STATUS',
        width: 150,
        sorter: true,
        render: (text) => {
          let color, t;
          if (text === '0') {
            color = '#f50';
            t = '暂缓';
          } else if (text === '1') {
            color = '#2db7f5';
            t = '可用';
          }
          return <Tag color={color}>{t}</Tag>;
        },
      }, {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'CREATED_TIME',
        width: 200,
        sorter: true,
        render: (text, row) => {
          return (
            <span>{text != null ? moment(text).format('YYYY-MM-DD HH:mm') : '-'}</span>
          );
        },
      }, {
        title: '操作',
        // dataIndex: 'operation',
        width: 200,
        align: 'center',
        fixed: 'right',
        render: (text, record) => (
          <span className={styles.linkMargins}>
            {record && record.ynFlag === 'Y' &&
            <Link disabled={record.openId != null} onClick={() => this.handleEdit(record)}>编辑</Link>}
            {record && record.ynFlag === 'Y' && <Link onClick={() => this.handleView(record)}>查看</Link>}
            {record && record.ynFlag === 'Y' &&
            <Popconfirm title={formatMessage({id: 'management.link.title'})}
                        okText={formatMessage({id: 'management.link.yes'})}
                        cancelText={formatMessage({id: 'management.link.no'})}
                        onConfirm={() => this.confirm(record)}
                        onCancel={this.cancel}
            >
              <Link>删除</Link>
            </Popconfirm>
            }
          </span>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize),
      showTotal: () => `共${total}条数据`,
      pageSize: pageSize,
      current: current,
      total: total,
      onChange: (current) => this.changePage(current),
    };

    return (
      // <PageHeaderWrapper>
      <Layout>
        <Header className={styles.headers}>
          <HeaderSearch/>
          <div className={appStyle.clearFloat}></div>
        </Header>
        <div>
          <div className={appStyle.tableLayout}>
            <div className={appStyle.tablePresentation}>
              <div>
                <UnorderedListOutlined/>
                用户列表
              </div>
              <div className={appStyle.optional}>
                {/*左端旁*/}
              </div>
            </div>
            <div className={appStyle.addButton}>
              <Button type="primary" icon={<PlusOutlined/>} onClick={this.handleEdit}>添加</Button>
            </div>
          </div>
          <Content>
            <Table
              id={'managementTable'}
              columns={columns}
              dataSource={userList}
              size="small"
              onChange={this.handleTableChange}
              pagination={paginationProps}
              loading={loading}
            />
          </Content>
          <Drawer
            title="添加或修改用户"
            placement="right"
            closable={true}
            onClose={this.onCloseEdit}
            visible={visibleEdit}
            width={400}
          >
            <ManagementEditSlip/>
          </Drawer>
          <Drawer
            title="查看用户"
            placement="right"
            closable={true}
            onClose={this.onCloseView}
            visible={visibleView}
            width={400}
          >
            <ManagementViewSlip/>
          </Drawer>
        </div>
      </Layout>
      //</PageHeaderWrapper>
    );
  }

};

function mapStateToProps(state) {
  const {userList, total, pages, loading, visibleEdit, userData, disableBtn, visibleView} = state.management;
  // console.log(states);
  return {userList, total, pages, loading, visibleEdit, userData, disableBtn, visibleView};
}

export default connect(mapStateToProps)(Management);
