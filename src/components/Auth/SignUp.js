import React from 'react';
import {I18n} from 'aws-amplify';
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
          <div style={theme.col6}>
            <Link theme={theme} onClick={() => this.changeState('confirmSignUp')}>
              {I18n.get('Confirm a Code')}
            </Link>
          </div>
          <div style={Object.assign({textAlign: 'right'}, theme.col6)}>
            <Link theme={theme} onClick={() => this.changeState('signIn')}>
              {I18n.get('Sign In')}
            </Link>
          </div>
        </SectionFooter>
      </FormSection>
    );
  }
}

export default CustomSignUp;
