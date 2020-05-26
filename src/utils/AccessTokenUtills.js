import {getAccessToken} from './StorageUtils';

export const isLoggedin = () =>{
    return getAccessToken()!==undefined;
}