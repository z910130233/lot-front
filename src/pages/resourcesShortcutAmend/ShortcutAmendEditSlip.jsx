import React from "react";
import {connect} from "dva";
import {Button, Col, Form, Input, Layout, Row, Skeleton, Tabs} from "antd";
import style from "@/pages/resourcesManage/index.less";
import Selects from "@/custdef/Selects";

const namespace = 'ResourcesShortcutAmend';
const FormItem = Form.Item;


const ShortcutAmendEditSlip = (props) => {
  const [form] = Form.useForm();
  const {saveData, loading, isDisableInput, loadingBut} = props;

  const onFinish = values => {
    const {dispatch} = props;
    let modelDetailed = {
      hbr400E_L_12: values.HBR400E_L_12,
      hbr400E_L_14: values.HBR400E_L_14,
      hbr400E_L_16: values.HBR400E_L_16,
      hbr400E_L_18: values.HBR400E_L_18,
      hbr400E_L_20: values.HBR400E_L_20,
      hbr400E_L_22: values.HBR400E_L_22,
      hbr400E_L_25: values.HBR400E_L_25,
      hbr400E_L_28: values.HBR400E_L_28,
      hbr400E_L_32: values.HBR400E_L_32,
      hbr400E_P_6: values.HBR400E_P_6,
      hbr400E_P_8: values.HBR400E_P_8,
      hbr400E_P_10: values.HBR400E_P_10,
      hbr400E_X_6: values.HBR400E_X_6,
      hbr400E_X_8: values.HBR400E_X_8,
      hbr400E_X_10: values.HBR400E_X_10,
    };
    const status = 'Y';
    // values = Object.assign(values);
    dispatch({
      type: namespace + '/save',
      payload: {
        visible: false,
        submitData: values,
        modelDetailed: modelDetailed,
        status: status
      },
    });
  };

  const onValuesChange = value => {
    console.log(value);
  };

  const onCloseEdit = () => {
    const {dispatch} = props;
    dispatch({
      type: namespace + '/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };
  if (saveData != null) {
    form.setFieldsValue({
      HBR400E_P_6: saveData.hbr400EP6,
      HBR400E_P_8: saveData.hbr400EP8,
      HBR400E_P_10: saveData.hbr400EP10,
      HBR400E_X_6: saveData.hbr400EX6,
      HBR400E_X_8: saveData.hbr400EX8,
      HBR400E_X_10: saveData.hbr400EX10,
      HBR400E_L_12: saveData.hrb400EL12,
      HBR400E_L_14: saveData.hbr400EL14,
      HBR400E_L_16: saveData.hbr400EL16,
      HBR400E_L_18: saveData.hbr400EL18,
      HBR400E_L_20: saveData.hbr400EL20,
      HBR400E_L_22: saveData.hbr400EL22,
      HBR400E_L_25: saveData.hbr400EL25,
      HBR400E_L_28: saveData.hbr400EL28,
      HBR400E_L_32: saveData.hbr400EL32,
    });
  } else {
    form.setFieldsValue({
      HBR400E_P_6: null,
      HBR400E_P_8: null,
      HBR400E_P_10: null,
      HBR400E_X_6: null,
      HBR400E_X_8: null,
      HBR400E_X_10: null,
      HBR400E_L_12: null,
      HBR400E_L_14: null,
      HBR400E_L_16: null,
      HBR400E_L_18: null,
      HBR400E_L_20: null,
      HBR400E_L_22: null,
      HBR400E_L_25: null,
      HBR400E_L_28: null,
      HBR400E_L_32: null,
    });
  }

  return (
    <Form form={form} name="control-ref" onFinish={onFinish} onValuesChange={onValuesChange}>
      <Row gutter={24}>
        <Col span={8}>
          <FormItem name={'HBR400E_L_12'} label={'螺纹钢φ12'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_L_14'} label={'螺纹钢φ14'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_L_16'} label={'螺纹钢φ16'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_L_18'} label={'螺纹钢φ18'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_L_20'} label={'螺纹钢φ20'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_L_22'} label={'螺纹钢φ22'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_L_25'} label={'螺纹钢φ25'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_L_28'} label={'螺纹钢φ28'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_L_32'} label={'螺纹钢φ32'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_P_6'} label={'盘螺φ6'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_P_8'} label={'盘螺φ8'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_P_10'} label={'盘螺φ10'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_X_6'} label={'线材φ6'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_X_8'} label={'线材φ8'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'HBR400E_X_10'} label={'线材φ10'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'address'} label={'一级地区'}
                    rules={[{required: true, message: '请输入'}]}>
            <Selects code='ADDRESS'></Selects>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'subordinateArea'} label={'二级地区'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
              // disabled={isDisableInput}
            ></Input>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name={'brand'} label={'品牌'}
                    rules={[{required: true, message: '请输入'}]}>
            <Selects code='BRAND'></Selects>
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem name={'price'} label={'螺纹钢 φ18-22'}
                    rules={[{required: true, message: '请输入'}]}>
            <Input
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
              <Button onClick={onCloseEdit} style={{marginRight: 8}}>取消</Button>
              <Button type="primary" htmlType="submit" loading={loadingBut}>
                确定
              </Button>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
}


function mapStateToProps(state) {
  const {loading, saveData, loadingBut} = state[namespace];
  return {loading, saveData, loadingBut};
}

export default connect(mapStateToProps)(ShortcutAmendEditSlip);
