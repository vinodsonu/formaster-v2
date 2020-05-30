import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import {
   WELCOME_SCREEN,
   THANK_YOU_SCREEN,
   SHORT_TEXT,
   LONG_TEXT,
   MULTIPLE_CHOICE
} from '../../constants/QuestionTypeContants.js'
import McqTypeQuestion from '../McqTypeQuestion'
import ScreentTypeQuestion from '../ScreentTypeQuestion'
import TextTypeQuestion from '../TextTypeQuestion'

import { PreviewPageCOntainer } from './styledComponents.js'

@observer
class PreviewPage extends React.Component {
   renderQuestion = () => {
      const {
         question,
         questionNumber,
         question: { questionType },
         getNextQuestion
      } = this.props

      switch (questionType) {
         case WELCOME_SCREEN:
            return (
               <ScreentTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
               />
            )
         case THANK_YOU_SCREEN:
            return (
               <ScreentTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
               />
            )
         case SHORT_TEXT:
            return (
               <TextTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
               />
            )
         case LONG_TEXT:
            return (
               <TextTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
               />
            )
         case MULTIPLE_CHOICE:
            return (
               <McqTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
               />
            )
      }
   }

   render() {
      return (
         <PreviewPageCOntainer>{this.renderQuestion()}</PreviewPageCOntainer>
      )
   }
}

export { PreviewPage }
