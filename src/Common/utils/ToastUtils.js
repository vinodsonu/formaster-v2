import { ToastContainer, toast } from 'react-toastify';


export function success(){
    toast.success('successfully completed !',{
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