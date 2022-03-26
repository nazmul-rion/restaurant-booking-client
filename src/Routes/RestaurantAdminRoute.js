import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const RestaurantAdminRoute = ({ children }) => {
    const { user, restaurentadmin, loading } = useAuth();

    if (loading) {
        return <div className="">
            Loading
        </div>
    }

    return (user.email && restaurentadmin) ? children : <Navigate to="/login" />;
}

export default RestaurantAdminRoute