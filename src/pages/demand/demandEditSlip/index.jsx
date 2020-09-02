import React, { useState } from 'react';
import { connect } from 'dva';
import { Button, Col, Collapse, Form, Input, Layout, Row, Select, Skeleton, Switch, Upload } from 'antd';
import style from '../index.less';
import UploadFile from '@/custdef/upload/UploadFile';
import Text from '@/custdef/Text';

const FormItem = Form.Item;
const { Panel } = Collapse;
const { Option } = Select;

const namespace = 'DemandEditSlip';

const DemandEditSlip = (props) => {
  const [form] = Form.useForm();
  const { resourcesList, loading, isDisableInput, loadingBut } = props;

  const onFinish = values => {
    const { dispatch, resourcesList } = props;
    let demandRequestId;
    if (resourcesList != null) {
      demandRequestId = { demandRequestId: resourcesList.demandRequestId };
    }
    values = Object.assign(values, demandRequestId);
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
      type: 'DemandIndex/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  if (resourcesList != null) {
    form.setFieldsValue({
      userId: resourcesList.userId,
      brand: resourcesList.brand,
      material: resourcesList.material,
      model: resourcesList.model,
      weight:resourcesList.weight,
      imgPaths: resourcesList.imgPaths,
      status: resourcesList.status,
      userName: resourcesList.userName,
      telphone: resourcesList.telphone,
    });
  } else {
    form.setFieldsValue({
      userId: null,
      brand: null,
      material: null,
      model: null,
      weight:null,
      imgPaths: null,
      status: null,
      userName: null,
      telphone: null,
    });
  }

  function callback(key) {
    // console.log(key);
  }

  return (
    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
      <Form form={form} layout={'horizontal'} name="control-ref"
            onFinish={onFinish} onValuesChange={onValuesChange}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem name={'userName'} label={'发起用户'}
                      rules={[{ required: false, message: '请输入品牌' }]}>
              <Text></Text>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'telphone'} label={'联系方式'}
                      rules={[{ required: false, message: '请输入品牌' }]}>
              <Text></Text>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'brand'} label={'品牌'}
                      rules={[{ required: true, message: '请输入品牌' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'material'} label={'品类'}
                      rules={[{ required: true, message: '请输入品类' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'model'} label={'型号'}
                      rules={[{ required: true, message: '请输入型号' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'weight'} label={'重量'}
                      rules={[{ required: true, message: '请输入重量' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'status'} label={'状态'}
                      rules={[{ required: true, message: '请选择状态' }]}>
              <Select allowClear defaultValue="N">
                <Option value="Y">未审核</Option>
                <Option value="N">已审核</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'imgPaths'} label={'需求图片'} rules={[{ required: false, message: '请输入型号' }]}>
              <UploadFile disabled max={4}></UploadFile>
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

export default connect(mapStateToProps)(DemandEditSlip);
