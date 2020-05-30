import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import NavBar from '../NavBar'
import AddQuestionsPanel from '../AddQuestionsPanel'
import PreviewResult from '../PreviewResult'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import Settings from '../Settings'

import { CreateFormContainer, CreatePageBody } from './styledComponents.js'

@observer
class CreateFormPage extends React.Component {
   @observable shouldShowSettings

   constructor() {
      super()
      this.shouldShowSettings = false
   }

   onToggleShouldShowSettings = question => {
      this.shouldShowSettings = !this.shouldShowSettings
   }

   renderSuccessUI = () => {
      const { questions, addNewQuestion, form } = this.props
      return (
         <CreatePageBody>
            {this.shouldShowSettings ? (
               <Settings
                  shouldShowSettings={this.shouldShowSettings}
                  onToggleShouldShowSettings={this.onToggleShouldShowSettings}
               />
            ) : null}
            <AddQuestionsPanel
               questions={questions}
               addNewQuestion={addNewQuestion}
               onToggleShouldShowSettings={this.onToggleShouldShowSettings}
               form={form}
            />
            <PreviewResult />
         </CreatePageBody>
      )
   }

   render() {
      const {
         userSignOut,
         getFormDetailsApiError,
         getFormDetailsApiStatus,
         getTheCurrentFormDetails,
         form: { formName },
         userProfileDetails,
         onPublish
      } = this.props
      return (
         <CreateFormContainer>
            <NavBar
               formName={formName}
               userSignOut={userSignOut}
               userProfileDetails={userProfileDetails}
               onPublish={onPublish}
            />
            <LoadingWrapperWithFailure
               apiStatus={getFormDetailsApiStatus}
               renderSuccessUI={this.renderSuccessUI}
               onRetryClick={getTheCurrentFormDetails}
               apiError={getFormDetailsApiError}
            />
         </CreateFormContainer>
      )
   }
}

export { CreateFormPage }
