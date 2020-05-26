import React from 'react';
import {observable,reaction} from 'mobx';
import {observer,inject} from 'mobx-react';

import {
    LoginForm,
    Username,
    Password,
    SubmitButton,
    ErrorMessage,
    SinInHeading,
    LoginPage
    
} from './styledComponents.js';

export function SignInButtonComponent(props){
    return <SubmitButton data-testid='sign-in-button' onClick = {props.onClick}>
                        Sign In
                    </SubmitButton>
}

export function InputUsername(props){
    const {
        text,
        value,
        onChange,
        placeholder
    } = props;
    return <Username
                        type={text}
                        value={value} 
                        onChange = {onChange}
                        placeholder = {placeholder}
                        
                    />
}

@observer
class SignInPage extends React.Component{
    
     userNameRef = React.createRef();
     passwordRef = React.createRef();
     
     componentDidMount(){
         console.log(this.userNameRef)
         this.userNameRef.current.focus();
     }
    
    render(){
        
        const {
            username,
            onChangePassword,
            onChangeUsername,
            password,
            onClickSignIn,
            errorMessage
            
        } = this.props;
        
        if(errorMessage === 'Please enter password'){
            this.passwordRef.current.focus();
        }
        
        return(
            <LoginPage>
            <LoginForm>
            
                    <SinInHeading>Sign in</SinInHeading>
                    
                    <Username  type='text'
                                    value={username} 
                                    onChange = {onChangeUsername}
                                    placeholder = "Username"
                                    ref = {this.userNameRef}
                    />
                
                    
                    
                    <Password 
                        type='password'
                        value = {password}
                        onChange = {onChangePassword}
                        placeholder = "Password"
                        ref = {this.passwordRef}
                    />
                    
                    <SignInButtonComponent onClick = {onClickSignIn}/>
                    
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                
            </LoginForm>
            </LoginPage>
            );
    }
    
    
}

export default SignInPage;