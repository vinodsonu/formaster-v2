import React from 'react'
import FormCards from '../FormCards'
import CreateForm from '../CreateForm'

import { DashBoard, FormSection } from './styledComponents.js'
import Paginator from '../../../Common/components/Paginator';

class DashBoardBody extends React.Component {
   render() {
      const {
         forms,
         onCreateNewForm,
         onFormClick,
         createNewQuestionLoadingStatus,
         onDeleteForm,
         getNextForms,
         getPreviousForms,
         currentPage,
         totalPagesCount
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

            <Paginator
               getNextForms={getNextForms}
               getPreviousForms = {getPreviousForms}
               currentPage = {currentPage}
               totalPagesCount = {totalPagesCount}
            />

         </DashBoard>
      )
   }
}

export { DashBoardBody }
