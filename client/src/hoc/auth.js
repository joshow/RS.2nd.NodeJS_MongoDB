import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {

    // option 정보
    // null => 아무나 접근 가능
    // true => 로그인 한 유저만 접근 가능
    // false => 로그인 하지 않은 유저만 접근 가능

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        console.log("In AuthenticationCheck");
         
        useEffect(() => {
            dispatch(auth()).then(
                response => {
                    if (!response.payload.isAuth) { // 로그인 하지 않은 상태
                        if (option === true) {
                            props.history.push('/login');
                        }
                    } else {
                        // 로그인 상태
                        if (adminRoute && !response.payload.isAdmin) {
                            props.history.push('/');
                        } else {
                           if (option === false) {
                               props.history.push('/');
                           }
                        }
                    }
                }
            );
        }, []);

        return (
            <SpecificComponent />
        );
    }

    return AuthenticationCheck;
}