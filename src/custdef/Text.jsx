import React from 'react';
import { Tag, Tooltip } from 'antd';
import PropTypes from 'prop-types';

class Text extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    disabled: PropTypes.bool,
  };

  state = {
    disabled: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.disabled !== nextProps.disabled) {
      return { disabled: nextProps.disabled };
    }
    return null;
  }


  render() {
    let { className, title, onClick, value, type, color } = this.props;
    // const newProps = omit(this.props, ['className', 'title', 'onClick']);
    // const classString = classnames(className, 'text-link');
    const newTitle = title && title.props ? title.props.text : title;
    // console.log(value);
    if (type == 'tag') {
      if (value === '可用') {
        color = '#2db7f5';
        return (
          <Tag color={color}>
            {value}
          </Tag>
        );
      } else if (value === '暂缓') {
        color = '#f50';
        return (
          <Tag color={color}>
            {value}
          </Tag>
        );
      } else {
        return (
          <Tag color={color}>
            {value}
          </Tag>
        );
      }
    } else {
      return (
        <Tooltip title={newTitle}>
          <span>{value}</span>
        </Tooltip>
      );
    }
  }
}

export default Text;
