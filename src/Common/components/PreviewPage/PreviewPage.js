import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import {
   WELCOME_SCREEN,
   THANK_YOU_SCREEN,
   SHORT_TEXT,
   LONG_TEXT,
   MULTIPLE_CHOICE
} from '../../../User/constants/QuestionTypeContants.js'
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
         else if(event.keyCode==40 || event.keyCode===13)
            getNextQuestion()
     }
   }

   renderQuestion = () => {
      const {
         question,
         questionNumber,
         question: { questionType },
         getNextQuestion,
         getPreviousQuestion,
         totalQuestions,
         questionListSize,
         questionPosition
      } = this.props
      switch (questionType) {
         case WELCOME_SCREEN:
            return (
               <ScreentTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion = {getPreviousQuestion}
                  totalQuestions = {totalQuestions}
                  questionListSize ={questionListSize}
                  questionPosition = {questionPosition}
               />
            )
         case THANK_YOU_SCREEN:
            return (
               <ScreentTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion = {getPreviousQuestion}
                  totalQuestions = {totalQuestions}
                  questionListSize = {questionListSize}
                  questionPosition = {questionPosition}
               />
            )
         case SHORT_TEXT:
            return (
               <TextTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion = {getPreviousQuestion}
                  totalQuestions = {totalQuestions}
                  questionListSize ={questionListSize}
                  questionPosition = {questionPosition}
               />
            )
         case LONG_TEXT:
            return (
               <TextTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion={getPreviousQuestion}
                  totalQuestions = {totalQuestions}
                  questionListSize ={questionListSize}
                  questionPosition = {questionPosition}
               />
            )
         case MULTIPLE_CHOICE:
            return (
               <McqTypeQuestion
                  question={question}
                  questionNumber={questionNumber}
                  getNextQuestion={getNextQuestion}
                  getPreviousQuestion={getPreviousQuestion}
                  totalQuestions = {totalQuestions}
                  questionListSize ={questionListSize}
                  questionPosition = {questionPosition}
               />
            )
      }
   }

   render() {
      const {
         totalQuestions , 
         getNextQuestion,
         getPreviousQuestion,
         questionNumber,
         totalScreens,
         questionType
      } = this.props;
      
      return (
         <PreviewPageContainer>
               {this.renderQuestion()}
               <ProgressBarAndQuestionNavigator>
                  <ProgressBar totalQuestions={totalQuestions}
                               questionNumber = {questionNumber}
                               questionType = {questionType}
                  />
                  <QuestionNavigator
                     getNextQuestion={getNextQuestion}
                     getPreviousQuestion={getPreviousQuestion}
                     totalScreens = {totalScreens}
                     questionNumber = {questionNumber}
                     questionType = {questionType}
                  />
               </ProgressBarAndQuestionNavigator>
         </PreviewPageContainer>
      )
   }
}

export { PreviewPage }
