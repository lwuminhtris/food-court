import * as types from '../constants/ActionTypes';

const initialState: Record<any, any> = {
    foodList: []
}

export default function cartReducer(state = initialState, action: any) {
    switch (action.type) {
        case types.ADD_TO_CART: {
            return {
                foodList: [...state.foodList, action.food]
            };
        }

        case types.RESET_CART: {
            return {
                foodList: []
            }
        }

        default:
            return state;
    }
}