import { connect } from 'dva';
import React from 'react';
import { Button, Col, Form, Input, Row, Select, DatePicker } from 'antd';
import Selects from '@/custdef/Selects';
import styles from '@/pages/management/index.less';
import moment from 'moment';

const namespace = 'NoticeIndex';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class NoticeHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSelect = () => {
    const { dispatch, requestData } = this.props;
    if (requestData != null) {
      dispatch({
        type: namespace + '/initData',
        payload: {
          requestData: requestData,
        },
      });
    } else {
      dispatch({
        type: namespace + '/initData',
        payload: {},
      });
    }
  };

  handleReset = () => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/initData',
      payload: {
        requestData: null
      },
    });
  };

  onValuesChange = (changedValues, requestData) => {
    const { dispatch } = this.props;
    dispatch({
      type: namespace + '/onValuesChange',
      payload: {
        requestData: requestData,
      },
    });
  };

  render() {

    return (
      <div className={styles.headerSearch}>
        <Form layout={'inline'} onValuesChange={this.onValuesChange}>
          <FormItem name={'title'} label={'标题'}>
            <Input placeholder="请输入" allowClear/>
          </FormItem>
          <FormItem name={'isHide'} label={'是否显示'}>
            <Select style={{ width: 150 }} onChange={this.handleChange} placeholder="请选择" allowClear>
              <Option value="Y">
                <div className={styles.optionDiv}><div className={styles.selectYesDot}/>是</div>
              </Option>
              <Option value="N">
                <div className={styles.optionDiv}><div className={styles.selectNoDot}/>否</div>
              </Option>
            </Select>
          </FormItem>
          <FormItem name={'isRecommend'} label={'是否推荐'}>
            <Select style={{ width: 150 }} onChange={this.handleChange} placeholder="请选择" allowClear>
              <Option value="Y">
                <div className={styles.optionDiv}><div className={styles.selectYesDot}/>是</div>
              </Option>
              <Option value="N">
                <div className={styles.optionDiv}><div className={styles.selectNoDot}/>否</div>
              </Option>
            </Select>
          </FormItem>
          <FormItem name={'status'} label={'是否为公告'}>
            <Select style={{ width: 150 }} onChange={this.handleChange} placeholder="请选择" allowClear>
              <Option value="Y">
                <div className={styles.optionDiv}><div className={styles.selectYesDot}/>是</div>
              </Option>
              <Option value="N">
                <div className={styles.optionDiv}><div className={styles.selectNoDot}/>否</div>
              </Option>
            </Select>
          </FormItem>
          {/*<FormItem name={'model'} label={'型号'}>*/}
          {/*  <Input placeholder="请输入" allowClear/>*/}
          {/*</FormItem>*/}
          {/*<FormItem name={'createDate'} label={'创建时间'}>*/}
          {/*  <RangePicker*/}
          {/*    ranges={{*/}
          {/*      '今天': [moment(), moment()],*/}
          {/*      '本月': [moment().startOf('month'), moment().endOf('month')],*/}
          {/*    }}*/}
          {/*    // onChange={onChange}*/}
          {/*  />*/}
          {/*</FormItem>*/}
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
  const { requestData } = state[namespace];
  // console.log(states);
  return { requestData };
}

export default connect(mapStateToProps)(NoticeHeader);
