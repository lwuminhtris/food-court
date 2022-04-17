import * as types from '../constants/ActionTypes';

const initialState = {
    userList: []
}

export default function loginReducer(state = initialState, action: any) {
    switch (action.type) {
        // if login is dispatch
        case types.LOGIN: {
            return {
                ...state,
                userList: action.user
            };
        }
        default:
            return state;
    }
}