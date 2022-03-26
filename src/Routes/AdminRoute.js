import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, admin, loading } = useAuth();
    if (loading) {
        return <div className="">
            Loading
        </div>
    }
    return (user.email && admin) ? children : <Navigate to="/login" />;
}

export default AdminRoute