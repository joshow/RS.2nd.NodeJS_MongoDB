import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            // 스프레드 operator 위에 것을 똑같이 가져온다 하는데 대체 뭐지?...
            return { ...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...state, success: action.payload }
        case AUTH_USER:
            return { ...state, userData : action.payload }
        default:
            return state;
    }
}