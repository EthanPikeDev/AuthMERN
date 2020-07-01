import { GET_ERRORS, CLEAR_ERRORS } from './types';

//Method to return errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id}
    }
}

//method to clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};