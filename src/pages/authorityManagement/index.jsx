import React from 'react';
import { connect } from 'dva';
import { Button, Drawer, Layout, Popconfirm, Space, Table, Tabs, Tag } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import { UnorderedListOutlined } from '@ant-design/icons';
import Link from '@/custdef/Link';
import { formatMessage } from 'umi';
import moment from 'moment';
import ManagementEditSlip from '@/pages/management/managementEditSlip';
import AuthorityAddSlip from '@/pages/authorityManagement/authorityAddSlip';

const namespace = 'AuthorityToUser';
const { TabPane } = Tabs;
const { Content } = Layout;

class Authority extends React.Component {

  addAuthority = () => {
    const { currentlyOnly, dispatch } = this.props;
    dispatch({
      type: namespace + '/openAddSlip',
      payload: {
        visible: true,
        currentlyOnly: currentlyOnly,
      },
    });
  };

  //This is changing tags function
  onChange = (activeKey) => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/changeActiveKey',
      payload: {
        currentlyOnly: activeKey,
      },
    });
  };

  changePage(current) {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/initData',
      payload: {
        current: current,
      },
    });
  }

  onCloseEdit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/openAddSlip',
      payload: {
        visible: false,
      },
    });
  };

  render() {
    const { loading, roleList, authorityList, total, pages, currentlyOnly, visible } = this.props;
    const { current, pageSize } = pages;
    const operations = <Button type="primary" onClick={()=>this.addAuthority()}>修改权限</Button>;
    const columns = [
      {
        title: '权限url',
        dataIndex: 'code',
        key: 'CODE',
        width: 300,
      },
      {
        title: '权限说明',
        dataIndex: 'authorityDesc',
        key: 'AUTHORITY_DESC',
        width: 500,
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'CREATED_TIME',
        width: 200,
        render: (text, row) => {
          return (
            <span>{text != null ? moment(text).format('YYYY-MM-DD HH:mm') : '-'}</span>
          );
        },
      },
      // {
      //   title: '操作',
      //   width: 200,
      //   align: 'center',
      //   fixed: 'right',
      //   render: (text, record) => (
      //     <span className={styles.linkMargins}>
      //       {record && record.ynFlag === 'Y' && <Link disabled onClick={() => this.handleEdit(record)}>编辑</Link>}
      //       {record && record.ynFlag === 'Y' &&
      //       <Popconfirm title={formatMessage({ id: 'management.link.title' })}
      //                   okText={formatMessage({ id: 'management.link.yes' })}
      //                   cancelText={formatMessage({ id: 'management.link.no' })}
      //                   onConfirm={() => this.confirm(record)}
      //                   onCancel={this.cancel}
      //       >
      //         <Link>删除</Link>
      //       </Popconfirm>
      //       }
      //     </span>
      //   ),
      // },
    ];

    const paginationProps = {
      // showSizeChanger: true,
      showQuickJumper: true,
      // onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize),
      showTotal: () => `共${total}条数据`,
      pageSize: pageSize,
      current: current,
      total: total,
      onChange: (current) => this.changePage(current),
    };

    return (
      <Layout className={styles.layout}>
        <div className={styles.authorityBox}>
          <UnorderedListOutlined/>
          权限管理
          <span style={{ margin: 8,color: "red" }}>(非专业人员请勿操作此列表，否则会暴露接口导致系统安全性降低)</span>
        </div>
        <Tabs tabBarExtraContent={operations} defaultActiveKey="0" keyboard={false} animated={false}
              onChange={this.onChange}>
          {roleList != null && roleList.map((item, index) => (
            <TabPane tab={item.roleDesc} key={item.roleId}>
              <Content>
                <Table
                  columns={columns}
                  dataSource={authorityList}
                  size="small"
                  loading={loading}
                  pagination={paginationProps}
                />
              </Content>
            </TabPane>
          ))}
        </Tabs>
        <Drawer
          title="修改权限"
          placement="right"
          closable={true}
          onClose={this.onCloseEdit}
          visible={visible}
          width={800}
        >
          <AuthorityAddSlip/>
        </Drawer>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { loading, roleList, authorityList, total, pages, currentlyOnly, visible } = state[namespace];
  return { loading, roleList, authorityList, total, pages, currentlyOnly, visible };
}

export default connect(mapStateToProps)(Authority);
