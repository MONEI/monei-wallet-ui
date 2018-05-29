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

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>{I18n.get('Sign In Account')}</SectionHeader>
        <SectionBody theme={theme}>
          <InputRow
            autoFocus
            placeholder={I18n.get('Email')}
            theme={theme}
            key="username"
            name="username"
            onChange={this.handleInputChange}
          />
          <InputRow
            placeholder={I18n.get('Password')}
            theme={theme}
            key="password"
            type="password"
            name="password"
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
