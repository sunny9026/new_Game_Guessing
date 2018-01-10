import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types';

export default (state={}, action) =>{
    switch(action.type){
        case AUTH_USER :
            return { ...state, auth:true };

        case UNAUTH_USER :
            return { ...state, auth:false};
       
        case AUTH_ERROR :
            return { ...state, error: action.payload, auth:false};
        
        case FETCH_MESSAGE :
            return { ...state, message: action.payload }
    }

    return state;
}