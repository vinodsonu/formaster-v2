import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import UserProfileDetails from '../UserProfileDetails'
import { Header } from './styledComponents.js'
// import withProfile from '../../hocs/withProfile'

@observer
class DashBoardHeader extends React.Component {
   @observable shouldShowProfileDetails
   constructor() {
      super()
      this.shouldShowProfileDetails = false
   }

   onToggleShouldProfileDisplay = () => {
      this.shouldShowProfileDetails = !this.shouldShowProfileDetails
   }

   render() {
      const { userProfileDetails, userSignOut } = this.props
      return userProfileDetails !== null ? (
         <Header>
            <UserProfileDetails
               onToggleShouldProfileDisplay={this.onToggleShouldProfileDisplay}
               shouldShowProfileDetails={this.shouldShowProfileDetails}
               userProfileDetails={userProfileDetails}
               userSignOut={userSignOut}
            />
         </Header>
      ) : null
   }
}

export default DashBoardHeader
