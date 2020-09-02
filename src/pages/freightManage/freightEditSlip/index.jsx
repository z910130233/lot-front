import React, { useState } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Layout, Row, Skeleton, Switch, Upload } from 'antd';
import style from '../index.less';
import UploadFile from '@/custdef/upload/UploadFile';

const FormItem = Form.Item;

const namespace = 'FreightEditSlip';

const FreightEditSlip = (props) => {
  const [form] = Form.useForm();
  const { resourcesList, loading, isDisableInput, loadingBut } = props;

  const onFinish = values => {
    const { dispatch, resourcesList } = props;
    let resourcesFreightId;
    if (resourcesList != null){
      resourcesFreightId = { resourcesFreightId: resourcesList.resourcesFreightId };
    }
    values = Object.assign(values, resourcesFreightId);
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
      type:  'FreightIndex/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  if (resourcesList != null) {
    form.setFieldsValue({
      resourcesFreightId: resourcesList.resourcesFreightId,
      subordinateArea: resourcesList.subordinateArea,
      freight: resourcesList.freight,
      address: resourcesList.address
    });
  } else {
    form.setFieldsValue({
      resourcesFreightId: null,
      subordinateArea: null,
      freight: null,
      address: null
    });
  }

  return (
    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
      <Form form={form} layout={'vertical'} name="control-ref"
            onFinish={onFinish} onValuesChange={onValuesChange}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem name={'address'} label={'一级地区'}
                      rules={[{ required: true, message: '请输入一级地区' }]}>
              <Input
                // disabled={isDisableInput}
              ></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'subordinateArea'} label={'二级地区'}
                      rules={[{required: true, message: '请输入二级地区' }]}>
              <Input
                // disabled={isDisableInput}
              ></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'freight'} label={'运费'} rules={[{ required: true, message: '请输入运费' }]}>
              <Input prefix="￥" suffix="人民币"
                // disabled={isDisableInput}
              ></Input>
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
  const { resourcesList, loading, isDisableInput, loadingBut } = state[namespace];
  return { resourcesList, loading, isDisableInput, loadingBut };
}

export default connect(mapStateToProps)(FreightEditSlip);
