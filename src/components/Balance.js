import React, {Component} from 'react';
import './Balance.css';

class Balance extends Component {
  render() {
    return (
      <div className="balance">
        <div className="balance__label">Current balance</div>
        <div className="balance__value">100 EURM</div>
        <div className="balance__address">0x1d0c461935E3827b30D125A53543b95ABc21efe8</div>
      </div>
    );
  }
}

export default Balance;
