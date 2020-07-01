import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import axios from 'axios';

//Fetch the items from the server
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
    .get('/api/items')
    .then(res => 
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete item from the server
export const deleteItem = id => (dispatch,getState) => {
    axios.delete(`/api/items/${id}`, tokenConfig(getState)).then(res => 
        dispatch({
        type: DELETE_ITEM,
        payload: id
    })
    ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    
};

//add item to the server
export const addItem = item => (dispatch, getState) => {
   axios.post('/api/items', item, tokenConfig(getState))
   .then(res => 
    dispatch({
        type: ADD_ITEM,
        payload: res.data
    })
    ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};



//set items loading from server
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}