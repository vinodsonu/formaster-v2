import React from 'react'
import { action, reaction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { API_SUCCESS, API_FAILURE, API_FETCHING } from '@ib/api-constants'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import AdminDashBoardPage from '../../components/AdminDashBoardPage'
import { CREATE_FORM_PATH } from '../../constants/RouteConstants'

@inject('formStore', 'authStore', 'questionsStore')
@observer
class AdminRoute extends React.Component {
   getFormStore = () => {
      return this.props.formStore
   }

   getAuthStore = () => {
      return this.props.authStore
   }

   componentDidMount() {
      this.getUserDetails()
   }

   componentWillUnmount() {
      this.onSuccessNewFormCreate()
   }

   getUserDetails = async () => {
      const { getUserForms } = this.getFormStore()
      const { userProfile } = this.getAuthStore()
      await userProfile()
      await getUserForms()
   }

   @action
   userSignOut = () => {
      const { userSignOut } = this.props.authStore
      const { history } = this.props
      userSignOut()
      history.replace({ pathname: '/' })
   }

   onCreateNewForm = async () => {
      const { onCreateNewForm } = this.getFormStore()
      await onCreateNewForm()
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
         if (status) history.push({ pathname: `/create/${formId}` })
         else if (this.getFormStore().getCreateFormApiStatus === API_FAILURE)
            alert('Something went wrong....')
      }
   )

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
