import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { withRouter } from 'react-router-dom'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import PreviewPage from '../../../Common/components/PreviewPage'
import { WELCOME_SCREEN, THANK_YOU_SCREEN } from "../../../AdminPage/constants/QuestionTypeContants"

@inject('previewStore')
@observer
class PreviewRoute extends React.Component {
   @observable questionOffset
   @observable questionNumber

   constructor() {
      super()
      this.questionOffset = 0
      this.questionNumber = 1
      ;
   }

   componentDidMount() {
      this.getPreviewQuestion()
   }

   getPreviewStore = () => {
      return this.props.previewStore
   }

   getPreviewQuestion = async () => {
      const { userPreview } = this.getPreviewStore()
      const { match } = this.props
      const { formId } = match.params
      await userPreview(formId, this.questionOffset)
   }

   renderSuccessUi = () => {
      const { question ,totalQuestions} = this.getPreviewStore()
      return (
         <PreviewPage
            question={question}
            questionNumber={this.questionNumber}
            getNextQuestion={this.getNextQuestion}
            totalQuestions = {totalQuestions}
            getPreviousQuestion = {this.getPreviousQuestion}
         />
      )
   }

   getNextQuestion = () => {
      const {
         totalQuestions,
         question:{questionType}
      } = this.getPreviewStore()
      if(this.questionOffset<totalQuestions-1)
      {   this.questionOffset++
         this.getPreviewQuestion()
         if(questionType!==WELCOME_SCREEN && questionType!==THANK_YOU_SCREEN)
         this.questionNumber++;
      }

      
   }

   getPreviousQuestion = () => {

      const {
         question:{questionType}
      } = this.getPreviewStore();

      if(this.questionOffset>0)
      {   this.questionOffset--
          this.getPreviewQuestion()
          if(questionType!==WELCOME_SCREEN && questionType!==THANK_YOU_SCREEN)
         this.questionNumber--;
      }
      
   }

   render() {
      const {
         getPreviewQuestionsApitatus,
         getPreviewQuestionsApiError
      } = this.getPreviewStore()

      return (
         <LoadingWrapperWithFailure
            apiStatus={getPreviewQuestionsApitatus}
            renderSuccessUI={this.renderSuccessUi}
            onRetryClick={this.getPreviewQuestion}
            apiError={getPreviewQuestionsApiError}
         />
      )
   }
}

export default withRouter(PreviewRoute)
