import React from 'react'
import { observer } from 'mobx-react'
import strings from '../../i18n/strings.json'
import InputFeild from '../../../Common/components/InputFeild'
import PrimaryButton from '../../../Common/components/PrimaryButton'
import logo from '../../../assets/ibhubslogo.svg'

import {
   LoginFormContainer,
   WebTitle,
   GreetingMessage,
   ErrorMessage,
   LoginForm
} from './styledComponents'

@observer
class SignInPage extends React.Component {
   
   usernameRef = React.createRef();
   passwordRef = React.createRef();
   
   render() {
      const {
         username,
         onChangePassword,
         onChangeUsername,
         password,
         onClickSignIn,
         isSigningIn,
         isUsernameError,
         isPasswordError,
         errorMessage,
         onKeyDownPassword,
         onKeyDownUsername
      } = this.props

      const {
         webTitle,
         signInpage: {
            greetingMessage,
            usernameFeild,
            passwordFeild,
            primaryButtonText,
            ibhubsLogo,
            usernameEmptyMsg,
            passwordErrorDisplay
         }
      } = strings
      
      const usernameErrorMsg = isUsernameError?usernameEmptyMsg:null;
      const passwordErrorMsg = isPasswordError?passwordErrorDisplay:null;
      

      return (
         <LoginFormContainer>
            <LoginForm>
               <WebTitle src={logo} alt={ibhubsLogo}></WebTitle>
               <GreetingMessage>{greetingMessage}</GreetingMessage>
               <ErrorMessage>{errorMessage}</ErrorMessage>
               <InputFeild
                  handleOnChange={onChangeUsername}
                  value={username}
                  type={usernameFeild.type}
                  label={usernameFeild.label}
                  placeholder={usernameFeild.placeholder}
                  ref={this.usernameRef}
                  hamdleOnKeyDown={onKeyDownUsername}
                  fieldErrorMsg = {usernameErrorMsg}
                  
               />
               <InputFeild
                  handleOnChange={onChangePassword}
                  value={password}
                  type={passwordFeild.type}
                  label={passwordFeild.label}
                  placeholder={passwordFeild.placeholder}
                  isFeildError={isPasswordError}
                  ref={this.passwordRef}
                  hamdleOnKeyDown={onKeyDownPassword}
                  fieldErrorMsg={passwordErrorMsg}
               />
               <PrimaryButton
                  isDisable={isSigningIn}
                  handleOnClick={onClickSignIn}
                  displayText={primaryButtonText.displayText}
                  loadingStatus={isSigningIn}
               />
            </LoginForm>
         </LoginFormContainer>
      )
   }
}

export default SignInPage
