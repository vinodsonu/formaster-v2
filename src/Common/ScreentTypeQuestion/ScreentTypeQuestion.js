import React from 'react'
import {observer} from 'mobx-react';
import {FaRegImage} from 'react-icons/fa'


import PreviewNavButton from '../components/common/PreviewNavButton';
import { ScreenQuestion, ScreenText, StartButton,ImageContainer } from './styledComponents.js'

@observer
class ScreentTypeQuestion extends React.Component {
   getNextQuestion = () => {
      const { getNextQuestion ,getPreviousQuestion} = this.props
      getNextQuestion()
   }

   render() {
      const {
         question: { 
            questionText,
            questionType,
            responseChoice,
            textResponseDetails
          },totalQuestions,questionNumber
         ,questionListSize,
         questionPosition
      } = this.props
      return (
         <ScreenQuestion>
            <ImageContainer>
               <FaRegImage/>
            </ImageContainer>
            <ScreenText>{questionText}</ScreenText>
              <PreviewNavButton
              
               questionType = {questionType}
               questionNumber = {questionNumber}
               totalQuestions = {totalQuestions}
               handleOnClick = {this.getNextQuestion}
               questionResponseText = {textResponseDetails}
               questionChoiceResponse = {responseChoice}
               questionListSize = {questionListSize}
               questionPosition = {questionPosition}
              
              />
         </ScreenQuestion>
      )
   }
}

export { ScreentTypeQuestion }
