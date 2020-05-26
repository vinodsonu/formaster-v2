import React from 'react';
import {inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {getAccessToken,clearUserSession} from '../../../utils/StorageUtils';
import {isLoggedin} from '../../../utils/AccessTokenUtills';
import {SIGN_IN_PATH} from '../../constants/RouteConstants';

@inject('authStore')
class DummyComponent extends React.Component{
    
    getStore = () =>{
        return this.props.authStore;
    }
    
    redirectToLoginPage = () =>{
        const {history} = this.props;
        history.replace({pathname:SIGN_IN_PATH})
    }
    
    componentDidMount(){
        if(isLoggedin())
        {
            const {
                userProfile
            } = this.getStore();
            
            userProfile();
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