import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Skeleton, Switch } from 'antd';
import UploadFile from '@/custdef/upload/UploadFile';
import style from '@/pages/management/index.less';

const namespace = 'RotationChartEditSlip';
const FormItem = Form.Item;

const RotationChartEditSlip = (props) => {
  const [form] = Form.useForm();
  const { rotationChartList, loading, isDisableInput, loadingBut } = props;

  const onFinish = values => {
    const { dispatch, rotationChartList } = props;
    if (values.isHide) {
      values.isHide = 'Y';
    } else {
      values.isHide = 'N';
    }
    let rotationChartId;
    if (rotationChartList != null) {
      rotationChartId = { rotationChartId: rotationChartList.rotationChartId };
    }
    values = Object.assign(values, rotationChartId);
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
      type: 'RotationChartIndex/jumpToEdit',
      payload: {
        visibleEdit: false,
      },
    });
  };

  if (rotationChartList != null) {
    form.setFieldsValue({
      imgPaths: rotationChartList.imgPaths,
      imgDesc: rotationChartList.imgDesc,
      isHide: rotationChartList.isHide==='Y'?true:false,
      orders: rotationChartList.orders,
      imgLink: rotationChartList.imgLink,
      remark: rotationChartList.remark,
    });
  } else {
    form.setFieldsValue({
      imgPaths: null,
      imgDesc: null,
      isHide: null,
      orders: null,
      imgLink: null,
      remark: true,
    });
  }
  return (
    <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
      <Form form={form} layout={'vertical'} name="control-ref"
            onFinish={onFinish} onValuesChange={onValuesChange}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem name={'imgPaths'} label={'图片'} rules={[{ required: true, message: '请上传图片' }]}>
              <UploadFile aspect={69/28} max={1} ></UploadFile>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'imgDesc'} label={'说明'}
                      rules={[{ required: true, message: '请输入说明' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'isHide'} label={'是否显示'} rules={[{ required: true, message: '请选择' }]} valuePropName="checked">
              <Switch checkedChildren="是" unCheckedChildren="否" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'orders'} label={'排序'} rules={[{ required: true, message: '请输入排序' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'imgLink'} label={'链接到'} rules={[{ required: true, message: '请输入链接到' }]}>
              <Input></Input>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name={'remark'} label={'备注'} rules={[{ required: false, message: '请输入备注' }]}>
              <Input.TextArea rows={2}></Input.TextArea>
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
  const { loading, rotationChartList, loadingBut } = state[namespace];
  return { loading, rotationChartList, loadingBut };
}

export default connect(mapStateToProps)(RotationChartEditSlip);
