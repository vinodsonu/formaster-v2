import React from 'react'
import { observer } from 'mobx-react'
import strings from '../../i18n/strings.json'

import {
   UserProfile,
   ProfileName,
   ProfilePic,
   Username,
   ProfileAndLogout,
   LogoutButton
} from './styledComponents.js'

@observer
class UserProfileDetails extends React.Component {
   renderProfileName = isClickable => {
      const { userProfileDetails, onToggleShouldProfileDisplay } = this.props
      const { name } = userProfileDetails[0]
      const onClickFunction = isClickable
         ? onToggleShouldProfileDisplay
         : () => {}
      return (
         <ProfileName onClick={onClickFunction} data-testid='user-profile'>
            <ProfilePic>{name[0]}</ProfilePic>
            <Username>{name}</Username>
         </ProfileName>
      )
   }

   userSignOut = () => {
      const { userSignOut } = this.props
      userSignOut()
   }

   renderProfileCard = () => {
      const { logoutText } = strings

      const { shouldShowProfileDetails } = this.props

      return shouldShowProfileDetails ? (
         <ProfileAndLogout>
            {this.renderProfileName(false)}
            <LogoutButton onClick={this.userSignOut}>{logoutText}</LogoutButton>
         </ProfileAndLogout>
      ) : null
   }

   render() {
      return (
         <UserProfile>
            {this.renderProfileName(true)}
            {this.renderProfileCard()}
         </UserProfile>
      )
   }
}

export { UserProfileDetails }
