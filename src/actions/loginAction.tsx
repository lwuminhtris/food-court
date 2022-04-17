import * as types from '../constants/ActionTypes';

const ALogin = (username: string) => ({
    type: types.LOGIN,
    user: {
        username,
    }
});

export default ALogin;