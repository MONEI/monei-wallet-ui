import React from 'react';
import {I18n} from 'aws-amplify';
import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ButtonRow,
  ConfirmSignIn,
  Link
} from 'aws-amplify-react';

class CustomConfirmSignIn extends ConfirmSignIn {
  showComponent(theme) {
    const {hide, authData} = this.props;
    if (hide && hide.includes(ConfirmSignIn)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>
          {I18n.get('Confirm ' + this.state.mfaType + ' Code')}
        </SectionHeader>
        <SectionBody theme={theme}>
          <InputRow
            autoFocus
            placeholder={I18n.get('Code')}
            theme={theme}
            key="code"
            name="code"
            onChange={this.handleInputChange}
          />
          <ButtonRow theme={theme} onClick={this.confirm}>
            {I18n.get('Confirm')}
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

export default CustomConfirmSignIn;
