import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row } from 'antd';
import Text from '@/custdef/Text';
import style from './index.less';
import styles from '../../global.less';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import FormIcon from '@/custdef/FormIcon';
import TagList from '@/custdef/TagList';

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

  };
  console.log(data);
  if (data != null) {
    form.setFieldsValue({
      title: data.title,
      icon: data.icon,
      authorityDesc: data.authorityDesc,
    });
  } else {
    form.setFieldsValue({
      title: null,
      icon: null,
      authorityDesc: null,
    });
  }

  return (
    <Form form={form} layout={'vertical'} name="control-ref"
          onFinish={onFinish} onValuesChange={onValuesChange} className={style.forms}>
      <div className={style.n}>
        <span className={style["override-ant-btn"]}>
          <Button>zheshi</Button>
          <Button>zheshi</Button>
          <Button>zheshi</Button>
          <Button>zheshi</Button>
          <Button>zheshi</Button>
        </span>
        <span>
          <Button>zheshi1</Button>
        </span>
        <span>
          <Button>zheshi2</Button>
        </span>
      </div>
      <Row className={style.BottomSureBox}>
        <Col span={24}>
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Form.Item>
              <Button style={{ marginRight: 8 }} icon={<DeleteOutlined/>} danger>删除</Button>
              <Button style={{ marginRight: 8 }} icon={<EditOutlined/>} type="primary">编辑</Button>
              <Button style={{ marginRight: 8 }} icon={<PlusOutlined/>}
                      className={styles.button_color_green}>新增</Button>
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <FormItem name={'title'} label={'名称'}>
            <Text></Text>
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem name={'icon'} label={'图标'}>
            <FormIcon></FormIcon>
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem name={'authorityDesc'} label={'页面权限'}>
            <TagList></TagList>
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
