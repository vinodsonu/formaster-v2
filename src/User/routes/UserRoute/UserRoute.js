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

    getPaginationStore = () =>{
        return this.getUserFormStore().paginationStore;
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
        const {getEntities} = this.getPaginationStore();
        await getEntities();
    }

    @action.bound
    currentPage(){
        const {currentPageNumber} = this.getPaginationStore();
        return currentPageNumber;
        
    }
 
    @computed
    get totalPagesCount(){
        const {totalPages} = this.getPaginationStore();
        return totalPages;
    }

    @action
   getNextForms = async() =>{
    const {getNextEntities} = this.getPaginationStore();
    await getNextEntities();
   }

   @action
   getPreviousForms = async() =>{
    const {getPreviousEntities} = this.getPaginationStore();
    await getPreviousEntities();
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

    renderSuccessUi = observer(() =>{
        const {
            currentEntities
        } = this.getPaginationStore()
        const {
            userProfileDetails
        } = this.getAuthStore();
        return <UserDashBoard
        
                userProfileDetails = {userProfileDetails}
                forms = {currentEntities}
                onClickForm = {this.onClickForm}
                userSignOut = {this.userSignOut}
                currentPage = {this.currentPage()}
                totalPagesCount = {this.totalPagesCount}
                getNextForms = {this.getNextForms}
                getPreviousForms = {this.getPreviousForms}
                />
    })

        render(){
            const {
                getEntitiesApiStatus,
                getEntitiesApiError
            } = this.getPaginationStore();
                    return <LoadingWrapperWithFailure
                                apiStatus={getEntitiesApiStatus}
                                renderSuccessUI={this.renderSuccessUi}
                                onRetryClick={this.doNetworkCalls}
                                apiError={getEntitiesApiError}
                          />
        }
}

export default withRouter(UserRoute)