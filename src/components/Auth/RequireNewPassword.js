import React from 'react';
import {I18n} from 'aws-amplify';
import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ButtonRow,
  RequireNewPassword,
  Link
} from 'aws-amplify-react';

class CustomRequireNewPassword extends RequireNewPassword {
  showComponent(theme) {
    const {hide} = this.props;
    if (hide && hide.includes(RequireNewPassword)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>{I18n.get('Change Password')}</SectionHeader>
        <SectionBody>
          <InputRow
            autoFocus
            placeholder={I18n.get('New Password')}
            theme={theme}
            key="password"
            name="password"
            type="password"
            onChange={this.handleInputChange}
          />
          <ButtonRow theme={theme} onClick={this.change}>
            {I18n.get('Change')}
          </ButtonRow>
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

export default CustomRequireNewPassword;
