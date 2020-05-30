import React from 'react'
import { withRouter } from 'react-router-dom'
/*global expect*/
import { render, waitFor } from '@testing-library/react'
import withToggle from './withToggle'

describe('Should test the withToggle hoc', () => {
   it('should test the toggle status success', async () => {
      class WrapperComponent extends React.Component {
         render() {
            return <div>{'' + this.props.toggleStatus}</div>
         }
      }

      const EnhancedComponent = withToggle(WrapperComponent)
      const { getByText } = render(<EnhancedComponent />)

      await waitFor(() => {
         getByText(/false/)
      })
   })
})
