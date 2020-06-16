import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

/*global jest*/
/*global expect*/

import CreateForm from '.'

describe('Admin CreateForm test', () => {
   it('should CreateForm success', () => {
      const { getByText } = render(<CreateForm />)

      getByText(/New Form/)
   })
})
