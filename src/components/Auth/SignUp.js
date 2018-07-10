import React from 'react';
import {I18n, Auth} from 'aws-amplify';
import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ButtonRow,
  SignUp,
  Link
} from 'aws-amplify-react';

class CustomSignUp extends SignUp {
  signUp() {
    const {username, password} = this.inputs;
    Auth.signUp(username, password)
      .then(() => Auth.signIn(username))
      .then(user => this.changeState('verifyCode', user))
      .catch(err => this.error(err));
  }

  showComponent(theme) {
    const {hide} = this.props;
    if (hide && hide.includes(SignUp)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>{I18n.get('Sign Up Account')}</SectionHeader>
        <SectionBody theme={theme}>
          <InputRow
            autoFocus
            placeholder={I18n.get('Phone number')}
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
          <ButtonRow onClick={this.signUp} theme={theme}>
            {I18n.get('Sign Up')}
          </ButtonRow>
        </SectionBody>
        <SectionFooter theme={theme}>
          <Link theme={theme} onClick={() => this.changeState('signIn')}>
            {I18n.get('Sign In')}
          </Link>
        </SectionFooter>
      </FormSection>
    );
  }
}

export default CustomSignUp;
