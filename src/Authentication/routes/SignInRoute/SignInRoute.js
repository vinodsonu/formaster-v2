import React from 'react';
import {observable,reaction,computed} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter,Redirect} from 'react-router-dom';
import SignInPage from '../../components/SignInPage';

import {
    validatePassword,
    validateUsername
} from '../../utils/ValidationUtils';

import {
    API_SUCCESS,
    API_FAILURE
} from '@ib/api-constants';


import {PRODUCTS_PAGE_PATH} from '../../constants/RouteConstants';



@inject('authStore')
@observer
class SignInRoute extends React.Component{
    
    @observable username
    @observable password
    @observable errorMessage
    @observable isClickedLogin
    
    
    constructor(){
        super();
        this.username = '';
        this.password = '';
        this.errorMessage = '';
        this.isClickedLogin = false;
    }
    
    
    onChangeUsername = (event) =>{
        this.username = event.target.value;
    }
    
    onChangePassword = (event) =>{
        this.password = event.target.value;
    }
    
    getStore = () =>{
        const {authStore} = this.props;
        return authStore;
    }
    
    @computed get isUsernameEmpty(){
        return validateUsername(this.username)&&this.isClickedLogin
    }
    
    @computed get isPasswordError(){
        return validatePassword(this.password)&&this.isClickedLogin;
    }    
    
    
    checkForError = () =>{
        return (this.isPasswordError||this.isUsernameEmpty)
    }
    
    onClickSignIn = () =>{
        this.isClickedLogin = true;
        if(!this.checkForError())
        {   
            const {
                setUsername,
                setPassword
            } = this.getStore()
            setPassword(this.password);
            setUsername(this.username);
            this.getStore().userSignIn();
        }
        
    }
    
    componentWillUnmount(){
        this.onSuccessUserLogin();
    }
    

    onSuccessUserLogin = reaction(()=>{
        try{const {getUserSignInAPIStatus,getUserProfileAPIStatus} = this.getStore();
            // console.log(getUserSignInAPIStatus===API_SUCCESS && getUserProfileAPIStatus===API_SUCCESS);
            return getUserSignInAPIStatus===API_SUCCESS;
        }
        catch(e){}
    },
    (status)=>{
        
            const {history} = this.props;
            if(status)
                history.replace({pathname:'/signup'})
    })
    
    
    
    render(){
        const {isSigningIn}  = this.getStore();
        return <SignInPage  
        
                    username = {this.username}
                    onChangePassword = {this.onChangePassword}
                    onChangeUsername = {this.onChangeUsername}
                    password = {this.password}
                    onClickSignIn = {this.onClickSignIn}
                    errorMessage = {this.errorMessage}
                    isSigningIn = {isSigningIn}
                    isUsernameEmpty = {this.isUsernameEmpty}
                    isPasswordError = {this.isPasswordError}
                    errorMessage = {this.errorMessage}
                    
                />
    }
    
}

export default withRouter(SignInRoute);