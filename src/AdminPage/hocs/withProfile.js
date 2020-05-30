import React from 'react'
import { inject } from 'mobx-react'

export default function withProfile(WrapperComponent) {
   @inject('authStore')
   class EnhancedComponent extends React.Component {
      async componentDidMount() {
         const { userProfile } = this.props.authStore
         await userProfile()
      }

      render() {
         const { userProfileDetails } = this.props.authStore
         return userProfileDetails !== undefined ? (
            <WrapperComponent
               userProfileDetails={userProfileDetails}
               {...this.props}
            />
         ) : null
      }
   }
   return EnhancedComponent
}
