import React from 'react'
import { observable } from 'mobx'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { SIGN_IN_PATH } from '../../constants/RouteConstants'

import CreateFormPage from '../../components/CreateFormPage'

@inject('authStore', 'questionsStore')
@observer
class CreateRoute extends React.Component {
   getQuestionStore = () => {
      return this.props.questionsStore
   }

   getAuthStore = () => {
      return this.props.authStore
   }

   componentDidMount() {
      this.getFormDetails()
   }

   getFormDetails = async () => {
      const { match } = this.props
      const { formId } = match.params
      const { getTheCurrentFormDetails } = this.getQuestionStore()
      await getTheCurrentFormDetails(formId)
   }

   userSignOut = () => {
      const { userSignOut } = this.props.authStore
      userSignOut()
      const { history } = this.props
      history.replace({ pathname: SIGN_IN_PATH })
   }

   renderSuccessUi = () => {
      const {
         questions,
         getFormDetailsApiStatus,
         getFormDetailsApiError,
         getTheCurrentFormDetails,
         addNewQuestion,
         form,
         onPublish
      } = this.getQuestionStore()

      const { userProfileDetails } = this.getAuthStore()

      return (
         <CreateFormPage
            questions={questions}
            userSignOut={this.userSignOut}
            getFormDetailsApiStatus={getFormDetailsApiStatus}
            getFormDetailsApiError={getFormDetailsApiError}
            getTheCurrentFormDetails={getTheCurrentFormDetails}
            addNewQuestion={addNewQuestion}
            form={form}
            userProfileDetails={userProfileDetails}
            onPublish={onPublish}
         />
      )
   }

   render() {
      const {
         getFormDetailsApiStatus,
         getFormDetailsApiError
      } = this.getQuestionStore()

      return (
         <LoadingWrapperWithFailure
            apiStatus={getFormDetailsApiStatus}
            renderSuccessUI={this.renderSuccessUi}
            onRetryClick={this.getFormDetails}
            apiError={getFormDetailsApiError}
         />
      )
   }
}

export default withRouter(CreateRoute)
