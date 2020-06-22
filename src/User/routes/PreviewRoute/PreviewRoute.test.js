import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

/*global jest*/
/*global expect*/

import {PREVIEW_FORM} from '../../constants/RouteConstants'

import PreviewApi from '../../services/QuestionPreviewService/QuetionPreviewApi'

import PreviewStore from '../../stores/PreviewStore';

import getPreviewDetails from '../../fixtures/getPreviewDetails.json'
import UserProfileService from '../../../Common/services/UserProfileService/UserProfileAPI'
import getUserProfileResponse from '../../../Authentication/fixtures/getUserProfileResponse.json';
import PreviewRoute from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('PreviewRoute test', () => {
   let previewService
   let previewStore
   
   beforeEach(() => {
    previewService = new PreviewApi();
     previewStore = new PreviewStore(previewService)   
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should PreviewRoute Preview page success', async() => {
       let mockSuccessPromise = Promise.resolve(getPreviewDetails[0])
       const previewAPI = jest.fn();
       previewAPI.mockReturnValue(mockSuccessPromise);
       previewService.getPreviewQuestion = previewAPI;
       await previewStore.userPreview();
   


       let history = createMemoryHistory();
       history.replace({pathname:PREVIEW_FORM})
      const {
         getByLabelText,
         getAllByPlaceholderText,
         getByRole,
         getByText
      } = render(
          <Provider previewStore={previewStore}>
            <Router history={history}>
                
                <Route path={PREVIEW_FORM}>
                    <LocationDisplay/>
                </Route>
    
            </Router>
         </Provider>
      )

      
      getByText("/forms/:formId/preview")
      
   })

   it('should PreviewRoute Preview page success', async() => {
      let mockSuccessPromise = Promise.resolve(getPreviewDetails[0])
      const previewAPI = jest.fn();
      previewAPI.mockReturnValue(mockSuccessPromise);
      previewService.getPreviewQuestion = previewAPI;
      await previewStore.userPreview();
  
     const {
        getByLabelText,
        getAllByPlaceholderText,
        getByRole,
        getByText
     } = render(
         <Provider previewStore={previewStore}>
           <Router history={createMemoryHistory()}>
               <PreviewRoute/>
           </Router>
        </Provider>
     )
     
     await waitFor(()=>{
        getByText(/Welcome To Our Hote/)
     })
   
  })
  it('should PreviewRoute Preview Text Type Question page success', async() => {
   let mockSuccessPromise = Promise.resolve(getPreviewDetails[1])
   const previewAPI = jest.fn();
   previewAPI.mockReturnValue(mockSuccessPromise);
   previewService.getPreviewQuestion = previewAPI;
   await previewStore.userPreview();

  const {
     getByLabelText,
     getAllByPlaceholderText,
     getByRole,
     getByText
  } = render(
      <Provider previewStore={previewStore}>
        <Router history={createMemoryHistory()}>
            <PreviewRoute/>
        </Router>
     </Provider>
  )
  
  await waitFor(()=>{
     getByText(/What is your first name ?/)
  })
 
  
})

})
