import React from 'react';
import {I18n} from 'aws-amplify';
import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ButtonRow,
  ForgotPassword,
  AmplifyTheme,
  Link
} from 'aws-amplify-react';

class CustomForgotPassword extends ForgotPassword {
  sendView() {
    const theme = this.props.theme || AmplifyTheme;
    return (
      <div>
        <InputRow
          autoFocus
          placeholder={I18n.get('Phone number')}
          theme={theme}
          key="username"
          name="username"
          onChange={this.handleInputChange}
        />
        <ButtonRow theme={theme} onClick={this.send}>
          {I18n.get('Send Code')}
        </ButtonRow>
      </div>
    );
  }

  submitView() {
    const theme = this.props.theme || AmplifyTheme;
    return (
      <div>
        <InputRow
          placeholder={I18n.get('Code')}
          theme={theme}
          key="code"
          name="code"
          onChange={this.handleInputChange}
        />
        <InputRow
          placeholder={I18n.get('New Password')}
          theme={theme}
          type="password"
          key="password"
          name="password"
          onChange={this.handleInputChange}
        />
        <ButtonRow theme={theme} onClick={this.submit}>
          {I18n.get('Submit')}
        </ButtonRow>
      </div>
    );
  }

  showComponent(theme) {
    const {authState, hide} = this.props;
    if (hide && hide.includes(ForgotPassword)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>{I18n.get('Forgot Password')}</SectionHeader>
        <SectionBody>{this.state.delivery ? this.submitView() : this.sendView()}</SectionBody>
        <SectionFooter theme={theme}>
          <Link theme={theme} onClick={() => this.changeState('signIn')}>
            {I18n.get('Back to Sign In')}
          </Link>
        </SectionFooter>
      </FormSection>
    );
  }
}

export default CustomForgotPassword;
