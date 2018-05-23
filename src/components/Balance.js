import React, {Component} from 'react';
import './Balance.css';

class Balance extends Component {
  render() {
    return (
      <div className="balance">
        <div className="balance__label">Current balance</div>
        <div className="balance__value">100 EURM</div>
        <div className="balance__address">{this.props.address}</div>
      </div>
    );
  }
}

export default Balance;
