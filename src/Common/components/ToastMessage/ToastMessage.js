import React from 'react';
import { ToastProvider, useToasts } from 'react-toast-notifications'
 
export const ToastMessage = () => {
  const { addToast } = useToasts()
 
  const onSubmit = async value => {
    const error = false;
 
    if (error) {
      addToast("errorr", { appearance: 'error' })
    } else {
      addToast('Saved Successfully', { appearance: 'success' })
    }
  }
 
  return <button onClick={onSubmit}>...</button>
}
  