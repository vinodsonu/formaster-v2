import React from 'react';
import {  Menu,  
        MenuList,  
        MenuButton,  
        MenuItem
  
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import {IoIosOptions} from 'react-icons/io';

import { Dialog
} from "@reach/dialog";
import "@reach/dialog/styles.css";

import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import {AiOutlineCloseCircle} from 'react-icons/ai'

import InputFeild from '../../../Common/components/InputFeild';

const ModalContainer = styled.div`

        ${tw`flex flex-col items-center justify-center`}

`

const DialogButton = styled.button`

    ${tw``}

`

import strings from '../../i18n/strings.json';

export default function FormOptionsMenu(props) {
  const {
    updateFormText,
    deleteFormText,
    formNameEmptyError
  } = strings;
   const {
        updatedFormName,
        onUpdateFormName,
        onSubmitFormName,
        onClickUpdate,
        isFormNameEmpty,
        onDeleteForm
    } = props;
  
  const open = () => setShowDialog(true);  
    const close = () => {
      if(!isFormNameEmpty)
        setShowDialog(false); 
      
    }
   
    const formNameEmptyErrorMsg = isFormNameEmpty?formNameEmptyError:'';
    
   const [showDialog, setShowDialog] = React.useState(false);  
    
    return (    <ModalContainer>
                        <Menu>      
                              <MenuButton>        
                                     <IoIosOptions/>  
                              </MenuButton>      
                              <MenuList>        
                                <MenuItem onSelect={onClickUpdate} onClick={open}>{updateFormText}</MenuItem>        
                                <MenuItem onSelect={onDeleteForm}>{deleteFormText}</MenuItem>        
                                </MenuList>    
                        </Menu>
                        <Dialog isOpen={showDialog} onDismiss={close} aria-label>        
                        <DialogButton className="close-button" onClick={close}>          
                                 <AiOutlineCloseCircle/>
                        </DialogButton>        
                              <InputFeild
                                type="text"
                                value={updatedFormName}
                                handleOnChange={onUpdateFormName}
                                hamdleOnKeyDown={onSubmitFormName}
                                fieldErrorMsg = {formNameEmptyErrorMsg}
                              />
                        </Dialog>    
                </ModalContainer>  
            );
                  

}
