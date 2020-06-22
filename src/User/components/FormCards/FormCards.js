import React from 'react'
import { observer } from 'mobx-react'

import EachFormCard from '../EachFormCard'

@observer
class FormCards extends React.Component {
   renderForms = () => {
      const { forms,onClickForm } = this.props
      return forms.map(form => (
         <EachFormCard
            key={form.formId}
            form={form}
            onClickForm={onClickForm}
         />
      ))
   }

   render() {
      return this.renderForms()
   }
}

export { FormCards }
