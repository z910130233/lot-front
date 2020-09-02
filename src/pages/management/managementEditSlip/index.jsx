import React, { useState } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Layout, Row, Select, Skeleton, Switch, Upload } from 'antd';
import style from '../index.less';
import UploadFile from '@/custdef/upload/UploadFile';

const FormItem = Form.Item;
const { Option } = Select;

const ManagementEditSlip = (props) => {
  const [form] = Form.useForm();
  const { userList, loading, isDisableInput, loadingBut } = props;

  const onFinish = values => {
    const { dispatch, userList } = props;
    if (values.status) {
      values.status = '1';
    } else {
      values.status = '0';
    }
    let userId;
    if (userList != null){
      userId = { userId: userList.id };
    }
    values = Object.assign(values, userId);
    dispatch({
      type: 'managementEditSlip/save',
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
      type: 'management/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  if (userList != null) {
    form.setFieldsValue({
      avatars: userList.avatars,
      userId: userList.userId,
      username: userList.username,
      password: userList.password,
      email: userList.email,
      telphone: userList.telphone,
      status: userList.status === '1' ? true : false,
    });
  } else {
    form.setFieldsValue({
      avatars: null,
      userId: null,
      username: null,
      password: null,
      email: null,
      telphone: null,
      status: true,
    });
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="86">
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
      <Form form={form} layout={'vertical'} name="control-ref"
            onFinish={onFinish} onValuesChange={onValuesChange}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem name={'avatars'} label={'头像'} rules={[{ required: true, message: '请上传头像' }]}>
              <UploadFile aspect={1/1} max={1}></UploadFile>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'username'} label={'用户名称'} rules={[{min: 5,max: 15, required: true, message: '请输入有效的用户名称（长度大于5且小于15）' }]}>
              <Input
                // disabled={isDisableInput}
              ></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'email'} label={'电子邮箱'} rules={[{
              type: 'email',
              message: '输入的电子邮件无效!',
            },{ required: true, message: '请输入邮箱账号' }]}>
              <Input
                // disabled={isDisableInput}
              ></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'telphone'} label={'手机号码'} rules={[{ required: false, message: '请输入手机号码' }]}>
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'password'} label={'用户密码'} rules={[{ required: true, message: '请输入用户密码' }]}>
              <Input.Password></Input.Password>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'status'} label={'启用状态'} valuePropName="checked">
              <Switch checkedChildren="可用" unCheckedChildren="暂缓"/>
            </FormItem>
          </Col>
        </Row>
        <Row className={style.BottomSureBox}>
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
  const { userList, loading, isDisableInput, loadingBut } = state.managementEditSlip;
  return { userList, loading, isDisableInput, loadingBut };
}

export default connect(mapStateToProps)(ManagementEditSlip);
