import React from 'react'
import { observer } from 'mobx-react'

import {  Menu,  
   MenuList,  
   MenuButton,  
   MenuItem,  
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";


import strings from '../../i18n/strings.json'
import Questions from '../Questions'

import {
   AddQuestion,
   AddButtonWithText,
   AddButton,
   AddText,
   AddWithTypes,
   BottomDiv,
   Option
} from './styledComponents.js'

@observer
class AddQuestionsPanel extends React.Component {

//    questionsEndRef = React.createRef()

//  componentDidMount () {
//     this.scrollToBottom()
//  }
//  componentDidUpdate () {
//     this.scrollToBottom()
//  }
//  scrollToBottom = () => {
//     this.questionsEndRef.current.scrollIntoView({ behavior: 'smooth' })
//  }

   renderListOfQuestions = () => {
      const { 
         questions, 
         onToggleShouldShowSettings,
         onClickQuestion,
         getQuestionNumber,
         onDeleteQuestion
      } = this.props
      return (
         <Questions
            questions={questions}
            onToggleShouldShowSettings={onToggleShouldShowSettings}
            onClickQuestion={onClickQuestion}
            getQuestionNumber = {getQuestionNumber}
            onDeleteQuestion = {onDeleteQuestion}
         />
      )
   }

   addNewQuestion = event =>{
      const {  addNewQuestion } = this.props
      addNewQuestion(event.target.value)
   }

   renderTypeOptions = () => {
      const {
         createRoute: { questionTypeOptions }
      } = strings

      return <MenuList>
            <MenuItem >
               <Option value={questionTypeOptions[0]} onClick={this.addNewQuestion}>
                {questionTypeOptions[0]}
             </Option>
               
            </MenuItem>  
            <MenuItem>
            <Option value={questionTypeOptions[1]} onClick={this.addNewQuestion}>
                {questionTypeOptions[1]}
             </Option>
            </MenuItem>
            <MenuItem >
            <Option value={questionTypeOptions[2]} onClick={this.addNewQuestion}>
                {questionTypeOptions[2]}
             </Option>
            </MenuItem>
            <MenuItem>
            <Option value={questionTypeOptions[3]} onClick={this.addNewQuestion}>
                {questionTypeOptions[3]}
             </Option>
            </MenuItem>
            <MenuItem>
            <Option value={questionTypeOptions[4]} onClick={this.addNewQuestion}>
                {questionTypeOptions[4]}
             </Option>
            </MenuItem>      
            
      </MenuList>

   }

   renderAddQuestionSection = () => {
      const {
         createRoute: {
            createPageBody: { createQuestionButtonText }
         }
      } = strings
   

      return (
         <AddButtonWithText>
            <AddWithTypes>

            <Menu>      
               <MenuButton>        
                     <AddButton>
                        {createQuestionButtonText}
                     </AddButton>     
               </MenuButton>      
               {this.renderTypeOptions()}     
            </Menu>
            </AddWithTypes>
            <AddText></AddText>
         </AddButtonWithText>
      )
   }

   render() {
      return (
         <AddQuestion data-testid='list-of-questions'>
            {this.renderListOfQuestions()}
            {this.renderAddQuestionSection()}
            <BottomDiv ref={this.questionsEndRef}></BottomDiv>
         </AddQuestion>
      )
   }
}

export default AddQuestionsPanel



