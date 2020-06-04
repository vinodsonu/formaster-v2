import React from 'react'
import { observer } from 'mobx-react'

import { InputElement, InputWithLabel, InputLabel } from './styledComponents'

@observer
class BottomBorderedInput  extends React.Component {
   inputRef = React.createRef();
   render() {
      const {
         value,
         handleOnChange,
         type,
         label,
         placeholder,
         isFeildError,
         handleOnKeyDown,
         handleOnFocus
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
               onKeyDown={handleOnKeyDown}
               ref= {this.inputRef}
               onFocus = {handleOnFocus}
            />
         </InputWithLabel>
      )
   }
}

export { BottomBorderedInput }
