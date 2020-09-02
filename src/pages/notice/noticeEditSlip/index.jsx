import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Skeleton, Switch } from 'antd';
import style from '@/pages/management/index.less';
import Editor from '@/custdef/Editor';
import styles from '../../../global.less';
import UploadFile from '@/custdef/upload/UploadFile';

const namespace = 'NoticeEditSlip';
const FormItem = Form.Item;

const Index = (props) => {
  const [form] = Form.useForm();
  const { noticeList, loading, isDisableInput, loadingBut } = props;

  const onFinish = values => {
    const { dispatch, noticeList } = props;
    if (values.isHide) {
      values.isHide = 'Y';
    } else {
      values.isHide = 'N';
    }
    if (values.status) {
      values.status = 'Y';
    } else {
      values.status = 'N';
    }
    if (values.isRecommend) {
      values.isRecommend = 'Y';
    } else {
      values.isRecommend = 'N';
    }
    let noticeId;
    if (noticeList != null) {
      noticeId = { noticeId: noticeList.noticeId };
    }
    values = Object.assign(values, noticeId);
    dispatch({
      type: namespace + '/save',
      payload: {
        visible: false,
        submitData: values,
      },
    });
  };

  const onValuesChange = value => {
    // console.log(value);
  };

  const onCloseEdit = () => {
    const { dispatch } = props;
    dispatch({
      type: 'NoticeIndex/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  if (noticeList != null) {
    form.setFieldsValue({
      title: noticeList.title,
      model: noticeList.model,
      isHide: noticeList.isHide === 'Y' ? true : false,
      orders: noticeList.orders,
      readCount: noticeList.readCount,
      content: noticeList.content,
      imgPaths: noticeList.imgPaths,
      status: noticeList.status === 'Y' ? true : false,
      isRecommend: noticeList.isRecommend === 'Y' ? true : false,
    });
  } else {
    form.setFieldsValue({
      title: null,
      model: null,
      isHide: true,
      orders: null,
      readCount: 0,
      content: null,
      imgPaths: null,
      status: false,
      isRecommend: false,
    });
  }
  return (
    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
      <Form form={form} layout={'horizontal'} name="control-ref"
            onFinish={onFinish} onValuesChange={onValuesChange}>
        <Row gutter={24}>
          <Col span={4}>
            <FormItem name={'imgPaths'} label={'图片'} rules={[{ required: false, message: '请上传图片' }]}>
              <UploadFile max={1} aspect={21 / 14}></UploadFile>
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem name={'model'} label={'类型'}
                      rules={[{ required: true, message: '请输入类型' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={3}>
            <FormItem name={'orders'} label={'排序'} rules={[{ required: true, message: '请输入排序' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={3}>
            <FormItem name={'status'} label={'是否公告'} rules={[{ required: true, message: '请选择' }]}
                      valuePropName="checked">
              <Switch checkedChildren="是" unCheckedChildren="否"/>
            </FormItem>
          </Col>
          <Col span={3}>
            <FormItem name={'isHide'} label={'是否显示'} rules={[{ required: true, message: '请选择' }]}
                      valuePropName="checked">
              <Switch checkedChildren="是" unCheckedChildren="否"/>
            </FormItem>
          </Col>
          <Col span={3}>
            <FormItem name={'isRecommend'} label={'是否推荐'} rules={[{ required: true, message: '请选择' }]}
                      valuePropName="checked">
              <Switch checkedChildren="是" unCheckedChildren="否"/>
            </FormItem>
          </Col>
          <Col span={3}>
            <FormItem name={'readCount'} label={'阅读数量'} rules={[{ required: false, message: '请输入' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'title'} label={'标题'} rules={[{ required: true, message: '请输入公告标题' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'content'} label={'公告内容'} rules={[{ required: false, message: '请输入' }]}>
              <Editor height='310px'></Editor>
            </FormItem>
          </Col>
        </Row>
        <Row className={style.BottomSureBoxByNotice}>
          <Col span={24}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <Form.Item>
                <Button onClick={onCloseEdit} style={{ marginRight: 8 }}>取消</Button>
                <Button type="primary" htmlType="submit" loading={loadingBut}>
                  确定
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </Skeleton>
  );
};

function mapStateToProps(state) {
  const { loading, noticeList, loadingBut } = state[namespace];
  return { loading, noticeList, loadingBut };
}

export default connect(mapStateToProps)(Index);
