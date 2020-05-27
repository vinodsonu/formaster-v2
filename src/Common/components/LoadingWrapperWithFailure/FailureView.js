import React from 'react'
import { observer } from 'mobx-react'

import {
  FailureViewContainer,
  FailureViewMessage,
  RetryButton,
} from './styledComponents'

@observer
class FailureView extends React.Component {
  render() {
    const { onRetryClick, errorMessage } = this.props

    return (
      <FailureViewContainer className='w-full'>
        <FailureViewMessage>{errorMessage}</FailureViewMessage>
        <RetryButton onClick={onRetryClick}>Retry</RetryButton>
      </FailureViewContainer>
    )
  }
}

export default FailureView
