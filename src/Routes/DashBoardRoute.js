import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const DashBoardRoute = ({ children }) => {
    const { user, admin, restaurentadmin, customer, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <div className="">
            Loading
        </div>
    }


    if (!user.email) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    else if (user.email && admin) {
        return <Navigate to="/adminpage" replace state={{ from: location }} />;
    }

    else if (user.email && customer) {
        return <Navigate to="/userdashboard" replace state={{ from: location }} />;
    }

    else if (user.email && restaurentadmin) {
        return <Navigate to="/restaurantadminpage" replace state={{ from: location }} />;
    }
    else {
        return <Navigate to="/" replace state={{ from: location }} />;
    }



}

export default DashBoardRoute