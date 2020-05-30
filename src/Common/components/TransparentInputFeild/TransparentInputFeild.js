import React from 'react'
import { observer } from 'mobx-react'

import { InputElement, InputWithLabel, InputLabel } from './styledComponents'

@observer
class TransparentInputFeild extends React.Component {
   render() {
      const {
         value,
         handleOnChange,
         type,
         label,
         placeholder,
         isFeildError
      } = this.props

      return (
         <InputWithLabel>
            <InputLabel>{label}</InputLabel>
            <InputElement
               placeholder={placeholder}
               type={type}
               value={value}
               onChange={handleOnChange}
               isRedBorder={isFeildError}
            />
         </InputWithLabel>
      )
   }
}

export { TransparentInputFeild }
