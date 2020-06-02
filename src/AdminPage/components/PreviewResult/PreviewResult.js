import React from 'react'
import {observer} from 'mobx-react';

import { Preview } from './styledComponents.js';
import PreviewPage from '../../../PreviewManagement/components/PreviewPage';

@observer
class PreviewResult extends React.Component {
   render() {
      const {
         currentQuestionPreview,
         getNextQuestion,
         getPreviousQuestion
      } = this.props;
      return currentQuestionPreview!==null?
         <Preview><PreviewPage  
               question={currentQuestionPreview}
               getNextQuestion = {getNextQuestion}
               getPreviousQuestion={getPreviousQuestion}
            /></Preview>
         :
         <Preview></Preview>
   }
}

export { PreviewResult }
