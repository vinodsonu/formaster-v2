import React from 'react'
import { withRouter } from 'react-router-dom'
/*global expect*/
import { render, waitFor } from '@testing-library/react'
import withProfile from './withProfile'
import authStore from '../../Authentication/stores';


describe('Should test the withProfile hoc', () => {
   it('should test the withProfile status success', async () => {
      class WrapperComponent extends React.Component {
         render() {
            return <div></div>
         }
      }

      const EnhancedComponent = withProfile(WrapperComponent)
      const { getByText } = render(<EnhancedComponent authStore={authStore}
                                    />)

      //  waitFor(() => {
      //    getByText(/false/)
      // })
   })
})
