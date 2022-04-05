import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const DashBoardRoute = ({ children }) => {
    const { user, admin, restaurentadmin, loading } = useAuth();
    if (loading) {
        return <div className="">
            Loading
        </div>
    }

    if (!user.email) {
        return <Navigate to="/login" />;
    }

    else if (user.email && admin) {
        return <Navigate to="/adminpage" />;
    }
    else if (user.email && restaurentadmin) {
        return <Navigate to="/restaurantadminpage" />;
    }
    else {
        return <Navigate to="/userdashboard" />;
    }



}

export default DashBoardRoute