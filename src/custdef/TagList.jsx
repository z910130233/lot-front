import React from 'react';
import { Tag } from 'antd';
import { colorChange } from '@/utils/utils';

class TagList extends React.Component {


  render() {
    const { value } = this.props;
    const valueList = [];
    if (value != null) {
      for (let i = 0; i < value.length; i++) {
        const color = colorChange();
        valueList.push(
          <Tag color={color}>{value[i]}</Tag>,
        );
      }
    }
    return (
      <div>
        {valueList}
      </div>
    );
  }
}

export default TagList;
