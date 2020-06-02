import React from 'react'
import { observer } from 'mobx-react';
import {observable} from 'mobx';



import { FormCard, FormTitle, FormEditOptions } from './styledComponents.js';


@observer
class EachFormCard extends React.Component {
   @observable isFormNameEmpty = false;
   @observable tempFormName = ''
   
   onClickFormCard = () => {
      const {
         onClickForm,
         form: { formId }
      } = this.props
      onClickForm(formId)
   }
   
   

   render() {
      const {form:{formName}} = this.props;                                                                                                
      return (
         <FormCard>
            <FormTitle onClick={this.onClickFormCard} >{formName}</FormTitle>
         </FormCard>
      )
   }
}

export { EachFormCard }