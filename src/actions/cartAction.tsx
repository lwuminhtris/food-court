import * as types from "../constants/ActionTypes";

const ACartAdding = (
    foodName: string
) => ({
    type: types.ADD_TO_CART,
    food: foodName
});

export default ACartAdding;
