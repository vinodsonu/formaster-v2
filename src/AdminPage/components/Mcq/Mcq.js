import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import TransparentInputFeild from '../../../Common/components/TransparentInputFeild'
import strings from '../../i18n/strings.json'

import {
   McqScreen,
   ScreenText,
   Choices,
   AddMcqSection
} from './styledComponents.js'
import QuestionIcon from "../common/QuestionIcon"
import QuestionEditOptions from '../common/QuestionEditOptions';     

@observer
class Mcq extends React.Component {
   @observable choiceText = ''
   @observable updatedMcqValue = ''
   choiceCount = -1
   addMcqRef = React.createRef();

   
   handleOnChange = event => {
      const { onChangeQuestionText } = this.props.question
      onChangeQuestionText(event.target.value)
   }

   handleMcqChange = event => {
      this.choiceText = event.target.value
   }

   handleOnFocus = () =>{
      const {
         onClickQuestion,
         question:{questionId}
      } = this.props;
      onClickQuestion(questionId)
   }

   handleMcqUpdate = (event) =>{
      this.updatedMcqValue = event.target.value;

   }

   renderChoices = () => {
      const { choices } = this.props.question
      const {
         createRoute: {
            mcqscreen: { choicePlaceholder, choiceType }
         }
      } = strings
      return choices.map(each => {
         return (
            <TransparentInputFeild
               placeholder={choicePlaceholder}
               handleOnChange={()=>{}}
               value={each.choice_text}
               type={choiceType}
               key={each.choice_id}
            />
         )
      })
   }

   

   onAddMcq = () => {
      const { choices } = this.props.question
      let newChoices = choices

            newChoices.push({
            choice_id: this.choiceCount--,
            choice_text: this.choiceText
         })
         this.props.question.onChangeChoices(newChoices)
         this.choiceText = ''

   }

   onDeleteMcq = () =>{
      const { choices } = this.props.question
      let newChoices = choices
      newChoices.pop();
      console.log(newChoices)
      this.props.question.onChangeChoices(newChoices)                                                                                                                                                                                    
   }

   onKeyDownChoice = (event)=>{
      if(event.keyCode===13){
            this.onAddMcq();
            this.addMcqRef.current.inputRef.current.focus();
      }


      else if(event.keyCode===8 && this.choiceText===''){
            this.onDeleteMcq()
      }
   }



   render() {
      const {
         createRoute: {
            mcqscreen: { placeholder, type,choicePlaceholder }
         }
      } = strings
      const {question:{ questionText, questionId,questionType},getQuestionNumber } = this.props
      const questionNumber = getQuestionNumber(questionId)
      return (
         <McqScreen onClick={this.handleOnFocus}>
            <ScreenText>
               <QuestionIcon
                  type={questionType}
                  questionNumber={questionNumber}
               />
               <Choices>
                  <TransparentInputFeild
                     placeholder={placeholder}
                     handleOnChange={this.handleOnChange}
                     value={questionText}
                     type={type}
                     handleOnFocus = {()=>{}}
                  />

                  {this.renderChoices()}
                  <AddMcqSection>
                     <TransparentInputFeild
                        placeholder={choicePlaceholder}
                        handleOnChange={this.handleMcqChange}
                        value={this.choiceText}
                        type={type}
                        handleOnKeyDown = {this.onKeyDownChoice}
                        ref = {this.addMcqRef}
                        handleOnFocus = {this.handleOnFocus}
                     />
                  </AddMcqSection>
               </Choices>
            </ScreenText>
            <QuestionEditOptions/>
         </McqScreen>
      )
   }
}

export { Mcq }
