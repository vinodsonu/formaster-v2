import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getAccessToken } from '../../../utils/StorageUtils'
import { SIGN_IN_PATH } from '../../../constants/RouteConstants'

export const ProtectedRoute = ({ component, ...rest }) => {
   return getAccessToken() ? (
      <Route {...rest} component={component} />
   ) : (
      <Redirect to={SIGN_IN_PATH} />
   )
}
