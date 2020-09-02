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
import DemandRequestHeader from '@/pages/demandRequest/DemandRequestHeader';
import ImgList from '@/custdef/ImgList';
import Text from '@/custdef/Text';

const namespace = 'DemandRequestIndex';
const { Content, Header } = Layout;

class DemandRequestIndex extends React.Component {
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
        demandRequestId: record.demandRequestId,
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
        demandRequestId: record.demandRequestId,
      },
    });
  };

  cancel = () => {

  };

  render() {
    const { loading, demandRequestList, total, pages, visibleEdit } = this.props;
    const { current, pageSize } = pages;
    const columns = [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        align: 'center',
        width: 200,
      }, {
        title: '联系方式',
        dataIndex: 'telphone',
        key: 'telphone',
        align: 'center',
        width: 200,
      },{
        title: '内容',
        dataIndex: 'demandContent',
        key: 'DEMAND_CONTENT',
        sorter: true,
        width: 300,
      },
      {
        title: '图片',
        dataIndex: 'imgList',
        key: 'demandImgPath',
        width: 500,
        render(text) {
          return <ImgList srcList={text} width={75} height={45}></ImgList>;
        },
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'STATUS',
        sorter: true,
        width: 120,
        render(text) {
          if (text === 'Y') {
            text = "未审核";
            return (
              <Text type='tag' color='#2db7f5' value={text}></Text>
            );
          } else if (text === 'N') {
            text = "已审核";
            return (
              <Text type='tag' color='#f50' value={text}></Text>
            );
          }
        },
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'REMARK',
        sorter: true,
        width: 250,
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
            {record && record.ynFlag === 'Y' &&
            <Link disabled={record.status === 'N'} onClick={() => this.handleEdit(record)}>审核</Link>}
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
          <DemandRequestHeader/>
          <div className={appStyle.clearFloat}></div>
        </Header>
        <div>
          <div className={appStyle.tableLayout}>
            <div className={appStyle.tablePresentation}>
              <div>
                <UnorderedListOutlined/>
                需求请求列表
              </div>
              <div className={appStyle.optional}>
                {/*左端旁*/}
              </div>
            </div>
            <div className={appStyle.addButton}>
              <Button type="primary" icon={<PlusOutlined/>} onClick={this.handleEdit} disabled>添加需求请求</Button>
            </div>
          </div>
          <Content className={styles.contents}>
            <Table
              id={'demandRequestTable'}
              columns={columns}
              dataSource={demandRequestList}
              size="small"
              onChange={this.handleTableChange}
              pagination={paginationProps}
              loading={loading}
            />
          </Content>
          <Drawer
            title="审核发布"
            placement="right"
            closable={true}
            onClose={this.onCloseEdit}
            visible={visibleEdit}
            width={900}
          >
            <DemandRequestEditSlip/>
          </Drawer>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { loading, demandRequestList, total, pages, visibleEdit } = state[namespace];
  return { loading, demandRequestList, total, pages, visibleEdit };
}

export default connect(mapStateToProps)(DemandRequestIndex);
