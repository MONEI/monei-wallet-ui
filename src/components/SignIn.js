import React from 'react';
import {I18n} from 'aws-amplify';
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
  showComponent(theme) {
    const {authState, hide, federated, onStateChange} = this.props;
    if (hide && hide.includes(SignIn)) {
      return null;
    }

    this.inputs['password'] = process.env.REACT_APP_COGNITO_PWD;
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
