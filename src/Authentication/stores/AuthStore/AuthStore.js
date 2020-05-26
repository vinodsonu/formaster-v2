import {observable,action,computed} from 'mobx';
import {
    API_INITIAL,
    API_FAILURE,
    API_SUCCESS
} from '@ib/api-constants';

import {bindPromiseWithOnSuccess} from '@ib/mobx-promise';

import {setAccessToken,clearUserSession,getAccessToken} from '../../../utils/StorageUtils';



export default class AuthStore{
    
    @observable getUserSignInAPIStatus
    @observable getUserSignInAPIError
    @observable getUserProfileAPIStatus
    @observable getUserProfileAPIError
    @observable userProfileDetails
    @observable username
    @observable password
    
    constructor(services){
        this.authAPIService = services[0];
        this.userProfileService  = services[1];
        this.init();
    }
    
    @action.bound
    init(){
        this.getUserSignInAPIStatus = API_INITIAL ;
        this.getUserSignInAPIError = null ;
        this.geetUserProfileAPIStatus = API_INITIAL ;
        this.getUserProfileAPIError = null;
        this.userProfileDetails = null;
        this.username = null ;
        this.password = null ;
    }
    
    @action.bound
    clearStore(){
        this.init();
    }
    
    @action.bound
    setUserSignInAPIResponse(response){
        setAccessToken(response[0].access_token);
    }
    
    @action.bound
    setGetUserSignInAPIStatus(status){
        
        this.getUserSignInAPIStatus = status ;
        
    }


    @action.bound
    setGetUserSignInAPIError(error){
        this.getUserSignInAPIError = error ;
    }
    
    @action.bound
    setUsername = (username) =>{
        this.username = username;
    }
    
    @action.bound
    setPassword = (password) =>{
        this.password = password;
    }
    
    @action.bound
     userSignIn(){
        const userSigninPromise = this.authAPIService.getAuth(this.username,this.password);
        return bindPromiseWithOnSuccess(userSigninPromise)
        .to(this.setGetUserSignInAPIStatus,this.setUserSignInAPIResponse)
        .catch(this.setGetUserSignInAPIError);
    }
    
    @action.bound
    setGetUserProfileAPIStatus = (status) =>{
        this.getUserProfileAPIStatus = status;
    }
    
    @action.bound
    setGetUserProfileAPIError = (error) =>{
        this.getUserProfileAPIError = error;
    }
    
    @action.bound
    setUserProfileAPIResponse = (response) =>{
        this.userProfileDetails = response;
    }
    
    @action.bound
    userProfile(){
        const userProfilePromise = this.userProfileService.getUserProfile(getAccessToken())
        return bindPromiseWithOnSuccess(userProfilePromise)
        .to(this.setGetUserProfileAPIStatus,this.setUserProfileAPIResponse)
        .catch(this.setGetUserProfileAPIError);
    }
    
    @computed get isSigningIn(){
        return !(this.getUserProfileAPIStatus!==API_SUCCESS && this.getUserSignInAPIStatus!==API_SUCCESS);
    }
    
    @action.bound
    userSignOut(){
        clearUserSession();
        this.init();
    }
    
}
