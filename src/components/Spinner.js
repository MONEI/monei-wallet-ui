import React, {Component} from 'react';
import {Spin} from 'antd';
import cx from 'classnames';

class Spinner extends Component {
  static defaultProps = {
    delay: 500
  };

  render() {
    return (
      <div className={cx('spinner', {spinner_inline: this.props.inline})}>
        <Spin {...this.props} />
      </div>
    );
  }
}

export default Spinner;
