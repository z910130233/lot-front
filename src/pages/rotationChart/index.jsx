import React from 'react';
import { connect } from 'dva';
import styles from '@/global.less';
import appStyle from '@/global.less';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Modal, Popconfirm, Table } from 'antd';
import RotationChartHeader from '@/pages/rotationChart/rotationChartHeader';
import moment from 'moment';
import Link from '@/custdef/Link';
import { formatMessage } from 'umi';
import RotationChartEditSlip from '@/pages/rotationChart/rotationChartEditSlip';
import Img from '@/custdef/Img';

const namespace = 'RotationChartIndex';
const { Content, Header } = Layout;

class RotationChartIndex extends React.Component {

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
        rotationChartId: record.rotationChartId,
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
    const { loading, rotationChartList, total, pages, visibleEdit } = this.props;
    const { current, pageSize } = pages;
    const columns = [
      {
        title: '图片',
        dataIndex: 'imgPath',
        key: 'IMG_PATH',
        align: 'center',
        width: 200,
        render(text) {
          return <Img src={text} width={75} height={45}></Img>
        }
      }, {
        title: '说明',
        dataIndex: 'imgDesc',
        key: 'IMG_DESC',
        sorter: true,
        width: 200,
      },
      {
        title: '是否显示',
        dataIndex: 'isHide',
        key: 'IS_HIDE',
        sorter: true,
        width: 150,
        render(text) {
          if(text==='Y'){
            return <div className={styles.optionDiv}><div className={styles.selectYesDot}/>是</div>;
          }else{
            return <div className={styles.optionDiv}><div className={styles.selectNoDot}/>否</div>;
          }
        },
      }, {
        title: '排序',
        dataIndex: 'orders',
        key: 'ORDERS',
        sorter: true,
        width: 100,
      },
      {
        title: '链接到',
        dataIndex: 'imgLink',
        key: 'IMG_LINK',
        sorter: true,
        width: 150,
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
          <RotationChartHeader/>
          <div className={appStyle.clearFloat}></div>
        </Header>
        <div>
          <div className={appStyle.tableLayout}>
            <div className={appStyle.tablePresentation}>
              <div>
                <UnorderedListOutlined/>
                轮播图列表
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
              id={'rotationChartTable'}
              columns={columns}
              dataSource={rotationChartList}
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
            <RotationChartEditSlip/>
          </Drawer>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { loading, rotationChartList, total, pages, visibleEdit } = state[namespace];
  return { loading, rotationChartList, total, pages, visibleEdit };
}

export default connect(mapStateToProps)(RotationChartIndex);
