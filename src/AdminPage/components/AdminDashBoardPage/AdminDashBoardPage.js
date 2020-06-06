import React from 'react'
import {observer} from 'mobx-react';
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import DashBoardBody from '../DashBoardBody'
import DashBoardHeader from '../DashBoardHeader'

import { AdminDashBoardContainer } from './styledComponents.js'

@observer
class AdminDashBoardPage extends React.Component {
   render() {
      const {
         userSignOut,
         userProfileDetails,
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
         <AdminDashBoardContainer>
            <DashBoardHeader
               userProfileDetails={userProfileDetails}
               userSignOut={userSignOut}
            />
            <DashBoardBody
               forms={forms}
               onCreateNewForm={onCreateNewForm}
               onFormClick={onFormClick}
               createNewQuestionLoadingStatus={createNewQuestionLoadingStatus}
               onDeleteForm = {onDeleteForm}
               getNextForms ={getNextForms}
               getPreviousForms = {getPreviousForms}
               currentPage = {currentPage}
               totalPagesCount = {totalPagesCount}
            />
         </AdminDashBoardContainer>
      )
   }
}

export { AdminDashBoardPage }
