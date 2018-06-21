import React from 'react';
import {I18n} from 'aws-amplify';
import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  RadioRow,
  MessageRow,
  ButtonRow,
  VerifyContact,
  AmplifyTheme,
  Link
} from 'aws-amplify-react';

class CustomVerifyContact extends VerifyContact {
  verifyView() {
    const user = this.props.authData;
    if (!user) {
      return null;
    }
    const {unverified} = user;
    if (!unverified) {
      return null;
    }
    const {email, phone_number} = unverified;
    const theme = this.props.theme || AmplifyTheme;
    return (
      <div>
        {email ? (
          <RadioRow
            placeholder={I18n.get('Email')}
            theme={theme}
            key="email"
            name="contact"
            value="email"
            onChange={this.handleInputChange}
          />
        ) : null}
        {phone_number ? (
          <RadioRow
            placeholder={I18n.get('Phone Number')}
            theme={theme}
            key="phone_number"
            name="contact"
            value="phone_number"
            onChange={this.handleInputChange}
          />
        ) : null}
        <ButtonRow theme={theme} onClick={this.verify}>
          {I18n.get('Verify')}
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
          autoComplete="off"
          onChange={this.handleInputChange}
        />
        <ButtonRow theme={theme} onClick={this.submit}>
          {I18n.get('Submit')}
        </ButtonRow>
      </div>
    );
  }

  showComponent(theme) {
    const {authData, hide} = this.props;
    if (hide && hide.includes(VerifyContact)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>{I18n.get('Verify Contact')}</SectionHeader>
        <SectionBody theme={theme}>
          <MessageRow theme={theme}>
            {I18n.get('Account recovery requires verified contact information')}
          </MessageRow>
          {this.state.verifyAttr ? this.submitView() : this.verifyView()}
        </SectionBody>
        <SectionFooter theme={theme}>
          <Link theme={theme} onClick={() => this.changeState('signedIn', authData)}>
            {I18n.get('Skip')}
          </Link>
        </SectionFooter>
      </FormSection>
    );
  }
}

export default CustomVerifyContact;
