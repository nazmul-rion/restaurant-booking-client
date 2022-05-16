import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const CustomerRoute = ({ children }) => {
    const { user, customer, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <div className="">
            Loading
        </div>
    }

    return (user.email && customer) ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default CustomerRoute