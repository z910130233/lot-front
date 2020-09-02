import { connect } from 'dva';
import React from 'react';
import { Button, Col, Form, Input, Row, Select, DatePicker } from 'antd';
import Selects from '@/custdef/Selects';
import styles from '@/pages/management/index.less';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allValues: null,
    };
  }


  handleSelects = (value, option) => {
    // console.log(option)
    this.setState({
      code: option,
    });
  };

  handleSelect = () => {
    const { dispatch } = this.props;
    const { allValues } = this.state;
    if (allValues != null) {
      dispatch({
        type: 'management/initData',
        payload: {
          requestData: allValues,
        },
      });
    } else {
      dispatch({
        type: 'management/initData',
        payload: {},
      });
    }
  };

  handleReset = () => {
    const { dispatch } = this.props;
    this.setState({
      allValues: null,
    });
    dispatch({
      type: 'management/initData',
      payload: {},
    });
  };

  onValuesChange = (changedValues, allValues) => {
    this.setState({
      allValues: allValues,
    });
  };

  render() {

    return (
      <div className={styles.headerSearch}>
        <Form layout={'inline'} onValuesChange={this.onValuesChange}>
          <FormItem name={'username'} label={'用户名'}>
            <Input placeholder="请输入" allowClear/>
          </FormItem>
          <FormItem name={'createDate'} label={'创建时间'}>
            <RangePicker
              ranges={{
                '今天': [moment(), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
              }}
              // onChange={onChange}
            />
          </FormItem>
          {/*<FormItem name={'test2'} label={'选择1'}>*/}
          {/*  <Input placeholder="请输入"/>*/}
          {/*</FormItem>*/}
          {/*<FormItem name={'test3'} label={'选择1'}>*/}
          {/*  <Selects onChange={this.handleSelects} code={'ABCDE'} maxTagCount={1} placeholder="请选择"/>*/}
          {/*</FormItem>*/}
          {/*<FormItem name={'test4'} label={'选择1'}>*/}
          {/*  <Selects onChange={this.handleSelects} code={'ABCDE'} maxTagCount={1} placeholder="请选择"/>*/}
          {/*</FormItem>*/}
          <Row>
            <Col span={24} className={styles.sureOrResetMargin}>
              <Button type="primary" onClick={this.handleSelect}>查询</Button>
              <Button onClick={this.handleReset}>重置</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { userList, total, pages, loading, inputValue } = state.management;
  // console.log(states);
  return { userList, total, pages, loading, inputValue };
}

export default connect(mapStateToProps)(HeaderSearch);
