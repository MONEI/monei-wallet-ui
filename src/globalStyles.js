import styled, {injectGlobal} from 'styled-components';
import bg from './static/bg.svg';

injectGlobal`
  body {
    background: url(${bg});
    background-color: #f0f2f5 !important;
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }
 
  .awsappsync {
    height: 100%;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;


