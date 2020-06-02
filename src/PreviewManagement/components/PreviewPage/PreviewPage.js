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
import ProgressBar from './ProgressBar';
import QuestionNavigator from './QuestionNavigator';

import { PreviewPageContainer,ProgressBarAndQuestionNavigator } from './styledComponents.js'

@observer
class PreviewPage extends React.Component {
   
   componentDidMount(){
      const {
         getNextQuestion,
         getPreviousQuestion
      } = this.props;
      document.onkeydown = function(event){ 
         if(event.keyCode==38)
            getPreviousQuestion()
         else if(event.keyCode==40)
            getNextQuestion()
     }
   }

   renderQuestion = () => {
      const {
         question,
         questionNumber,
         question: { questionType },
         getNextQuestion,
         getPreviousQuestion
      } = this.props

      switch (questionType) {
         case WELCOME_SCREEN:
            return (
               <ScreentTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion = {getPreviousQuestion}
               />
            )
         case THANK_YOU_SCREEN:
            return (
               <ScreentTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion = {getPreviousQuestion}
               />
            )
         case SHORT_TEXT:
            return (
               <TextTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion = {getPreviousQuestion}
               />
            )
         case LONG_TEXT:
            return (
               <TextTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion={getPreviousQuestion}
               />
            )
         case MULTIPLE_CHOICE:
            return (
               <McqTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion={getPreviousQuestion}
               />
            )
      }
   }

   render() {
      const {totalQuestions} = this.props;
      return (
         <PreviewPageContainer>
               {this.renderQuestion()}
               <ProgressBarAndQuestionNavigator>
                  <ProgressBar/>
                  <QuestionNavigator/>
               </ProgressBarAndQuestionNavigator>
         </PreviewPageContainer>
      )
   }
}

export { PreviewPage }
