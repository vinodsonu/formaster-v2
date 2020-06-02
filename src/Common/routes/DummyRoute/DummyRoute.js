import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { reaction } from 'mobx'

import { API_INITIAL, API_FAILURE, API_SUCCESS } from '@ib/api-constants'
import LoadingWrapperWithFailure from '../../components/LoadingWrapperWithFailure'
import { isLoggedin } from '../../../utils/AccessTokenUtills'
import {
   SIGN_IN_PATH,
   ADMIN_PAGE_PATH,
   USER_PAGE_PATH
} from '../../constants/RouteConstants'

@inject('authStore')
@observer
class DummyRoute extends React.Component {
   getStore = () => {
      return this.props.authStore
   }

   redirectToCustomerPage = async () => {
      const { userProfile } = this.getStore()
      await userProfile()
   }

   redirectToLoginPage = () => {
      const { history } = this.props
      history.replace({ pathname: SIGN_IN_PATH })
   }

   onSuccessUserProfile = reaction(
      () => {
         try {
            const { getUserProfileAPIStatus } = this.getStore()
            return getUserProfileAPIStatus === API_SUCCESS
         } catch (e) {}
      },
      status => {
         const { history } = this.props
         const { userProfileDetails } = this.getStore()
         if (status)
            if (userProfileDetails[0].role === '')
               history.replace({ pathname: ADMIN_PAGE_PATH })
            else history.replace({ pathname: USER_PAGE_PATH })
      }
   )

   async componentDidMount() {
      if (isLoggedin()) {
         this.redirectToCustomerPage()
      } else {
         this.redirectToLoginPage()
      }
   }

   renderSuccessUi = () =>{
      return null;
   }
   render() {
      const { userProfile,getUserProfileAPIStatus, getUserProfileAPIError} = this.getStore()
      return <LoadingWrapperWithFailure
                  apiStatus={getUserProfileAPIStatus}
                  renderSuccessUI={this.renderSuccessUi}
                  onRetryClick={userProfile}
                  apiError={getUserProfileAPIError}
               />
   }
}

export default withRouter(DummyRoute)
