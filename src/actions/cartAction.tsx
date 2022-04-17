import * as types from "../constants/ActionTypes";

const ACartAdding = (
    username: string,
    foodName: string,
    foodNumber: number
) => ({
    type: types.ADD_TO_CART,
    food: {
        username: username,
        foodname: foodName,
        foodNumber: foodNumber,
    }
});

export default ACartAdding;
