import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const RestaurantAdminRoute = ({ children }) => {
    const { user, restaurentadmin, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <div className="">
            Loading
        </div>
    }

    return (user.email && restaurentadmin) ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default RestaurantAdminRoute