import React, { useState } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Skeleton, Switch, Tag } from 'antd';
import Text from '@/custdef/Text';

const FormItem = Form.Item;

const ManagementViewSlip = (props) => {
  const [form] = Form.useForm();
  const { userList, loading } = props;

  const onValuesChange = (changedValues, allValues) => {
    console.log(changedValues, allValues);
  };

  const onFinish = values => {
    console.log(values);
  };

  if (userList != null) {
    form.setFieldsValue({
      username: userList.username,
      password: userList.password,
      email: userList.email,
      telphone: userList.telphone,
      status: userList.status === '1' ? "可用" : "暂缓"
    });
  } else {
    form.setFieldsValue({
      username: null,
      password: null,
      email: null,
      telphone: null,
      status: true,
    });
  }

  return (
    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
      <Form form={form} layout={'inline'} onValuesChange={onValuesChange} name="control-ref"
            onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem name={'username'} label={'用户名称'}>
              <Text></Text>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'email'} label={'电子邮箱'}>
              <Text></Text>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'telphone'} label={'手机号码'}>
              <Text></Text>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'password'} label={'用户密码'}>
              <Text></Text>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'status'} label={'启用状态'}>
              <Text type="tag"></Text>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Skeleton>
  );
};


function mapStateToProps(state) {
  const { userList, loading } = state.managementViewSlip;
  return { userList, loading };
}

export default connect(mapStateToProps)(ManagementViewSlip);
