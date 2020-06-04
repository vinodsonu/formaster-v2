import { ToastContainer, toast } from 'react-toastify';


export function success(msg){
    toast.success(msg,{
        hideProgressBar: true,
        closeOnClick: true
    });
}

export function error(msg){
    toast.error(msg,{
        hideProgressBar: true,
        closeOnClick: true
    });
}