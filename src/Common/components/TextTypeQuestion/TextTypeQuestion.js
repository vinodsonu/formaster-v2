import React from 'react'
import { observer } from 'mobx-react'

import {AiOutlineArrowRight} from 'react-icons/ai';

import strings from '../../i18n/strings.json'


import {
   TextQuestion,
   QuestionNumber,
   QuestionDetails,
   NextButton,
   QuestionText,
   
   QuestionResponse
} from './styledComponents.js'
import BottomBorderedInput from "../common/BottomBorderedInput"
import PreviewNavButton from '../common/PreviewNavButton'

@observer
class TextTypeQuestion extends React.Component {
   handleQuestionResponse = event => {
      const { question:{onChangeResponseText} } = this.props;
      onChangeResponseText(event.target.value)
   }

   getNextQuestion = () => {
      const { getNextQuestion } = this.props
      getNextQuestion()
   }

   render() {
      const {
         question,
         questionNumber,
         question: { 
            questionText, 
            questionType ,
            responseChoice,
            textResponseDetails
         },
         totalQuestions
      } = this.props
      const { QuestionPlaceholder } = strings
    
      return (
         <TextQuestion>
            
            <QuestionDetails>
               <QuestionNumber>{questionNumber}<AiOutlineArrowRight/></QuestionNumber>
               <QuestionText>{questionText}</QuestionText>   
            </QuestionDetails>
               <QuestionResponse>
                  <BottomBorderedInput
                           value={textResponseDetails}
                           placeholder={QuestionPlaceholder}
                           handleOnChange={this.handleQuestionResponse}
                        />
               </QuestionResponse>
               <PreviewNavButton
              
                     questionType = {questionType}
                     questionNumber = {questionNumber}
                     totalQuestions = {totalQuestions}
                     handleOnClick = {this.getNextQuestion}
                     questionResponseText = {textResponseDetails}
                     questionChoiceResponse = {responseChoice}
             
             />
         </TextQuestion>
      )
   }
}

export { TextTypeQuestion }
