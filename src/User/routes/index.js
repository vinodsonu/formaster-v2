import React from 'react'
import { USER_PAGE_PATH} from '../constants/RouteConstants'

import { ProtectedRoute } from '../../Common/hocs/ProtectedRoute'

import UserRoute from './UserRoute';


const UserRoutes = [
   <ProtectedRoute key={USER_PAGE_PATH} path={USER_PAGE_PATH} component={UserRoute} />
]

export default UserRoutes
