import React from 'react';
import {I18n} from 'aws-amplify';
import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ConfirmSignUp,
  MessageRow,
  Button,
  Space,
  ActionRow,
  Link
} from 'aws-amplify-react';

class CustomConfirmSignUp extends ConfirmSignUp {
  showComponent(theme) {
    const {hide} = this.props;
    const username = this.usernameFromAuthData();

    if (hide && hide.includes(ConfirmSignUp)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>
          {I18n.get('Confirm')} {I18n.get('Sign Up')}
        </SectionHeader>
        <SectionBody theme={theme}>
          {username ? (
            <MessageRow>{username}</MessageRow>
          ) : (
            <InputRow
              placeholder={I18n.get('Username')}
              theme={theme}
              key="username"
              name="username"
              onChange={this.handleInputChange}
            />
          )}
          <InputRow
            autoFocus
            placeholder={I18n.get('Code')}
            theme={theme}
            key="code"
            name="code"
            onChange={this.handleInputChange}
          />
          <ActionRow theme={theme}>
            <Button theme={theme} onClick={this.confirm}>
              {I18n.get('Confirm')}
            </Button>
            <Space theme={theme} />
            <Button theme={theme} onClick={this.resend}>
              {I18n.get('Resend Code')}
            </Button>
          </ActionRow>
        </SectionBody>
        <SectionFooter theme={theme}>
          <Link theme={theme} onClick={() => this.changeState('signIn')}>
            {I18n.get('Back to Sign In')}
          </Link>
        </SectionFooter>
      </FormSection>
    );
  }
}

export default CustomConfirmSignUp;
