import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Switch } from 'antd';
import UploadFile from '@/custdef/upload/UploadFile';
import Text from '@/custdef/Text';

const namespace = 'PageManage';
const FormItem = Form.Item;

const PageDataShow = (props) => {
  const [form] = Form.useForm();
  const { data } = props;

  const onFinish = values => {
    const { dispatch } = props;
    values = Object.assign(values);
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

  if (data != null) {
    form.setFieldsValue({});
  } else {
    form.setFieldsValue({});
  }

  return (
    <Form form={form} layout={'vertical'} name="control-ref"
          onFinish={onFinish} onValuesChange={onValuesChange}>
      <Row gutter={24}>
        <Col span={24}>
          <FormItem name={'avatars'} label={'头像'}>
            <Text></Text>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

function mapStateToProps(state) {
  const { data } = state[namespace];
  return { data };
}

export default connect(mapStateToProps)(PageDataShow);
