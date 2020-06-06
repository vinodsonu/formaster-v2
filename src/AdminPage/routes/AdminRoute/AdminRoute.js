import React from 'react'
import { action, reaction,observable,computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { API_SUCCESS, API_FAILED, API_FETCHING } from '@ib/api-constants'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import AdminDashBoardPage from '../../components/AdminDashBoardPage'
import { CREATE_FORM_PATH } from '../../constants/RouteConstants'
import {success,error} from '../../../Common/utils/ToastUtils.js';
import {getUserDisplayableErrorMessage} from '../../../Common/utils/APIUtils.js';

@inject('formStore', 'authStore', 'questionsStore')
@observer
class AdminRoute extends React.Component {
   @observable formsOffset = -4;
   @observable fromsLimit = 4;
   @observable currentPageNumber = 0;

   getFormStore = () => {
      return this.props.formStore
   }

   getAuthStore = () => {
      return this.props.authStore
   }

   async componentDidMount() {
      await this.getUserDetails()
   }


   componentWillUnmount() {
      this.onSuccessNewFormCreate()
      const {clearStore} = this.getFormStore();
      clearStore();
   }

   @computed 
   get currentPage(){
      return this.currentPageNumber;
   }

   @computed
   get totalPagesCount(){
      const {totalFormsCount} = this.getFormStore();
      return Math.ceil(totalFormsCount/this.fromsLimit);
   }

   @action
   getNextForms = async() =>{
      const { getUserForms } = this.getFormStore()
      this.formsOffset+=(this.fromsLimit);
      this.currentPageNumber++;
      await getUserForms(this.fromsLimit,this.formsOffset) 
   }

   @action
   getPreviousForms = async() =>{
      const {setPreviousForms} = this.getFormStore();
      this.formsOffset-=this.fromsLimit;
      this.currentPageNumber--;
      const { getUserForms } = this.getFormStore()
      await getUserForms(this.fromsLimit,this.formsOffset)
   }

   getUserDetails = async () => {
      const { getUserForms } = this.getFormStore()
      const { userProfile } = this.getAuthStore()
      await userProfile()
      this.getNextForms();
   }

   @action
   userSignOut = async() => {
      
      const { userSignOut } = this.props.authStore
      const { history } = this.props
      await userSignOut();
      history.replace({ pathname: '/' })
   }

   onCreateNewForm = async (formName) => {
      
      const { onCreateNewForm } = this.getFormStore()
      await onCreateNewForm(formName)
   }

   onSuccessNewFormCreate = reaction(
      () => {
         const { getCreateFormApiStatus } = this.getFormStore()
         return getCreateFormApiStatus === API_SUCCESS
      },
      status => {
         const { history } = this.props
         const { forms } = this.getFormStore()
         const formIdIndex = Array.from(forms.values()).length - 1
         const formId = Array.from(forms.keys())[formIdIndex]
         if (status) 
            history.push({ pathname: `/create/${formId}` })
      }
   )

   onFailureNewFormCreate = reaction(
      ()=>{
         const {getCreateFormApiStatus} = this.getFormStore();
         return getCreateFormApiStatus===API_FAILED
      },
      (status)=>{
         const {getCreateFormApiError} = this.getFormStore()
         if(status)
            error(getUserDisplayableErrorMessage(getCreateFormApiError));
      }

   )
   
   onUpdateFormName = () =>{
      
   }
   
   
   onDeleteForm = (formId) =>{
      const {
         onDeleteForm
      } = this.getFormStore()
      onDeleteForm(formId)
   }

   onFormClick = formId => {
      const { history } = this.props
      history.push({ pathname: `/create/${formId}` })
   }

   renderSuccessUi = () => {
      const {
         isCreatingNewForm,
         forms,
         getCreateFormApiStatus
      } = this.getFormStore()

      const { userProfileDetails } = this.getAuthStore()

      return (
         <AdminDashBoardPage
            forms={forms}
            onCreateNewForm={this.onCreateNewForm}
            userSignOut={this.userSignOut}
            onFormClick={this.onFormClick}
            userProfileDetails={userProfileDetails}
            createNewQuestionLoadingStatus={
               getCreateFormApiStatus === API_FETCHING
            }
            onDeleteForm = {this.onDeleteForm}
            getNextForms = {this.getNextForms}
            getPreviousForms = {this.getPreviousForms}
            currentPage = {this.currentPage}
            totalPagesCount = {this.totalPagesCount}

         />
      )
   }

   render() {
      const { getFormApiError, getFormsApiStatus } = this.getFormStore()

      return (
         <LoadingWrapperWithFailure
            apiStatus={getFormsApiStatus}
            renderSuccessUI={this.renderSuccessUi}
            onRetryClick={this.getUserDetails}
            apiError={getFormApiError}
         />
      )
   }
}

export default withRouter(AdminRoute)
