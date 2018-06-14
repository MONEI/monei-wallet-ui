import React, {Component} from 'react';
import {Spin} from 'antd';

class Spinner extends Component {
  static defaultProps = {
    delay: 500
  };

  state = {
    visible: false
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({visible: true});
    }, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    if (!this.state.visible) return null;
    return (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }
}

export default Spinner;
