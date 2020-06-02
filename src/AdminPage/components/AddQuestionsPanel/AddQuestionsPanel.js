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
   TypeOptions,
   Option
} from './styledComponents.js'

@observer
class AddQuestionsPanel extends React.Component {
   renderListOfQuestions = () => {
      const { questions, onToggleShouldShowSettings,onClickQuestion } = this.props
      return (
         <Questions
            questions={questions}
            onToggleShouldShowSettings={onToggleShouldShowSettings}
            onClickQuestion={onClickQuestion}
         />
      )
   }

   renderTypeOptions = () => {
      const {
         createRoute: { questionTypeOptions }
      } = strings
      const {  addNewQuestion } = this.props

      return <MenuList>
            <MenuItem >
               <Option value={questionTypeOptions[0]} onClick={addNewQuestion}>
                {questionTypeOptions[0]}
             </Option>
               
            </MenuItem>  
            <MenuItem>
            <Option value={questionTypeOptions[1]} onClick={addNewQuestion}>
                {questionTypeOptions[1]}
             </Option>
            </MenuItem>
            <MenuItem >
            <Option value={questionTypeOptions[2]} onClick={addNewQuestion}>
                {questionTypeOptions[2]}
             </Option>
            </MenuItem>
            <MenuItem>
            <Option value={questionTypeOptions[3]} onClick={addNewQuestion}>
                {questionTypeOptions[3]}
             </Option>
            </MenuItem>
            <MenuItem>
            <Option value={questionTypeOptions[4]} onClick={addNewQuestion}>
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
         </AddQuestion>
      )
   }
}

export default AddQuestionsPanel


