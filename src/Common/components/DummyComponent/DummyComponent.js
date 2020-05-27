import React from 'react';
import {inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {getAccessToken,clearUserSession} from '../../../utils/StorageUtils';
import {isLoggedin} from '../../../utils/AccessTokenUtills';
import {SIGN_IN_PATH,ADMIN_PAGE_PATH,USER_PAGE_PATH} from '../../constants/RouteConstants';

@inject('authStore')
class DummyComponent extends React.Component{
    
    getStore = () =>{
        return this.props.authStore;
    }
    
    redirectToCustomerPage = () =>{
        const {
            userProfileDetails
        } = this.getStore();
        const {history} = this.props;
        if(userProfileDetails[0].isAdmin)
            history.replace({pathname:ADMIN_PAGE_PATH})
        else
            history.replace({pathname:USER_PAGE_PATH})
    }
    
    redirectToLoginPage = () =>{
        const {history} = this.props;
        history.replace({pathname:SIGN_IN_PATH})
    }
    
    async componentDidMount(){
        if(isLoggedin())
        {
            const {
                userProfile
            } = this.getStore();
            
            await userProfile();
            this.redirectToCustomerPage()
        }
        else{
            this.redirectToLoginPage();
        }
    }
    render(){
        //clearUserSession();
        
        return null;
    }
}

export default withRouter(DummyComponent);