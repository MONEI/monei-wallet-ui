import React, {Component} from 'react';
import {Spin} from 'antd';
import cx from 'classnames';

class Spinner extends Component {
  static defaultProps = {
    delay: 500
  };

  render() {
    const {inline, ...props} = this.props;
    return (
      <div className={cx('spinner', {spinner_inline: inline})}>
        <Spin {...props} />
      </div>
    );
  }
}

export default Spinner;
