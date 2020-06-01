import React from 'react'
import { observer } from 'mobx-react'
import ReactLoading from 'react-loading'

import { PrimaryButtonElement, ButtonText } from './styledComponents'

@observer
class PrimaryButton extends React.Component {
   onClick = () => {
      const { handleOnClick } = this.props
      handleOnClick()
   }

   renderDisplayValue = () => {
      const { loadingStatus, displayText } = this.props
      if (loadingStatus)
         return (
            <ReactLoading
               type={'spin'}
               color={'white'}
               height={20}
               width={20}
            />
         )
      else return displayText
   }

   render() {
      const { loadingStatus } = this.props
      return (
         <PrimaryButtonElement onClick={this.onClick} disabled={loadingStatus}>
            <ButtonText>{this.renderDisplayValue()}</ButtonText>
         </PrimaryButtonElement>
      )
   }
}

export { PrimaryButton }
