import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SIGNUP_USER, FETCH_MESSAGE} from './types';
import axios from 'axios';

const Root_URL = "http://localhost:3090/";

export function authorizeUser({email, password},callback){

    return (dispatch)=>{
        axios.post(`${Root_URL}signin`, {email, password})
        .then((response) =>{
            dispatch({ type: AUTH_USER });
            console.log(response.data.token);
            localStorage.setItem('token',response.data.token);
            callback();
        })
        .catch(() => {
            dispatch(authError("Bad Login info.!"));
        })
    }
} 

export function signUpUser({email, password}, callback){
    return (dispatch) => {
        axios.post(`${Root_URL}signup`, {email, password})
        .then(response => {
            dispatch({ type: AUTH_USER });
            console.log(response.data.token);
            localStorage.setItem('token',response.data.token);
            callback();
        }).catch(err => {
            console.log(err.data.error)
            dispatch(authError(err));
        })
    }
}

export function authError(error){
    return{
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser(){
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({type: UNAUTH_USER});
    }
}

export function fetchMessage(){
    return (dispatch) => {
        console.log("reached");
        axios.get(Root_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(response => {
            dispatch({ type: FETCH_MESSAGE, payload: response.data.message })
        })
    }
}