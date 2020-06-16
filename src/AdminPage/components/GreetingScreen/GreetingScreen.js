import React from 'react'
import { observer } from 'mobx-react'
import { AiTwotoneSetting } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'

import TransparentInputFeild from '../../../Common/components/TransparentInputFeild'
import strings from '../../i18n/strings.json'
import QuestionIcon from '../common/QuestionIcon';

import QuestionEditOptions from '../common/QuestionEditOptions'

import {
   GreetingsFeild,
   ScreenText,
   ThankYouButton,
   EditOptions,
   DeleteButton,
   WelcomeButton
} from './styledComponents.js'

@observer
class GreetingScreen extends React.Component {
   handleOnChange = event => {
      const { question } = this.props
      question.onChangeQuestionText(event.target.value)
   }


   handleOnFocus = () =>{
      const {
         onClickQuestion,
         question:{questionId}
      } = this.props;
      onClickQuestion(questionId)
   }

   getQuestionPlaceholder = () =>{
      const {
         createRoute: {
            welcomeScreen,
            questionTypeOptions,
            thankYouScreen
                  }         

      } = strings
      const { questionType } = this.props.question
      if(questionType === questionTypeOptions[0])
         return welcomeScreen.placeholder;
      else
         return thankYouScreen.placeholder

   }

   getQuestionType = () =>{
      const {
         createRoute: {
            welcomeScreen,
            questionTypeOptions,
            thankYouScreen
                  }         

      } = strings
      const { questionType } = this.props.question
      if(questionType === questionTypeOptions[0])
         return welcomeScreen.type;
      else
         return thankYouScreen.type;
   }

   render() {
     
      
      
      const {question, question:{questionId, questionText,questionType},onDeleteQuestion} = this.props

      const placeholder = this.getQuestionPlaceholder();

      const type = this.getQuestionType()


      return (

         <GreetingsFeild onClick={this.handleOnFocus}>
            <ScreenText>
               <QuestionIcon
                  type = {questionType}
               />
               <TransparentInputFeild
                  placeholder={placeholder}
                  handleOnChange={this.handleOnChange}
                  value={questionText}
                  type={type}
                  handleOnFocus = {()=>{}}
               />
            </ScreenText>
         <QuestionEditOptions
            onDeleteQuestion={onDeleteQuestion}
            questionId = {questionId}
         />
      </GreetingsFeild>

      );
   }
}

export { GreetingScreen }
