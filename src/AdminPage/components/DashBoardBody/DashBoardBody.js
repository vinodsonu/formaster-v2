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
         createNewQuestionLoadingStatus,
         onDeleteForm
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
               <FormCards forms={forms} onFormClick={onFormClick} onDeleteForm={onDeleteForm} />
            </FormSection>
         </DashBoard>
      )
   }
}

export { DashBoardBody }
