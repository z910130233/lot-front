import React from 'react';
import { connect } from 'dva';
import { Button, Drawer, Layout, Popconfirm, Table } from 'antd';
import Img from '@/custdef/Img';
import styles from '@/global.less';
import moment from 'moment';
import Link from '@/custdef/Link';
import { formatMessage } from 'umi';
import appStyle from '@/global.less';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import DemandRequestEditSlip from '@/pages/demandRequest/demandRequestAudit';
import DemandHeader from '@/pages/demand/DemandHeader';
import DemandEditSlip from '@/pages/demand/demandEditSlip';

const namespace = 'DemandIndex';
const { Content, Header } = Layout;

class DemandIndex extends React.Component {
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
        demandId: record.demandId,
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
        rotationChartId: record.rotationChartId,
      },
    });
  };

  cancel = () => {

  };

  render() {
    const { loading, demandList, total, pages, visibleEdit } = this.props;
    const { current, pageSize } = pages;
    const columns = [
      {
        title: '用户',
        dataIndex: 'userName',
        key: 'userName',
        align: 'center',
        width: 200,
      }, {
        title: '联系方式',
        dataIndex: 'telphone',
        key: 'telphone',
        align: 'center',
        width: 180,
      }, {
        title: '品牌',
        dataIndex: 'brand',
        key: 'BRAND',
        sorter: true,
        width: 180,
      },
      {
        title: '品类',
        dataIndex: 'material',
        key: 'MATERIAL',
        width: 200,
      },{
        title: '型号',
        dataIndex: 'model',
        key: 'model',
        sorter: true,
        width: 200,
      },{
        title: '重量',
        dataIndex: 'weight',
        key: 'WEIGHT',
        sorter: true,
        width: 180,
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
          <DemandHeader/>
          <div className={appStyle.clearFloat}></div>
        </Header>
        <div>
          <div className={appStyle.tableLayout}>
            <div className={appStyle.tablePresentation}>
              <div>
                <UnorderedListOutlined/>
                需求列表
              </div>
              <div className={appStyle.optional}>
                {/*左端旁*/}
              </div>
            </div>
            <div className={appStyle.addButton}>
              <Button type="primary" icon={<PlusOutlined/>} onClick={this.handleEdit} disabled>添加</Button>
            </div>
          </div>
          <Content className={styles.contents}>
            <Table
              id={'demandTable'}
              columns={columns}
              dataSource={demandList}
              size="small"
              onChange={this.handleTableChange}
              pagination={paginationProps}
              loading={loading}
            />
          </Content>
          <Drawer
            title="添加或修改"
            placement="right"
            closable={true}
            onClose={this.onCloseEdit}
            visible={visibleEdit}
            width={400}
          >
            <DemandEditSlip/>
          </Drawer>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { loading, demandList, total, pages, visibleEdit } = state[namespace];
  return { loading, demandList, total, pages, visibleEdit };
}

export default connect(mapStateToProps)(DemandIndex);
