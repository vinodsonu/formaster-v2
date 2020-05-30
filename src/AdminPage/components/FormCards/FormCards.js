import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import EachFormCard from '../EachFormCard'

@observer
class FormCards extends React.Component {
   renderForms = () => {
      const { forms, onFormClick } = this.props
      return Array.from(forms.values()).map(form => (
         <EachFormCard
            key={form.formId}
            form={form}
            onFormClick={onFormClick}
         />
      ))
   }

   render() {
      return this.renderForms()
   }
}

export { FormCards }
