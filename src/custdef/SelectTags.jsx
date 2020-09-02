import React from 'react';
import { Select } from 'antd';
import { getCodeUrls, getSelectOption } from '@/services/SelectService';
import styles from '@/pages/management/index.less';

const { Option } = Select;

class SelectTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      code: props.code,
      optionData: null,
      mode: props.mode,
    };
  }

  optionsList = async () => {
    const { url, code } = this.state;
    if (code != null) {
      const result = await getSelectOption(code);
      console.log(result)
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

  componentWillMount() {
    const { code,url } = this.props;
    this.setState({
      code: code,
      url: url
    })
  }

  componentDidMount() {
    this.optionsList();
  }

  render() {
    const { optionData, mode } = this.state;
    return (
      <Select
        {...this.props}
        mode='tags'
        options={optionData}
        allowClear={true}
        // style={{ width: 180 }}
        showArrow={true}
      >
      </Select>
    );
  }
}

export default SelectTags;
