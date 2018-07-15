import React, {Component} from 'react';
import Spinner from '../Spinner';
import {Auth} from 'aws-amplify';
import SignUp from './SignUp';
import SignIn from './SignIn';
import VerifyCode from './VerifyCode';
import {Centered} from 'globalStyles';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  padding-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 33px;
  text-align: center;
`;

export const withAuthenticator = Cmp =>
  class AuthenticatorWrapper extends Component {
    state = {auth: 'init'};

    handleStateChange = (state, data) => {
      if (state === this.state.auth) return;
      if (state === 'signedOut') state = 'signIn';
      this.setState({auth: state, authData: data, error: null});
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

    handleAuthEvent = (state, event) => {
      if (event.type === 'error') {
        this.setState({error: event.data});
      }
    };

    render() {
      const {auth, authData} = this.state;
      const authProps = {
        authState: auth,
        authData: authData,
        onStateChange: this.handleStateChange,
        onAuthEvent: this.handleAuthEvent
      };
      if (auth === 'init') return <Spinner size="large" />;
      if (auth === 'signedIn') return <Cmp {...authProps} />;
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
