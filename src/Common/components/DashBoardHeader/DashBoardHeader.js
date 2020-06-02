import React from 'react'
import { observer } from 'mobx-react'

import UserProfileDetails from '../UserProfileDetails'
import { Header } from './styledComponents.js'


@observer
class DashBoardHeader extends React.Component {
   render() {
      const { userProfileDetails, userSignOut } = this.props
      return userProfileDetails !== null ? (
         <Header>
            <UserProfileDetails
               userProfileDetails={userProfileDetails}
               userSignOut={userSignOut}
            />
         </Header>
      ) : null
   }
}

export default DashBoardHeader
