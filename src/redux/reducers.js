import { combineReducers } from 'redux';
import {  SAVE_USERS } from './actions'


const userReducer = (state = [], action) => {
    switch (action.type) {
        case SAVE_USERS:
            return action.users;
        default:
            return state;
    }
};

export const reducers = combineReducers({ userReducer });
