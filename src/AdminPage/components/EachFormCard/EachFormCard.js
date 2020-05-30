import React from 'react'
import { observer } from 'mobx-react'

import { FormCard, FormTitle, FormEditOptions } from './styledComponents.js'

@observer
class EachFormCard extends React.Component {
   onClickFormCard = () => {
      const {
         onFormClick,
         form: { formId }
      } = this.props
      onFormClick(formId)
   }

   render() {
      const { formName } = this.props.form
      return (
         <FormCard onClick={this.onClickFormCard}>
            <FormTitle>{formName}</FormTitle>
            <FormEditOptions>...</FormEditOptions>
         </FormCard>
      )
   }
}

export { EachFormCard }
