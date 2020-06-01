import React from 'react'
import { SIGN_IN_PATH ,SIGN_UP_PATH} from '../constants/RouteConstants'

import { Route } from 'react-router-dom'

import SignInRoute from './SignInRoute'
import SignupRoute from './SignupRoute';

const AuthenticationRoutes = [
   <Route key={SIGN_IN_PATH} path={SIGN_IN_PATH} component={SignInRoute} />,
   <Route key={SIGN_UP_PATH} path={SIGN_UP_PATH} component={SignupRoute} />
]

export default AuthenticationRoutes
