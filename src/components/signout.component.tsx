import { deleteUser } from "../redux/auth.slice"
import { useDispatch } from 'react-redux'
import { customAxios } from "../api/custom-axios"

const SignOut = () => {
    const dispatch = useDispatch();
    dispatch(deleteUser())
    try {
        customAxios.post(
          '/api/v1/auth/refresh-token/sign-out',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    window.location.href = `/`;
    return null;
};

export default SignOut;