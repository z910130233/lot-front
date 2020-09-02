import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Skeleton, Switch } from 'antd';
import style from '@/pages/management/index.less';
import Editor from '@/custdef/Editor';

const namespace = 'OtherEditSlip';
const FormItem = Form.Item;

const OtherEditSlip = (props) => {
  const [form] = Form.useForm();
  const { noticeList, loading,  loadingBut } = props;

  const onFinish = values => {
    const { dispatch } = props;
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
      type: 'OtherEditSlip/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  if (noticeList != null) {
    form.setFieldsValue({
      string: noticeList.aboutUs,
    });
  } else {
    form.setFieldsValue({
      string: null,
    });
  }
  return (
    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
      <Form form={form} layout={'vertical'} name="control-ref"
            onFinish={onFinish} onValuesChange={onValuesChange}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem name={'string'} label={'修改内容'} rules={[{ required: false, message: '请输入' }]}>
              <Editor height='410px'></Editor>
            </FormItem>
          </Col>
        </Row>
        <Row className={style.BottomSureBoxByNotices}>
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

export default connect(mapStateToProps)(OtherEditSlip);
