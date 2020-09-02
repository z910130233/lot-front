import React from 'react';
import {connect} from 'dva';
import {Button, Drawer, Layout, Skeleton, Table, Tabs, Upload, message} from 'antd';
import moment from 'moment';
import styles from '@/pages/authorityManagement/index.less';
import {UnorderedListOutlined} from '@ant-design/icons';
import Editor from '@/custdef/Editor';
import OtherEditSlip from '@/pages/other/OhterEditSlip';
import UploadFile from "@/custdef/upload/UploadFile";
import ImgCrop from "antd-img-crop";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Img from "@/custdef/Img";

const namespace = 'OtherIndex';
const {TabPane} = Tabs;
const {Content} = Layout;

class OtherIndex extends React.Component {

  addAuthority = () => {
    const {currentlyOnly, dispatch} = this.props;
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

  onClickImg = () => {
    const {dispatch} = this.props;
    dispatch({
      type: namespace + '/saveImg',
      payload: {

      },
    });
  }

  onChangeImg = (info) => {
    const {dispatch} = this.props;
    if (info.file.status !== 'uploading') {
      dispatch({
        type: namespace + '/onChangeImg',
        payload: {
          imgUrl: info.file.response.data.url,
        },
      });
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  }

  render() {
    const {loading, visible, text, imgUrl} = this.props;
    const operations = <Button type="primary" onClick={() => this.addAuthority()}>修改</Button>;

    const propsS = {
      name: 'file',
      action: '/lot/open/upload',
    };

    return (
      <Layout className={styles.layout}>
        <div className={styles.authorityBox}>
          <UnorderedListOutlined/>
          其它管理
        </div>
        <Tabs tabBarExtraContent={operations} defaultActiveKey="0" keyboard={false} animated={false}
              onChange={this.onChange}>
          <TabPane tab="关于我们" key="0">
            <Content>
              <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
                <div dangerouslySetInnerHTML={{__html: text}} />
              </Skeleton>
            </Content>
          </TabPane>
          <TabPane tab="联系我们" key="1">
            <Content>
              <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
                <div dangerouslySetInnerHTML={{__html: text}} />
              </Skeleton>
            </Content>
          </TabPane>
          <TabPane tab="用户协议" key="2">
            <Content>
              <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
                <div dangerouslySetInnerHTML={{__html: text}} />
              </Skeleton>
            </Content>
          </TabPane>
          <TabPane tab="隐私政策" key="3">
            <Content>
              <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
                <div dangerouslySetInnerHTML={{__html: text}} />
              </Skeleton>
            </Content>
          </TabPane>
          <TabPane tab="需求示例" key="4">
            <Content>
              <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
                <div dangerouslySetInnerHTML={{__html: text}} />
              </Skeleton>
            </Content>
          </TabPane>
          <TabPane tab="常见问题" key="5">
            <Content>
              <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
                <div dangerouslySetInnerHTML={{__html: text}} />
              </Skeleton>
            </Content>
          </TabPane>
          <TabPane tab="封面图" key="6">
            <Content>
              <Skeleton active loading={loading} paragraph={{rows: 10}}>
                <div className={styles.startImg}>
                  <Upload {...propsS} onChange={this.onChangeImg}>
                    <Button>
                      <UploadOutlined/> 点击上传
                    </Button>
                  </Upload>
                  <Img src={imgUrl} width={375} height={667}></Img>
                  <Button className={styles.startImg} onClick={this.onClickImg}>确定</Button>
                </div>
              </Skeleton>
            </Content>
          </TabPane>
        </Tabs>
        <Drawer
          title="修改"
          placement="right"
          closable={true}
          onClose={this.onCloseEdit}
          visible={visible}
          width={900}
        >
          <OtherEditSlip/>
        </Drawer>
      </Layout>
    );
  }
}


function mapStateToProps(state) {
  const {loading, currentlyOnly, visible, text, imgUrl} = state[namespace];
  return {loading, currentlyOnly, visible, text, imgUrl};
}

export default connect(mapStateToProps)(OtherIndex);
