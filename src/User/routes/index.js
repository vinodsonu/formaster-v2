import React from 'react'
import { Route } from 'react-router-dom'
import { USER_PAGE_PATH,PREVIEW_FORM} from '../constants/RouteConstants'

import { ProtectedRoute } from '../../Common/components/common/ProtectedRoute'

import UserRoute from './UserRoute';
import PreviewRoute from './PreviewRoute'


const UserRoutes = [
   <ProtectedRoute key={USER_PAGE_PATH} path={USER_PAGE_PATH} component={UserRoute} />
   ,
   <Route key={PREVIEW_FORM} path={PREVIEW_FORM} component={PreviewRoute} />
]

export default UserRoutes




