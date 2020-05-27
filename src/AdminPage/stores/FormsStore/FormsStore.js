import {observable,action,computed} from 'mobx';
import {
    API_INITIAL,
    API_FAILURE,
    API_SUCCESS
} from '@ib/api-constants';

import {bindPromiseWithOnSuccess} from '@ib/mobx-promise';
import {setAccessToken,clearUserSession,getAccessToken} from '../../../utils/StorageUtils';


class FormsStore {
    
    @observable getFormsApiStatus
    @observable getFormApiError
    @observable forms
    
    constructor(formService){
        this.formService = formService;
        this.init();
    }
    
    @action.bound
    init(){
         this.forms = new Map();
         this.getFormsApiStatus = API_INITIAL;
         this.getFormApiError = null;
    }
    
    @action.bound
    clearStore(){
        this.init();
    }
    
    @action.bound
    setGetFormApiStatus(status){
        this.getFormsApiStatus = status;
    }
    
    @action.bound
    setGetFormApiError(error){
        this.getFormApiError = error;
    }
    
    @action.bound
    setGetFromsApiResponse(response){
        response.forEach(form=>{
            this.forms.set(form.id,form)
        })
    }
    
    @action.bound
    getUserFroms(){
        const userFromsPromise = this.formService.getForms(getAccessToken());
        return bindPromiseWithOnSuccess(userFromsPromise)
        .to(this.setGetFormApiStatus,this.setGetFromsApiResponse)
        .catch(this.setGetFormApiError);
    }
    
    
    
    
}

export {FormsStore}