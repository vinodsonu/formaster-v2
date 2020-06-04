import React from 'react'
import { observer } from 'mobx-react'


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
      if(onChangeResponseText)
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
            textResponseDetails,
            questionType ,
            questionResponseText,
            questionChoiceResponse
         },
         totalQuestions
      } = this.props
      const { QuestionPlaceholder } = strings

      return (
         <TextQuestion>
            
            <QuestionDetails>
               <QuestionNumber>{questionNumber}</QuestionNumber>
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
                     questionResponseText = {questionResponseText}
                     questionChoiceResponse = {questionChoiceResponse}
             
             />
         </TextQuestion>
      )
   }
}

export { TextTypeQuestion }
