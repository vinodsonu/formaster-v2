import React from 'react';
import Cookie from 'js-cookie'
import { render } from "@testing-library/react";

import {ProtectedRoute} from '.'
import { createMemoryHistory } from 'history'
import { Router, Route, withRouter } from "react-router-dom";
import { SIGN_IN_PATH } from "../../../../Authentication/constants/RouteConstants";


Cookie.set = jest.fn()
Cookie.remove = jest.fn()
Cookie.get = jest.fn()

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid='location-display'>{location.pathname}</div>
 ))

describe("test ProtectedRoute",()=>{
    it("test ProtectedRoute success",()=>{
        let history = createMemoryHistory()
        history.push({pathname:'/route'})
        const {
            getByText,
            getByTestId
        } = render(
            <Router history={history}>
                    <ProtectedRoute path="/route" component={<LocationDisplay/>}/>
                    <Route path={SIGN_IN_PATH}>
                        <LocationDisplay/>
                    </Route>
            </Router>
        )
        getByText(SIGN_IN_PATH)
    })
})