import React from 'react';
import {observable,reaction} from 'mobx';
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
    
    
    constructor(){
        super();
        this.username = '';
        this.password = '';
        this.errorMessage = '';
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
    
    checkForError = () =>{
        if(validateUsername(this.username))
            this.errorMessage = 'Please enter username';
        else if(validatePassword(this.password))
            this.errorMessage = 'Please enter password';
        else
            this.errorMessage = '';
        return this.errorMessage.length!==0;
    }
    
    onClickSignIn = () =>{
        
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
            return getUserSignInAPIStatus===API_SUCCESS && getUserProfileAPIStatus===API_SUCCESS;
        }
        catch(e){}
    },
    (status)=>{
        
            const {history} = this.props;
            if(status)
                history.replace({pathname:'/signup'})
    })
    
    
    
    render(){
        return <SignInPage  
        
                    username = {this.username}
                    onChangePassword = {this.onChangePassword}
                    onChangeUsername = {this.onChangeUsername}
                    password = {this.password}
                    onClickSignIn = {this.onClickSignIn}
                    errorMessage = {this.errorMessage}
                    
                />
    }
    
}

export default withRouter(SignInRoute);