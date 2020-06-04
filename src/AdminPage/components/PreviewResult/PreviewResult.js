import React from 'react'
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import { Preview } from './styledComponents.js';
import PreviewPage from '../../../Common/components/PreviewPage';

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
         currentQuestionPreview:{questionId},
         getPreviousQuestion,
         totalQuestions,
         questionNumber,
         questionListSize
      } = this.props;

      return questionId!==undefined?
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
