import React from 'react'
import { observer } from 'mobx-react';
import {observable} from 'mobx';



import { FormCard, FormTitle, FormEditOptions } from './styledComponents.js';
import FormOptionsMenu from './formOptionMenu';

@observer
class EachFormCard extends React.Component {
   @observable isFormNameEmpty = false;
   @observable tempFormName = ''
   
   onClickFormCard = () => {
      const {
         onFormClick,
         form: { formId }
      } = this.props
      onFormClick(formId)
   }
   
   onUpdateFormName = (event) =>{
      const {
         form
      } = this.props;
      this.tempFormName = event.target.value;
      
   }
   
   checkForFormNameEmpty = () =>{
      const {form:{formName}} = this.props;
      if(formName.trim()!=='')
         this.isFormNameEmpty = false;
      else
         this.isFormNameEmpty = true;
   }
   
   onSubmitFormName = () => {
      
         this.onClickUpdate();
   }
   
   onClickUpdate = () =>{
      this.checkForFormNameEmpty();
      const {form} = this.props;
      if(!this.isFormNameEmpty)
         form.onUpdateFormName(this.tempFormName);
   }

   onDeleteForm = () =>{
      const {
         form:{formId},
         onDeleteForm
      } = this.props;
      onDeleteForm(formId)
   }

   render() {
      const {form:{formName}} = this.props;                                                                                                
      return (
         <FormCard>
            <FormTitle onClick={this.onClickFormCard} >{formName}</FormTitle>
            <FormEditOptions><FormOptionsMenu                                                                                                                                                                                                                                                                                                                     
                     
                     onDeleteForm = {this.onDeleteForm}
                     onUpdateFormName = {this.onUpdateFormName}
                     onSubmitFormName = {this.onSubmitFormName}
                     onClickUpdate = {this.onClickUpdate}
                     updatedFormName = {this.tempFormName}
                     isFormNameEmpty = {this.isFormNameEmpty}
            
            /></FormEditOptions>
         </FormCard>
      )
   }
}

export { EachFormCard }