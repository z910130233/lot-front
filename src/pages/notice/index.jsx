import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import styles from '@/global.less';
import Link from '@/custdef/Link';
import { Button, Drawer, Layout, Popconfirm, Table } from 'antd';
import { formatMessage } from 'umi';
import appStyle from '@/global.less';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import NoticeHeader from '@/pages/notice/NoticeHeader';
import NoticeEditSlip from '@/pages/notice/noticeEditSlip';
import Img from '@/custdef/Img';

const { Content, Header } = Layout;
const namespace = 'NoticeIndex';

class NoticeIndex extends React.Component{

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
        noticeId: record.noticeId,
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
        noticeId: record.noticeId,
      },
    });
  };

  cancel = () => {

  };

  render() {
    const { noticeList, total, pages, loading, visibleEdit } = this.props;
    const { current, pageSize } = pages;
    const columns = [
      {
        title: '标题图片',
        dataIndex: 'imgPath',
        key: 'IMG_PATH',
        align: 'center',
        width: 200,
        render(text) {
          return <Img src={text} width={75} height={45}></Img>
        }
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'TITLE',
        sorter: true,
        width: 240,
      },{
        title: '公告类型',
        dataIndex: 'model',
        key: 'MODEL',
        sorter: true,
        width: 180,
      },{
        title: '是否为公告',
        dataIndex: 'status',
        key: 'STATUS',
        sorter: true,
        width: 120,
        render(text) {
          if(text==='Y'){
            return <div className={styles.optionDiv}><div className={styles.selectYesDot}/>是</div>;
          }else{
            return <div className={styles.optionDiv}><div className={styles.selectNoDot}/>否</div>;
          }
        },
      }, {
        title: '是否推荐',
        dataIndex: 'isRecommend',
        key: 'IS_RECOMMEND',
        sorter: true,
        width: 120,
        render(text) {
          if(text==='Y'){
            return <div className={styles.optionDiv}><div className={styles.selectYesDot}/>是</div>;
          }else{
            return <div className={styles.optionDiv}><div className={styles.selectNoDot}/>否</div>;
          }
        },
      },
       {
        title: '是否显示',
        dataIndex: 'isHide',
        key: 'IS_HIDE',
        sorter: true,
        width: 120,
        render(text) {
          if(text==='Y'){
            return <div className={styles.optionDiv}><div className={styles.selectYesDot}/>是</div>;
          }else{
            return <div className={styles.optionDiv}><div className={styles.selectNoDot}/>否</div>;
          }
        },
      },
      {
        title: '排序',
        dataIndex: 'orders',
        key: 'ORDERS',
        sorter: true,
        width: 120,
      }, {
        title: '阅读数量',
        dataIndex: 'readCount',
        key: 'READ_COUNT',
        sorter: true,
        width: 150,
        render(text) {
          return (
            <span style={{ color: '#f40' }}>{text}</span>
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'CREATED_TIME',
        sorter: true,
        width: 180,
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
          <NoticeHeader/>
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
              dataSource={noticeList}
              size="small"
              onChange={this.handleTableChange}
              pagination={paginationProps}
              loading={loading}
              scroll={{ x: 1500 }}
            />
          </Content>
          <Drawer
            title="添加或修改"
            placement="right"
            closable={true}
            onClose={this.onCloseEdit}
            visible={visibleEdit}
            width={1400}
          >
            <NoticeEditSlip/>
          </Drawer>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { loading, noticeList, total, pages, visibleEdit } = state[namespace];
  return { loading, noticeList, total, pages, visibleEdit };
}

export default connect(mapStateToProps)(NoticeIndex);
