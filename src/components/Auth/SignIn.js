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
        if (user.challengeName === 'CUSTOM_CHALLENGE') {
          this.changeState('verifyCode', user);
        } else if (
          user.challengeName === 'SMS_MFA' ||
          user.challengeName === 'SOFTWARE_TOKEN_MFA'
        ) {
          this.changeState('confirmSignIn', user);
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.changeState('requireNewPassword', user);
        } else if (user.challengeName === 'MFA_SETUP') {
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
          <Link theme={theme} onClick={() => this.changeState('signUp')}>
            {I18n.get('Sign Up')}
          </Link>
        </SectionFooter>
      </FormSection>
    );
  }
}

export default CustomSignIn;
