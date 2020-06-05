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
      this.questionNumber = 0
      ;
   }

   componentDidMount() {
      this.getPreviewQuestion()
   }

   getPreviewStore = () => {
      return this.props.previewStore
   }

   getPreviewQuestion = async (isIncrement) => {
      const { userPreview } = this.getPreviewStore()
      const { match } = this.props
      const { formId } = match.params
      await userPreview(formId, this.questionOffset)
      const {
         question:{questionType}
      } = this.getPreviewStore();
      if(questionType!==WELCOME_SCREEN && questionType!==THANK_YOU_SCREEN)
       {  
          if(isIncrement)
            this.questionNumber = this.questionNumber+1;
          else
            this.questionNumber = this.questionNumber-1;
       }
      
   }

   renderSuccessUi = observer(() => {
      const { question ,totalQuestions} = this.getPreviewStore()
      const {totalAnswerableQuestions} = this.getPreviewStore();
      return (
         <PreviewPage
            question={question}
            questionNumber={this.questionNumber}
            getNextQuestion={this.getNextQuestion}
            totalQuestions = {totalAnswerableQuestions}
            getPreviousQuestion = {this.getPreviousQuestion}
            totalScreens = {totalQuestions}
         />
      )
   })

   getNextQuestion = async() => {
      
      const { match } = this.props
      const { formId } = match.params
      const {
         totalQuestions,
         question:{questionType},
         submitQuestion
      } = this.getPreviewStore()
      if(this.questionOffset<totalQuestions)
      {  
         if(questionType!==WELCOME_SCREEN && questionType!==THANK_YOU_SCREEN)
         {   await submitQuestion(formId);
         }
         this.questionOffset++
         if(this.questionOffset<totalQuestions)
         {
            this.getPreviewQuestion(true)
         }
      }

      
   }

   getPreviousQuestion = async() => {
      if(this.questionOffset>0)
      {   this.questionOffset--
          this.getPreviewQuestion(false)
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
