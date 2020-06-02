import React from 'react'
import { Route } from 'react-router-dom'

import DummyRoute from './DummyRoute'

const DefaultRoute = [<Route key={'/'} path='/' component={DummyRoute} />]

export default DefaultRoute
