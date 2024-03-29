import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, admin, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <div className="">
            Loading
        </div>
    }
    return (user.email && admin) ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default AdminRoute