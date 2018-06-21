import styled, {injectGlobal} from 'styled-components';

injectGlobal`
  body {
    background-color: #f0f2f5 !important;
  }
 
  .amplify-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .awsappsync {
    height: 100%;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;
