// import React from 'react';
// import { ToastProvider, useToasts } from 'react-toast-notifications'
 
// export const ToastMessage = () => {
//   const { addToast } = useToasts()
 
//   const onSubmit = async value => {
//     const error = false;
 
//     if (error) {
//       addToast("errorr", { appearance: 'error' })
//     } else {
//       addToast('Saved Successfully', { appearance: 'success' })
//     }
//   }
 
//   return <button onClick={onSubmit}>...</button>
//}

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';


export const success = (msg) = toast(msg);

export const error = (msg) = toast(msg);
  