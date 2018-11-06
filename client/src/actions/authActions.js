import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import {
    setAuthToken,
    getLocalStorageName
} from "../helpers";
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => dispatch => {

    axios
        .post('/api/users/register', userData)
        .then(user => {
            history.push('/login');
        })
        .catch(
            error => {
                return dispatch({
                    type: GET_ERRORS,
                    payload: error.response.data
                })
            }
        );
};

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            console.log(res);
            const {
                token
            } = res.data;
            localStorage.setItem(getLocalStorageName('token'), token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded))
        })
        .catch(
            error => {
                return dispatch({
                    type: GET_ERRORS,
                    payload: error.response.data
                })
            }
        );
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}