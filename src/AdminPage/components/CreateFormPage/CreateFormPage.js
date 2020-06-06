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

   renderBody = () => {
      const { 
         questions, 
         addNewQuestion, 
         form,
         onClickQuestion,
         currentQuestionPreview,
         getPreviousQuestion,
         getNextQuestion,
         questionNumber,
         totalQuestions,
         questionListSize,
         getQuestionNumber,
         onDeleteQuestion
      } = this.props
      
      return (
         
         <CreatePageBody>
            <AddQuestionsPanel
               questions={questions}
               addNewQuestion={addNewQuestion}
               form={form}
               onClickQuestion = {onClickQuestion}
               getQuestionNumber={getQuestionNumber}
               onDeleteQuestion={onDeleteQuestion}
               
            />
            <PreviewResult 
                  currentQuestionPreview={currentQuestionPreview}
                  getPreviousQuestion = {getPreviousQuestion}
                  getNextQuestion = {getNextQuestion}
                  questionNumber = {questionNumber}
                  totalQuestions = {totalQuestions}
                  questionListSize = {questionListSize}

            />
         </CreatePageBody>
      )
   }

   render() {
      const {
         userSignOut,
         form: { formName },
         userProfileDetails,
         onPublish,
         isPublishing
      } = this.props
      return (
         <CreateFormContainer>
            <NavBar
               formName={formName}
               userSignOut={userSignOut}
               userProfileDetails={userProfileDetails}
               onPublish={onPublish}
               isPublishing = {isPublishing}
            />
            {this.renderBody()}
            
         </CreateFormContainer>
      )
   }
}

export { CreateFormPage }
