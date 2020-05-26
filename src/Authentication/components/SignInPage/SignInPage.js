import React from 'react';
import {observer} from 'mobx-react';
import strings from '../../i18n/strings.json';
import InputFeild from '../../../Common/components/InputFeild';
import PrimaryButton from '../../../Common/components/PrimaryButton'

import {
    LoginFormContainer,
    WebTitle,
    GreetingMessage,
    ErrorMessage
    
    
} from './styledComponents';

@observer
class SignInPage extends React.Component{
    
    
    render(){
        const {
            username,
            onChangePassword,
            onChangeUsername,
            password,
            onClickSignIn,
            isSigningIn,
            isUsernameEmpty,
            isPasswordError,
            errorMessage
            
        } = this.props;
        
        const {
            webTitle,
            signInpage:{greetingMessage,
                usernameFeild,
                passwordFeild,
                primaryButtonText
                
            }
        } = strings;
        
        return(
                <LoginFormContainer>
                    <WebTitle>{webTitle}</WebTitle>
                    <GreetingMessage>{greetingMessage}</GreetingMessage>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <InputFeild handleOnChange = {onChangeUsername}
                                value = {username}
                                type = {usernameFeild.type}
                                label = {usernameFeild.label}
                                placeholder = {usernameFeild.placeholder}
                                isFeildError = {isUsernameEmpty}
                    />
                    <InputFeild handleOnChange = {onChangePassword}
                                value = {password}
                                type = {passwordFeild.type}
                                label = {passwordFeild.label}
                                placeholder = {passwordFeild.placeholder}
                                isFeildError = {isPasswordError}
                    />
                    <PrimaryButton isDisable = {isSigningIn} 
                                    handleOnClick={onClickSignIn} 
                                    displayText = {primaryButtonText.displayText}/>
                </LoginFormContainer>
            );
    }
    
    
}

export default SignInPage;