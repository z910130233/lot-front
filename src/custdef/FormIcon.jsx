import React from 'react';
import PropTypes from 'prop-types';
import IconEnum from '@/custdef/IconEnum';

class FormIcon extends React.Component {
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
    let { value } = this.props;
    if (value != null) {
      return (
        <div>
          {changeIconEnum(value)}
        </div>
      );
    }
    return null;
  }
}

const changeIconEnum = (value) => {
  return IconEnum[value];
};

export default FormIcon;
