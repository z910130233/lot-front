import React from 'react';
import omit from 'omit.js';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popconfirm } from 'antd';
import { formatMessage } from 'umi';

class Link extends React.Component {
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

  handleClick = e => {
    if (this.state.disabled) return;
    this.props.onClick && this.props.onClick(e);
  };

  render() {
    const { disabled } = this.state;
    const { className, children, title, onClick, type } = this.props;
    const newProps = omit(this.props, ['className', 'title', 'disabled', 'onClick']);
    const classString = classnames(className, 'text-link');
    const newTitle = title && title.props ? title.props.text : title;
    return (
      <a className={classString} {...newProps} disabled={disabled} title={newTitle} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

export default Link;
