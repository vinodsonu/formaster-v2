import React from 'react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import DashBoardBody from '../DashBoardBody'
import DashBoardHeader from '../DashBoardHeader'

import { AdminDashBoardContainer } from './styledComponents.js'

class AdminDashBoardPage extends React.Component {
   render() {
      const {
         userSignOut,
         userProfileDetails,
         forms,
         onCreateNewForm,
         onFormClick,
         createNewQuestionLoadingStatus
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
            />
         </AdminDashBoardContainer>
      )
   }
}

export { AdminDashBoardPage }
