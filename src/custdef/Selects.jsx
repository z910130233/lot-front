import React from 'react';
import { Select } from 'antd';
import { getCodeUrls, getSelectOption } from '@/services/SelectService';
import styles from '@/pages/management/index.less';

const { Option } = Select;

class Selects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      code: props.code,
      optionData: null,
      mode: props.mode,
    };
  }

  // static propTypes = {h
  //   options: PropTypes.array,
  //   url: PropTypes.string,
  //   disabled:PropTypes.boolean,
  //   allowClear:PropTypes.boolean
  // };
  optionsList = async () => {
    const { url, code } = this.state;
    if (code != null) {
      const result = await getSelectOption(code);
      this.setState({
        optionData: result.data.value,
      });
    } else if (url != null) {
      const result = await getCodeUrls(url);
      this.setState({
        optionData: result.data.value,
      });
    }
  };

  componentDidMount() {
    this.optionsList();
  }

  render() {
    const { optionData, mode } = this.state;
    return (
      <Select
        {...this.props}
        mode='multiple'
        options={optionData}
        allowClear={true}
        // style={{ width: 180 }}
        showArrow={true}
      >
      </Select>
    );
  }
}

export default Selects;
