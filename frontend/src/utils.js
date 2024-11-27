
import { toast} from 'react-toastify';

export const notify  = (message , type) => {
    toast[type](message); 
}
export const API_URL = 'https://merntask-deploy-api.vercel.app' ;
