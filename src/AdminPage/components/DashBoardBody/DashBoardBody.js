import React from 'react'
import FormCards from '../FormCards'
import CreateForm from '../CreateForm'

import { DashBoard, FormSection } from './styledComponents.js'

class DashBoardBody extends React.Component {
   render() {
      const {
         forms,
         onCreateNewForm,
         onFormClick,
         createNewQuestionLoadingStatus
      } = this.props
      return (
         <DashBoard>
            <FormSection>
               <CreateForm
                  onCreateNewForm={onCreateNewForm}
                  createNewQuestionLoadingStatus={
                     createNewQuestionLoadingStatus
                  }
               />
               <FormCards forms={forms} onFormClick={onFormClick} />
            </FormSection>
         </DashBoard>
      )
   }
}

export { DashBoardBody }
