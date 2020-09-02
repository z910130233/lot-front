import React from "react";
import {connect} from "dva";
import {Col, Form, Input, Layout, Row, Skeleton, Tabs} from "antd";
import styles from "@/pages/authorityManagement/index.less";
import {UnorderedListOutlined} from "@ant-design/icons";
import ShortcutAmendEditSlip from "@/pages/resourcesShortcutAmend/ShortcutAmendEditSlip";
import QuickEdit from "@/pages/resourcesShortcutAmend/QuickEdit";
// import OtherEditSlip from "@/pages/other/OhterEditSlip";

const namespace = 'ResourcesShortcutAmend';
const {TabPane} = Tabs;
const {Content} = Layout;
const FormItem = Form.Item;

class ResourcesShortcutAmend extends React.Component {

  render() {
    const {loading, visible, text} = this.props;
    // const operations = <Button type="primary" onClick={() => this.addAuthority()}>修改</Button>;

    return (
      <Layout className={styles.layout}>
        <div className={styles.authorityBox}>
          <UnorderedListOutlined/>
          快捷修改首页以及详情的数据
        </div>
        {/*tabBarExtraContent={operations}*/}
        <Tabs defaultActiveKey="0" keyboard={false} animated={false}
              onChange={this.onChange}>
          <TabPane tab="修改数据1" key="0">
            <Content>
              <Skeleton active loading={loading} paragraph={{rows: 10}}>
                <div className={styles.Descriptions}>
                  此页面为根据地区、品牌快速修改全部的价格，下方的规格数据请填写基于HRB400E φ18-22增加或减少的价格
                </div>
                <ShortcutAmendEditSlip></ShortcutAmendEditSlip>
              </Skeleton>
            </Content>
          </TabPane>
          <TabPane tab="修改数据2" key="1">
            <Content>
              <Skeleton active loading={loading} paragraph={{rows: 10}}>
                <QuickEdit></QuickEdit>
              </Skeleton>
            </Content>
          </TabPane>
          {/*<TabPane tab="用户协议" key="2">*/}
          {/*  <Content>*/}
          {/*    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>*/}
          {/*      <div dangerouslySetInnerHTML={{__html: text}} />*/}
          {/*    </Skeleton>*/}
          {/*  </Content>*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="隐私政策" key="3">*/}
          {/*  <Content>*/}
          {/*    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>*/}
          {/*      <div dangerouslySetInnerHTML={{__html: text}} />*/}
          {/*    </Skeleton>*/}
          {/*  </Content>*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="需求示例" key="4">*/}
          {/*  <Content>*/}
          {/*    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>*/}
          {/*      <div dangerouslySetInnerHTML={{__html: text}} />*/}
          {/*    </Skeleton>*/}
          {/*  </Content>*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="常见问题" key="5">*/}
          {/*  <Content>*/}
          {/*    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>*/}
          {/*      <div dangerouslySetInnerHTML={{__html: text}} />*/}
          {/*    </Skeleton>*/}
          {/*  </Content>*/}
          {/*</TabPane>*/}
        </Tabs>
        {/*<Drawer*/}
        {/*  title="修改"*/}
        {/*  placement="right"*/}
        {/*  closable={true}*/}
        {/*  onClose={this.onCloseEdit}*/}
        {/*  visible={visible}*/}
        {/*  width={900}*/}
        {/*>*/}
        {/*  <OtherEditSlip/>*/}
        {/*</Drawer>*/}
      </Layout>
    );
  }
}


function mapStateToProps(state) {
  const {loading} = state[namespace];
  return {loading};
}

export default connect(mapStateToProps)(ResourcesShortcutAmend);
