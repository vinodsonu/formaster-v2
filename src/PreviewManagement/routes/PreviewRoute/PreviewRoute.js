import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { withRouter } from 'react-router-dom'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import PreviewPage from '../../components/PreviewPage'

@inject('previewStore')
@observer
class PreviewRoute extends React.Component {
   @observable questionOffset

   constructor() {
      super()
      this.questionOffset = 0
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
            questionNumber={this.questionOffset + 1}
            getNextQuestion={this.getNextQuestion}
            totalQuestions = {totalQuestions}
            getPreviousQuestion = {getPreviousQuestion}
         />
      )
   }

   getNextQuestion = () => {
      this.questionOffset++
      this.getPreviewQuestion()
   }

   getPreviousQuestion = () => {
      this.questionOffset--
      this.getPreviewQuestion()
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
