import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, admin, restaurentadmin, loading } = useAuth();
    if (loading) {
        return <div className="">
            Loading
        </div>
    }

    return (user.email) ? children : <Navigate to="/login" />;


}

export default PrivateRoute