import React from 'react'
import { SIGN_IN_PATH } from '../constants/RouteConstants'

import { Route } from 'react-router-dom'

import SignInRoute from './SignInRoute'

const AuthenticationRoutes = [
   <Route key={SIGN_IN_PATH} path={SIGN_IN_PATH} component={SignInRoute} />
]

export default AuthenticationRoutes
