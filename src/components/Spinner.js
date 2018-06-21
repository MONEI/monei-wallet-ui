import React from 'react';
import styled from 'styled-components';
import {Spin} from 'antd';

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${props => (props.inline ? 'relative' : 'absolute')};
  padding: 25px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Spinner = ({delay = 500, inline, ...props}) => (
  <SpinWrapper inline={inline}>
    <Spin delay={delay} {...props} />
  </SpinWrapper>
);

export default Spinner;
