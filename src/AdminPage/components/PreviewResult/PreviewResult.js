import React from 'react'
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import { Preview } from './styledComponents.js';
import PreviewPage from '../../../User/components/PreviewPage';

@observer
class PreviewResult extends React.Component {
   @observable questionPosition = 1;

   getNextQuestion = () =>{
      const {getNextQuestion} = this.props;
      getNextQuestion();
      this.questionPosition++;
   }

   getPreviousQuestion = () =>{
      const {getPreviousQuestion} = this.props;
      getPreviousQuestion();
      this.questionPosition--;
   }

   render() {
      const {
         currentQuestionPreview,
         getPreviousQuestion,
         totalQuestions,
         questionNumber,
         questionListSize
      } = this.props;
      return currentQuestionPreview!==null?
         <Preview><PreviewPage  
               question={currentQuestionPreview}
               getNextQuestion = {this.getNextQuestion}
               getPreviousQuestion={this.getPreviousQuestion}
               questionNumber = {questionNumber}
               totalQuestions = {totalQuestions}
               questionListSize ={questionListSize}
               questionPosition = {this.questionPosition}
         
            /></Preview>
         :
         <Preview></Preview>
   }
}

export { PreviewResult }
