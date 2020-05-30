import React from 'react'
import { Route } from 'react-router-dom'

import { PREVIEW_FORM } from '../constants/RouteConstants'
import { ProtectedRoute } from '../../Common/ProtectedRoute'
import PreviewRoute from './PreviewRoute'

const UserRoutes = [
   <Route key={PREVIEW_FORM} path={PREVIEW_FORM} component={PreviewRoute} />
]

export default UserRoutes
