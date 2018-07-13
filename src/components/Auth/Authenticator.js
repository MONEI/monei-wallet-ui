import React, {Component} from 'react';
import {Authenticator, MapEntries} from 'aws-amplify-react';
import Spinner from '../Spinner';
import {Auth} from 'aws-amplify';
import SignUp from './SignUp';
import SignIn from './SignIn';
import VerifyCode from './VerifyCode';
import {Centered} from 'globalStyles';
import styled from 'styled-components';

const Container = styled.div`
  width: 368px;
  margin: 0 auto;
  padding-bottom: 50px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 33px;
`;

export const withAuthenticator = Component =>
  class AuthenticatorWrapper extends Component {
    state = {auth: 'init'};

    handleStateChange = (state, data) => {
      if (state === this.state.auth) return;
      if (state === 'signedOut') state = 'signIn';
      this.setState({auth: state, authData: data});
    };

    componentDidMount() {
      this.checkUser();
    }

    checkUser() {
      return Auth.currentUserInfo()
        .then(user => {
          const state = user ? 'signedIn' : 'signIn';
          this.handleStateChange(state, user);
        })
        .catch(err => console.log(err));
    }

    handleAuthEvent(state, event) {
      if (event.type === 'error') {
        const map = MapEntries;
        const message = typeof map === 'string' ? map : map(event.data);
        this.setState({error: message});
      }
    }

    render() {
      const {auth, authData} = this.state;
      const authProps = {
        authState: auth,
        authData: authData,
        onStateChange: this.handleStateChange,
        onAuthEvent: this.handleAuthEvent
      };
      if (auth === 'init') return <Spinner size="large" />;
      if (auth === 'signedIn') return <Component {...authProps} />;
      return (
        <Centered>
          <Container>
            <Title>MONEI Wallet</Title>
            <SignIn {...authProps} />
            <SignUp {...authProps} />
            <VerifyCode {...authProps} />
          </Container>
        </Centered>
      );
    }
  };
