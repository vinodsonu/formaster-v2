import React, { Component } from 'react';
import {observer,inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import UserDashBoard from '../../components/UserDashBoard';
import {PREVIEW_FORM,SIGN_IN_PATH} from '../../constants/RouteConstants'

@inject("userFormStore","authStore")
@observer
class UserRoute extends Component{

    async componentDidMount(){
        await this.doNetworkCalls();
    }

    doNetworkCalls = async() =>{
        
        await this.getUserProfileDetails();
        await this.getUserForms();
    }
    getUserFormStore = () =>{
        return this.props.userFormStore;
    }

    getUserProfileDetails = async() =>{
        const {
            userProfile
        } = this.getAuthStore();
        await userProfile();
    }

    getAuthStore = () =>{
        return this.props.authStore;
    }

    getUserForms = async() =>{
        const {
            getUserForms
        } = this.getUserFormStore();
        await getUserForms();
        console.log(this.getUserFormStore().forms);
    }

    onClickForm = (formId) =>{
        const {
            history
        } = this.props;
        history.push({pathname:PREVIEW_FORM})
    }

    userSignOut = () =>{
        const {
            userSignOut
        } = this.getAuthStore()
        const {
            history
        } = this.props;
        userSignOut();
        history.replace({pathname:SIGN_IN_PATH})
    }

    renderSuccessUi = () =>{
        const {
            forms,
        } = this.getUserFormStore()
        const {
            userProfileDetails
        } = this.getAuthStore();
        return <UserDashBoard
        
                userProfileDetails = {userProfileDetails}
                forms = {forms}
                onClickForm = {this.onClickForm}
                userSignOut = {this.userSignOut}
                />
    }

        render(){
            const {
                getFormsApiStatus,
                getFormApiError
            } = this.getUserFormStore();
                    return <LoadingWrapperWithFailure
                                apiStatus={getFormsApiStatus}
                                renderSuccessUI={this.renderSuccessUi}
                                onRetryClick={this.doNetworkCalls}
                                apiError={getFormApiError}
                          />
        }
}

export default withRouter(UserRoute)