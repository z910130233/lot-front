import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import styles from '../../global.less';
import Link from '@/custdef/Link';
import {Button, Drawer, Layout, Popconfirm, Table} from 'antd';
import {formatMessage} from 'umi';
import {PlusOutlined, UnorderedListOutlined} from '@ant-design/icons';
import appStyle from '@/global.less';
import ResourcesEditSlip from '@/pages/resources/resourcesEditSlip';
import {formatThousand} from '@/utils/utils';
import ResourcesManageHeader from '@/pages/resourcesManage/ResourcesManageHeader';
import ResourcesManageEditSlip from '@/pages/resourcesManage/resourcesManageEditSlip';

const {Content, Header} = Layout;
const namespace = 'ResourcesManage';

class ResourcesManage extends React.Component {

  changePage(current) {
    const {dispatch} = this.props;
    dispatch({
      type: namespace + '/initData',
      payload: {
        current: current,
      },
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const {dispatch} = this.props;
    dispatch({
      type: namespace + `/initData`,
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
      type: namespace + '/initData',
      payload: {
        pageSize: pageSize,
      },
    });
  };


  handleEdit = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: namespace + '/jumpToEdit',
      payload: {
        visibleEdit: true,
        resourcesManageId: record.resourcesManageId,
      },
    });
  };

  onCloseEdit = () => {
    const {dispatch} = this.props;
    dispatch({
      type: namespace + '/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  confirm = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: namespace + '/deleteItem',
      payload: {
        resourcesManageId: record.resourcesManageId,
      },
    });
  };

  cancel = () => {

  };

  render() {
    const {resourcesList, total, pages, loading, visibleEdit} = this.props;
    const {current, pageSize} = pages;
    const columns = [
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'BRAND',
        sorter: true,
        fixed: 'left',
        width: 150,
      },
      {
        title: '一级地区',
        dataIndex: 'address',
        key: 'ADDRESS',
        sorter: true,
        fixed: 'left',
        width: 100,
      }, {
        title: '二级地区',
        dataIndex: 'subordinateArea',
        key: 'subordinate_Area',
        sorter: true,
        fixed: 'left',
        width: 100,
      }, {
        title: '材质',
        dataIndex: 'material',
        key: 'MATERIAL',
        sorter: true,
        width: 150,
      },
      {
        title: '型号范围',
        dataIndex: 'model',
        key: 'MODEL',
        sorter: true,
        width: 200,
      }, {
        title: '价格',
        dataIndex: 'price',
        key: 'PRICE',
        sorter: true,
        width: 150,
        render(text) {
          return (
            <span style={{color: '#f40'}}>￥{formatThousand(text)}</span>
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'CREATED_TIME',
        sorter: true,
        width: 200,
        render(text) {
          return (
            <span>{text != null ? moment(text).format('YYYY-MM-DD HH:mm') : '-'}</span>
          );
        },
      },
      {
        title: '操作',
        width: 200,
        align: 'center',
        fixed: 'right',
        render: (text, record) => (
          <span className={styles.linkMargins}>
            {record && record.ynFlag === 'Y' && <Link onClick={() => this.handleEdit(record)}>编辑</Link>}
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
      <Layout>
        <Header className={styles.headers}>
          <ResourcesManageHeader/>
          <div className={appStyle.clearFloat}></div>
        </Header>
        <div>
          <div className={appStyle.tableLayout}>
            <div className={appStyle.tablePresentation}>
              <div>
                <UnorderedListOutlined/>
                数据列表
              </div>
              <div className={appStyle.optional}>
                {/*左端旁*/}
              </div>
            </div>
            <div className={appStyle.addButton}>
              <Button type="primary" icon={<PlusOutlined/>} onClick={this.handleEdit}>添加</Button>
            </div>
          </div>
          <Content className={styles.contents}>
            <Table
              id={'managementTable'}
              columns={columns}
              dataSource={resourcesList}
              size="small"
              onChange={this.handleTableChange}
              pagination={paginationProps}
              loading={loading}
              // scroll={{ x: 1650 }}
            />
          </Content>
          <Drawer
            title="添加或修改"
            placement="right"
            closable={true}
            onClose={this.onCloseEdit}
            visible={visibleEdit}
            width={300}
          >
            <ResourcesManageEditSlip/>
          </Drawer>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const {loading, resourcesList, total, pages, visibleEdit} = state[namespace];
  return {loading, resourcesList, total, pages, visibleEdit};
}

export default connect(mapStateToProps)(ResourcesManage);
