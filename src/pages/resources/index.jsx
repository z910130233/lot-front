import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import styles from '../../global.less';
import Link from '@/custdef/Link';
import { Button, Drawer, Layout, Popconfirm, Table } from 'antd';
import { formatMessage } from 'umi';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import appStyle from '@/global.less';
import ResourcesHeader from '@/pages/resources/ResourcesHeader';
import ResourcesEditSlip from '@/pages/resources/resourcesEditSlip';
import { formatThousand } from '@/utils/utils';

const { Content, Header } = Layout;
const namespace = 'Resources';

class Resources extends React.Component {

  changePage(current) {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/initData',
      payload: {
        current: current,
      },
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
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
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/initData',
      payload: {
        pageSize: pageSize,
      },
    });
  };


  handleEdit = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/jumpToEdit',
      payload: {
        visibleEdit: true,
        resourcesId: record.resourcesId,
      },
    });
  };

  onCloseEdit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  confirm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/deleteItem',
      payload: {
        resourcesId: record.resourcesId,
      },
    });
  };

  cancel = () => {

  };

  render() {
    const { resourcesList, total, pages, loading, visibleEdit } = this.props;
    const { current, pageSize } = pages;
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
      },{
        title: '二级地区',
        dataIndex: 'subordinateArea',
        key: 'SUBORDINATE_AREA',
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
        title: '型号',
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
            <span style={{ color: '#f40' }}>￥{formatThousand(text)}</span>
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
            <span>{!_.eq(text, null) ? moment(text).format('YYYY-MM-DD HH:mm') : '-'}</span>
          );
        },
      }, {
        title: '上一次更新时间',
        dataIndex: 'modifiedTime',
        key: 'MODIFIED_TIME',
        sorter: true,
        width: 200,
        render(text) {
          return (
            <span>{!_.eq(text, null) ? moment(text).format('YYYY-MM-DD HH:mm') : '-'}</span>
          );
        },
      }, {
        title: '和上一次修改对比',
        dataIndex: 'lastPrice',
        key: 'LAST_PRICE',
        width: 150,
        render(text) {
          if (text != null) {
            if (text > 0) {
              return (
                <span style={{ color: '#f40' }}>￥{formatThousand(text)}<span className={styles.Arrowhead}>↑</span></span>
              );
            } else if (text < 0) {
              return (
                <span style={{ color: '#1d953f' }}>￥{formatThousand(text)}<span className={styles.Arrowhead}>↓</span></span>
              );
            } else {
              return (
                <span style={{ color: '#f40' }}>￥{formatThousand(text)}</span>
              );
            }
          } else {
            return (
              <span style={{ color: '#f40' }}>-</span>
            );
          }
        },
      },
      {
        title: '大概运费',
        dataIndex: 'freight',
        key: 'FREIGHT',
        sorter: true,
        width: 150,
        render(text) {
          if (text != null) {
            return (
              <span style={{ color: '#f40' }}>￥{formatThousand(text)}</span>
            );
          } else {
            return (
              <span style={{ color: '#f40' }}>-</span>
            );
          }
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
            <Popconfirm title={formatMessage({ id: 'management.link.title' })}
                        okText={formatMessage({ id: 'management.link.yes' })}
                        cancelText={formatMessage({ id: 'management.link.no' })}
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
          <ResourcesHeader/>
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
            <ResourcesEditSlip/>
          </Drawer>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { loading, resourcesList, total, pages, visibleEdit } = state[namespace];
  return { loading, resourcesList, total, pages, visibleEdit };
}

export default connect(mapStateToProps)(Resources);
