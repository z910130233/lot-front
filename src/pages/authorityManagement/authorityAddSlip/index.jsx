import React from 'react';
import { connect } from 'dva';
import { Skeleton, Table, Tag } from 'antd';
import styles from '../index.less';

const namespace = 'AuthorityAddSlip';

class AuthorityAddSlip extends React.Component {

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/onSelectChange',
      payload: {
        selectedRowKeys: selectedRowKeys,
      },
    });
  };

  render() {
    const { skeletonLoading, authorityAllList, tableLoading, total, nowId, roleName } = this.props;
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
    ];

    const paginationProps = {
      showQuickJumper: true,
      showTotal: () => `共${total}条数据`,
      pageSize: 13,
    };
    const rowSelection = {
      selectedRowKeys: nowId,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL
      ],
    };
    return (
      <Skeleton active loading={skeletonLoading} paragraph={{ rows: 15 }}>
        <div className={styles.authoritySelectTopBox}>
          当前角色为：<Tag color="#f50">{roleName}</Tag>可添加以下权限:
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={authorityAllList}
          size="small"
          loading={tableLoading}
          pagination={paginationProps}
        />
      </Skeleton>
    );
  }
}

function mapStateToProps(state) {
  const { skeletonLoading, tableLoading, authorityAllList, total, nowId, roleName } = state[namespace];
  return { skeletonLoading, tableLoading, authorityAllList, total, nowId, roleName };
}

export default connect(mapStateToProps)(AuthorityAddSlip);
