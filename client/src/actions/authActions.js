import axios from 'axios';
import {GET_ERRORS} from "./types";

export const registerUser = (userData, history) => dispatch => {

    axios
        .post('/api/users/register', userData)
        .then(user => {;
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