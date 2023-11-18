import { deleteUser } from "../redux/auth.slice"
import { useDispatch } from 'react-redux'

const SignOut = () => {
    const dispatch = useDispatch();
    dispatch(deleteUser())
    window.location.href = `/`;
    return null;
};

export default SignOut;