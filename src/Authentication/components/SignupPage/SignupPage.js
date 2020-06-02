import React from 'react';
import { observer } from 'mobx-react'

import strings from '../../i18n/strings.json'
import InputFeild from '../../../Common/components/InputFeild'
import PrimaryButton from '../../../Common/components/PrimaryButton'
import logo from '../../../assets/ibhubslogo.svg';

import {
    SignUpPage,
    SignInFeild,
    SignInText,
    SignInLink,
    WebTitle,
    GreetingMessage,
    ErrorMessage,
    SignUpPageContainer
} from './styledComponents.js';

@observer
class SignupPage extends React.Component{
    
    nameRef = React.createRef();
    usernameRef = React.createRef();
    passwordRef = React.createRef();
    confirmPasswordRef = React.createRef();
    
    render(){
        
        const {
            signUpPage:{
                greetingText,
                nameField,
                usernameField,
                passwordField,
                confirmPasswordField,
                signUpButton:{displayText},
                ibhubsLogo,
                alreadyHaveAnAccountText,
                signInText
                
            }
            ,
            emptyString
        } = strings
        
        const {
            username,
            name,
            password,
            confirmPassword,
            onChangeName,
            onChangeUsername,
            onChangePassword,
            onChangeConfirmPassword,
            onKeyDownName,
            onKeyDownUsername,
            onKeyDownPassword,
            onKeyDownConfirmPassword,
            isNameError,
            isUsernameError,
            isPasswordError,
            isConfirmPasswordError,
            isSigningup,
            onClickSignUp,
            onSignin,
            errorMessage
        } = this.props;
        
        const nameError = isNameError?nameField.fieldErrorMsg:emptyString;
        const usernameError = isUsernameError?usernameField.fieldErrorMsg:emptyString;
        const passwordError = isPasswordError?passwordField.fieldErrorMsg:emptyString;
        const confirmPasswordError = isConfirmPasswordError?confirmPasswordField.fieldErrorMsg:emptyString;

        return <SignUpPageContainer>
                
                <SignUpPage>
        
                    <WebTitle src={logo} alt={ibhubsLogo}></WebTitle>
                   <GreetingMessage>{greetingText}</GreetingMessage>
                   <ErrorMessage>{errorMessage}</ErrorMessage>
                      
                    <InputFeild
                    
                          handleOnChange={onChangeName}
                          value={name}
                          type={nameField.type}
                          label={nameField.label}
                          placeholder={nameField.placeholder}
                          ref={this.nameRef}
                          hamdleOnKeyDown={onKeyDownName}
                          fieldErrorMsg = {nameError}
        
                    
                    />
                    
                    <InputFeild
                    
                          handleOnChange={onChangeUsername}
                          value={username}
                          type={usernameField.type}
                          label={usernameField.label}
                          placeholder={usernameField.placeholder}
                          ref={this.usernameRef}
                          hamdleOnKeyDown={onKeyDownUsername}
                          fieldErrorMsg = {usernameError}
                    
                    />
                    
                    <InputFeild
                    
                          handleOnChange={onChangePassword}
                          value={password}
                          type={passwordField.type}
                          label={passwordField.label}
                          placeholder={passwordField.placeholder}
                          ref={this.passwordRef}
                          hamdleOnKeyDown={onKeyDownPassword}
                          fieldErrorMsg = {passwordError}
                    
                    />
                    
                    <InputFeild
                    
                          handleOnChange={onChangeConfirmPassword}
                          value={confirmPassword}
                          type={confirmPasswordField.type}
                          label={confirmPasswordField.label}
                          placeholder={confirmPasswordField.placeholder}
                          ref={this.confirmPasswordRef}
                          hamdleOnKeyDown={onKeyDownConfirmPassword}
                          fieldErrorMsg = {confirmPasswordError}
                    
                    />
                    
                    <PrimaryButton
                          handleOnClick={onClickSignUp}
                          displayText={displayText}
                          loadingStatus={isSigningup}
                       />
               
                   <SignInFeild>
                      <SignInText>{alreadyHaveAnAccountText}</SignInText>
                      <SignInLink onClick={onSignin}>{signInText}</SignInLink>
                   </SignInFeild>
                    
        
                </SignUpPage>
            </SignUpPageContainer>
    }
}

export {SignupPage}