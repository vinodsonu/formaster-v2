import React from 'react'
import { observer } from 'mobx-react'



import { InputElement, InputWithLabel, InputLabel,ErrorDisplay } from './styledComponents'

@observer
class InputFeild extends React.Component {
   inputFeildRef = React.createRef();
   render() {
      const {
         value,
         handleOnChange,
         type,
         label,
         placeholder,
         fieldErrorMsg,
         hamdleOnKeyDown
      } = this.props
      
      //Todo:Handling onChange in this Component it self
      return (
         <InputWithLabel>
            <InputLabel>{label}</InputLabel>
            <InputElement
               placeholder={placeholder}
               type={type}
               value={value}
               onChange={handleOnChange}
               ref={this.inputFeildRef}
               onKeyDown={hamdleOnKeyDown}
            />
            <ErrorDisplay>{fieldErrorMsg}</ErrorDisplay>
         </InputWithLabel>
      )
   }
}

export { InputFeild }
