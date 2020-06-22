import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import {PREVIEW_FORM,SIGN_IN_PATH} from '../../constants/RouteConstants'

import FormApi from '../../services/FormService/FormApi'

import UserFormStore from '../../stores/UserFormStore'
import AuthStore from '../../../Authentication/stores/AuthStore'

import getFormResponse from '../../fixtures/getFormResponse.json'
import UserProfileService from '../../../Common/services/UserProfileService/UserProfileAPI'
import getUserProfileResponse from '../../../Authentication/fixtures/getUserProfileResponse.json';
import UserRoute from '.'
import PaginationStore from "../../../Common/stores/PaginationStore"

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('UserRoute test', () => {
   let formApi
   let formStore
   let userProfileApi
   let authStore
   
   beforeEach(() => {
      userProfileApi = new UserProfileService()
      formApi = new FormApi()
      formStore = new UserFormStore(formApi,PaginationStore)
      authStore = new AuthStore(formApi, userProfileApi)
      
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should UserRoute Preview page navigation', async() => {


    const mockSuccessPromise = new Promise((resolve)=>{resolve(getFormResponse[0])})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      formApi.getForms = mockSignInAPI
    formStore.paginationStore.entitiesServiceMethod = mockSignInAPI
    await formStore.paginationStore.getNewEntities()


   
    
    authStore.onUserSignOut = Promise.resolve();

       let history = createMemoryHistory();
       history.replace({pathname:'/user'})
      const {
         getByLabelText,
         getAllByPlaceholderText,
         getByRole,
         getByText
      } = render(
          <Provider authStore={authStore} userFormStore={formStore}>
            <Router history={history}>
                <Route path="/user">
                    <UserRoute/>
                </Route>
                <Route path={PREVIEW_FORM}>
                    <LocationDisplay/>
                </Route>
                <Route path={'/login'}>
                    <LocationDisplay/>
                </Route>
            </Router>
         </Provider>
      )

      fireEvent.click(getByText('Accomidation Kit'))
      getByText("/forms/3/preview")
      
   })

   // it('should UserRoute Preview page navigation', async() => {


   //    const mockSuccessPromise = new Promise((resolve,reject)=>{reject()})
   //    const mockSignInAPI = jest.fn()
   //    mockSignInAPI.mockReturnValue(mockSuccessPromise)
   //    formApi.getForms = mockSignInAPI
   //    await formStore.paginationStore.getNewEntities()
  
      
   //    authStore.onUserSignOut = Promise.resolve();
  
   //       let history = createMemoryHistory();
   //       history.replace({pathname:'/user'})
   //      const {
   //         getByLabelText,
   //         getAllByPlaceholderText,
   //         getByRole,
   //         getByText
   //      } = render(
   //          <Provider authStore={authStore} userFormStore={formStore}>
   //            <Router history={history}>
   //                <Route path="/user">
   //                    <UserRoute/>
   //                </Route>
   //                <Route path={PREVIEW_FORM}>
   //                    <LocationDisplay/>
   //                </Route>
   //                <Route path={'/login'}>
   //                    <LocationDisplay/>
   //                </Route>
   //            </Router>
   //         </Provider>
   //      )
  
        
   //      getByText("Retry")
        
   //   })

})
