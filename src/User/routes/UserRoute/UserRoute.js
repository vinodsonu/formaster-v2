import React, { Component } from 'react';
import {observer,inject} from 'mobx-react';
import {observable, action,computed} from 'mobx';
import {withRouter} from 'react-router-dom';

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import UserDashBoard from '../../components/UserDashBoard';
import {PREVIEW_FORM,SIGN_IN_PATH} from '../../constants/RouteConstants'

@inject("userFormStore","authStore")
@observer
class UserRoute extends Component{

    @observable formsOffset = -4;
    @observable formsLimit = 4;
    @observable currentPageNumber = 0;

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
        this.getNextForms()
        console.log(this.getUserFormStore().forms);
    }

    @computed 
    get currentPage(){
       return this.currentPageNumber;
    }
 
    @computed
    get totalPagesCount(){
       const {totalFormsCount} = this.getUserFormStore();
       return Math.ceil(totalFormsCount/this.formsLimit);
    }

    @action
   getNextForms = async() =>{
      const { getUserForms } = this.getUserFormStore()
      this.formsOffset+=(this.formsLimit);
      this.currentPageNumber++;
      await getUserForms(this.formsLimit,this.formsOffset) 
   }

   @action
   getPreviousForms = async() =>{
      this.formsOffset-=this.formsLimit;
      this.currentPageNumber--;
      const { getUserForms } = this.getUserFormStore()
      await getUserForms(this.formsLimit,this.formsOffset)
   }

    onClickForm = (formId) =>{
        const {
            history
        } = this.props;
        history.push({pathname:`/forms/${formId}/preview`})
    }

    userSignOut = async() =>{
        const {
            userSignOut
        } = this.getAuthStore()
        const {
            history
        } = this.props;
        await userSignOut();
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
                currentPage = {this.currentPage}
                totalPagesCount = {this.totalPagesCount}
                getNextForms = {this.getNextForms}
                getPreviousForms = {this.getPreviousForms}
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