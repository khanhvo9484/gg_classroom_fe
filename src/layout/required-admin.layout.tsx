import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "@/redux/auth.slice";

const RequiredAdmin = () => {
    const user = useSelector(selectUser);
    if (
        user.role !== "user"
    ) {
        return <Navigate to={`/test`}></Navigate>;
    }

    return <Outlet />;
};

export default RequiredAdmin;
