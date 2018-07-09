import React from 'react';
import {I18n, Auth} from 'aws-amplify';
import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ButtonRow,
  SignIn,
  FederatedButtons,
  Link
} from 'aws-amplify-react';

class CustomSignIn extends SignIn {
  signIn() {
    const {username, password} = this.inputs;
    Auth.signIn(username, password)
      .then(user => {
        console.log(user);
        if (user.challengeName === 'CUSTOM_CHALLENGE') {
          console.log('confirm user with ' + user.challengeName);
          this.changeState('verifyCode', user);
        } else if (
          user.challengeName === 'SMS_MFA' ||
          user.challengeName === 'SOFTWARE_TOKEN_MFA'
        ) {
          console.log('confirm user with ' + user.challengeName);
          this.changeState('confirmSignIn', user);
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          console.log('require new password', user.challengeParam);
          this.changeState('requireNewPassword', user);
        } else if (user.challengeName === 'MFA_SETUP') {
          console.log('TOTP setup', user.challengeParam);
          this.changeState('TOTPSetup', user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => {
        if (err.code === 'UserNotConfirmedException') {
          console.log('the user is not confirmed');
          this.changeState('confirmSignUp');
        } else {
          this.error(err);
        }
      });
  }

  showComponent(theme) {
    const {authState, hide, federated, onStateChange} = this.props;
    if (hide && hide.includes(SignIn)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>{I18n.get('Sign In Account')}</SectionHeader>
        <SectionBody theme={theme}>
          <InputRow
            autoFocus
            placeholder={I18n.get('Phone number')}
            theme={theme}
            key="username"
            name="username"
            onChange={this.handleInputChange}
          />
          <ButtonRow theme={theme} onClick={this.signIn}>
            {I18n.get('Sign In')}
          </ButtonRow>
          <FederatedButtons
            federated={federated}
            theme={theme}
            authState={authState}
            onStateChange={onStateChange}
          />
        </SectionBody>
        <SectionFooter theme={theme}>
          <div style={theme.col6}>
            <Link theme={theme} onClick={() => this.changeState('forgotPassword')}>
              {I18n.get('Forgot Password')}
            </Link>
          </div>
          <div style={Object.assign({textAlign: 'right'}, theme.col6)}>
            <Link theme={theme} onClick={() => this.changeState('signUp')}>
              {I18n.get('Sign Up')}
            </Link>
          </div>
        </SectionFooter>
      </FormSection>
    );
  }
}

export default CustomSignIn;
