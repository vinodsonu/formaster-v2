import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { withRouter, Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

// import withProfile from '../../hocs/withProfile'
import strings from '../../i18n/strings.json'
import UserProfileDetails from '../UserProfileDetails'
import Back from '../icons/backNavigation'
import image from '../icons/image.svg'
import PrimaryButton from '../../../Common/components/PrimaryButton'
import TransparentInputFeild from '../../../Common/components/TransparentInputFeild'
import {
   CREATE_FORM_PATH,
   RESULT_RESPONSE_PATH
} from '../../constants/RouteConstants'

import {
   NavBarHeader,
   FormNameAndBackNavigation,
   BackButton,
   BackIcon,
   NavLinks,
   EachLink,
   PublishButtonAndProfile
} from './styledComponents.js'

@observer
class NavBar extends React.Component {
   @observable shouldShowProfileDetails

   constructor() {
      super()
      this.shouldShowProfileDetails = false
   }

   navigateBack = () => {
      const { history } = this.props
      history.goBack()
   }

   onToggleShouldProfileDisplay = () => {
      this.shouldShowProfileDetails = !this.shouldShowProfileDetails
   }

   render() {
      const {
         createRoute: {
            navBar: { links, publishButtonText, backButtonText }
         }
      } = strings

      const {
         formName,
         userProfileDetails,
         userSignOut,
         onPublish
      } = this.props

      return (
         <NavBarHeader>
            <FormNameAndBackNavigation>
               <BackButton onClick={this.navigateBack}>
                  <IoMdArrowRoundBack />
               </BackButton>
               <TransparentInputFeild
                  value={formName}
                  handleOnChange={() => {}}
               />
            </FormNameAndBackNavigation>

            <PublishButtonAndProfile>
               <PrimaryButton
                  displayText={publishButtonText}
                  handleOnClick={onPublish}
               />
               {userProfileDetails !== null ? (
                  <UserProfileDetails
                     shouldShowProfileDetails={this.shouldShowProfileDetails}
                     onToggleShouldProfileDisplay={
                        this.onToggleShouldProfileDisplay
                     }
                     userProfileDetails={userProfileDetails}
                     userSignOut={userSignOut}
                  />
               ) : null}
            </PublishButtonAndProfile>
         </NavBarHeader>
      )
   }
}

export default withRouter(NavBar)
