import React from 'react';
import { observable, reaction ,action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';


import SignupPage from '../../components/SignupPage'

import { validatePassword, validateUsername , validateConfirmPassword,validateName } from '../../utils/ValidationUtils'

import {SIGN_IN_PATH} from '../../constants/RouteConstants'

import strings from '../../i18n/strings.json';
import {success,error} from '../../../Common/utils/ToastUtils.js';
import {getUserDisplayableErrorMessage} from '../../../Common/utils/APIUtils.js';


//Todo:Shifing the sign in logic to its page

@inject("authStore")
@observer
class SignupRoute extends React.Component{
    @observable username
    @observable password
    @observable confirmPassword
    @observable name
    @observable isNameError
    @observable isUsernameError
    @observable isPasswordError
    @observable isConfirmPasswordError
    signupPageRef

    
    constructor(){
        super();
        this.init();
    }
    
    componentDidMount(){
        this.signupPageRef.current.nameRef.current.inputFeildRef.current.focus();
    }
    
    init = () =>{
        const {
            emptyString
        } = strings
        
        this.name = emptyString;
        this.username = emptyString;
        this.password = emptyString;
        this.confirmPassword = emptyString;
        this.signupPageRef = React.createRef();
        this.isNameError = false;
        this.isUsernameError = false;
        this.isPasswordError = false;
        this.isConfirmPasswordError = false;
    }
    
    @action
    getAuthStore = () =>{
        return this.props.authStore;
    }
    
     @action
    onChangeUsername = (event) =>{
        this.username = event.target.value;
        this.checkForUsernameError();
    }
    
     @action
    onKeyDownUsername = event =>{
        const {signUpPage:{
            enterKeyCode
        }} = strings;
        if(event.keyCode===enterKeyCode)
            this.signupPageRef.current.passwordRef.current.inputFeildRef.current.focus();
    }
    
     @action
    onChangeName = event =>{
        this.name = event.target.value;
        this.checkForNameError();
    }
    @action
    onKeyDownName = event =>{
        const {signUpPage:{
            enterKeyCode
        }} = strings;
        if(event.keyCode===enterKeyCode)
            this.signupPageRef.current.usernameRef.current.inputFeildRef.current.focus();
    }
    
     @action
    onChangePassword = event =>{
        this.password = event.target.value;
        this.checkForPasswordError();
    }
    
     @action
    onKeyDownPassword = event =>{
        const {signUpPage:{
            enterKeyCode
        }} = strings;
        if(event.keyCode===enterKeyCode)
            this.signupPageRef.current.confirmPasswordRef.current.inputFeildRef.current.focus();
    }
    
     @action
    onChangeConfirmPassword = event =>{
        this.confirmPassword = event.target.value;
        this.checkForConfirmPasswordError();
    }
    
     @action
    onKeyDownConfirmPassword = event =>{
        const {signUpPage:{
            enterKeyCode
        }} = strings;
        if(event.keyCode===enterKeyCode && !this.isValidationError())
            this.onClickSignUp();
    }
    
     @action
    onClickSignUp = async () =>{
        
        const {
            userSignUp
        } = this.getAuthStore();
        if(!this.isValidationError())
            await userSignUp({
                name:this.name,
                username:this.username,
                password:this.password,
                confirm_password:this.confirmPassword
            });
        
    }
    
     @action
    onSignin = () =>{
        const {
            history
        } = this.props;
        history.replace({pathname:SIGN_IN_PATH});
    }
    
    @action
    checkForNameError = () =>{
        if(validateName(this.name))
            this.isNameError = true;
        else
            this.isNameError = false;
    }
    
    @action
    checkForUsernameError = () =>{
        if(validateUsername(this.username))
            this.isUsernameError = true;
        else
            this.isUsernameError = false;
    }
    
    @action
    checkForPasswordError = () =>{
        if(validatePassword(this.password))
            this.isPasswordError = true;
        else
            this.isPasswordError = false;
    }
    
    @action
    checkForConfirmPasswordError = () =>{
        if(validateConfirmPassword(this.password,this.confirmPassword))
            this.isConfirmPasswordError = true;
        else
            this.isConfirmPasswordError = false;
    }
    
    
    @action
    isValidationError = () =>{
        console.log(this.name,this.username,this.password,this.confirmPassword)
        this.checkForNameError();
        this.checkForUsernameError();
        this.checkForPasswordError();
        this.checkForConfirmPasswordError();
        return this.isNameError || this.isPasswordError || this.isUsernameError || this.isConfirmPasswordError;
    }
    
    
        
    
    
    
    render(){
        
        const {isSigningup} = this.getAuthStore();
        
        return <SignupPage
                    name = {this.name}
                    username = {this.username}
                    password = {this.password}
                    confirmPassword = {this.confirmPassword}
                    onChangeName = {this.onChangeName}
                    onChangeUsername = {this.onChangeUsername}
                    onChangePassword = {this.onChangePassword}
                    onChangeConfirmPassword = {this.onChangeConfirmPassword}
                    onKeyDownName = {this.onKeyDownName}
                    onKeyDownUsername = {this.onKeyDownUsername}
                    onKeyDownPassword = {this.onKeyDownPassword}
                    onKeyDownConfirmPassword = {this.onKeyDownConfirmPassword}
                    isNameError = {this.isNameError}
                    isUsernameError = {this.isUsernameError}
                    isPasswordError = {this.isPasswordError}
                    isConfirmPasswordError = {this.isConfirmPasswordError}
                    isSigningup = {isSigningup}
                    onClickSignUp = {this.onClickSignUp}
                    onSignin = {this.onSignin}
                    ref= {this.signupPageRef}
                />
            
    }
}

export default withRouter(SignupRoute);