import React from 'react';
import {
  Route
} from 'react-router-dom';

import {ADMIN_PAGE_PATH} from '../constants/RouteConstants';
import {ProtectedRoute} from  '../../Common/ProtectedRoute';
import AdminRoute from './AdminRoute'



const AdminPageRoutes = [
  <ProtectedRoute key={ADMIN_PAGE_PATH} path={ADMIN_PAGE_PATH} component={AdminRoute} />
];


export default AdminPageRoutes