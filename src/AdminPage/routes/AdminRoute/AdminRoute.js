import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';

import AdminDashBoardPage from '../../components/AdminDashBoardPage';
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure';


@inject('formStore')
@observer
class AdminRoute extends React.Component{
    
    getStore = () =>{
        return this.props.formStore;
    }
    
    renderSuccessUi = () =>{
        const {
            forms
        }  = this.getStore();
        return <AdminDashBoardPage forms={forms}/>
    }

    render(){
        const {
            getFormApiError,
            getFormsApiStatus,
            getUserFroms
        } = this.getStore();
        return <LoadingWrapperWithFailure
                      apiStatus = {getFormsApiStatus}
                      renderSuccessUI = {this.renderSuccessUi}
                      onRetryClick = {getUserFroms}
                      apiError = {getFormApiError}
                />
    }
}

export {AdminRoute};