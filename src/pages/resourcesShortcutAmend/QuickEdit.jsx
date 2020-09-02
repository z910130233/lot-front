import React from "react";
import {connect} from "dva";
import {Button, Col, Form, Input, Row} from "antd";
import style from "@/pages/resourcesManage/index.less";

const namespace = 'ResourcesShortcutAmend';
const FormItem = Form.Item;

const QuickEdit = (props) => {
  const [form] = Form.useForm();
  const {quickSaveData, loading, isDisableInput, loadingBut} = props;

  const onFinish = values => {
    const {dispatch} = props;
    // values = Object.assign(values);
    dispatch({
      type: namespace + '/save',
      payload: {
        visible: false,
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
  if (quickSaveData != null) {
    form.setFieldsValue({
      price: quickSaveData.price,
    });
  } else {
    form.setFieldsValue({
      price: null
    });
  }

  return (
    <Form form={form} name="control-ref" onFinish={onFinish} onValuesChange={onValuesChange}>
      <Row gutter={24}>
        <Col span={24}>
          <FormItem name={'price'} label={'价格'}
                    rules={[{required: true, message: '请输入价格'}]}>
            <Input></Input>
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
  const {loading, quickSaveData, loadingBut} = state[namespace];
  return {loading, quickSaveData, loadingBut};
}

export default connect(mapStateToProps)(QuickEdit);
