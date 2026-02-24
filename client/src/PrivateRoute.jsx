import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { loading, isLoggedIn } = useSelector((state) => state.auth);

    if (loading) {
        return <div className="info">Loading...</div>
    } else {
        if (isLoggedIn) {
            return <Outlet />
        } else {
            return <Navigate to="/login" />
        }
    }
}

export default PrivateRoute;