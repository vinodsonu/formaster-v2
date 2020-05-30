import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Modal from 'react-modal'

import strings from '../../i18n/strings.json'
import InputFeild from '../../../Common/components/InputFeild'
import PrimaryButton from '../../../Common/components/PrimaryButton'

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
   }
}

import {
   CreateFormCard,
   CreateFormText,
   CreateFormButton
} from './styledComponents.js'

@observer
class CreateForm extends React.Component {
   @observable isClicked
   @observable modalIsOpen
   @observable formName
   @observable loadingStatus
   constructor() {
      super()
      this.isClicked = false
      this.modalIsOpen = false
      this.formName = ''
      this.loadingStatus = false
   }

   openModal = () => {
      this.modalIsOpen = true
   }

   closeModal = () => {
      this.loadingStatus = true
      const { createNewQuestionLoadingStatus } = this.props
      if (createNewQuestionLoadingStatus) this.modalIsOpen = false
   }

   onCreateNewForm = () => {
      this.isClicked = true
      const { onCreateNewForm } = this.props
      onCreateNewForm()
   }

   handleChangeFormName = event => {
      this.formName = event.target.value
   }

   handleCreateNewForm = () => {
      const { defaultFormName } = strings
      this.closeModal()
      this.formName = this.formName.length ? this.formName : defaultFormName
      this.onCreateNewForm(this.formName)
      this.formName = ''
   }

   render() {
      const {
         createFormCardText,
         createFormButtonSymbol,
         createNewFormData,
         createNewFormModelCloseButtonData
      } = strings

      const { type, label, placeholder } = createNewFormData
      const { createNewQuestionLoadingStatus } = this.props
      return (
         <CreateFormCard>
            <CreateFormText onClick={this.openModal}>
               {createFormCardText}
            </CreateFormText>
            <CreateFormButton onClick={this.openModal}>
               {createFormButtonSymbol}
            </CreateFormButton>

            <Modal
               isOpen={this.modalIsOpen}
               onAfterOpen={this.afterOpenModal}
               onRequestClose={this.closeModal}
               style={customStyles}
            >
               <InputFeild
                  value={this.formName}
                  handleOnChange={this.handleChangeFormName}
                  type={type}
                  placeholder={placeholder}
                  label={label}
               />

               <PrimaryButton
                  handleOnClick={this.handleCreateNewForm}
                  displayText={createNewFormModelCloseButtonData}
                  loadingStatus={this.loadingStatus}
               />
            </Modal>
         </CreateFormCard>
      )
   }
}

export { CreateForm }
