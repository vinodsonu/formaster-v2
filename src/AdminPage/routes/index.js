import React from 'react'
import { Route } from 'react-router-dom'

import { ADMIN_PAGE_PATH, CREATE_FORM_PATH } from '../constants/RouteConstants'
import { ProtectedRoute } from '../../Common/ProtectedRoute'
import AdminRoute from './AdminRoute'
import CreateRoute from './CreateRoute'

const AdminPageRoutes = [
   <ProtectedRoute
      key={ADMIN_PAGE_PATH}
      path={ADMIN_PAGE_PATH}
      component={AdminRoute}
   />,
   <ProtectedRoute
      key={CREATE_FORM_PATH}
      path={CREATE_FORM_PATH}
      component={CreateRoute}
   />
]

export default AdminPageRoutes
