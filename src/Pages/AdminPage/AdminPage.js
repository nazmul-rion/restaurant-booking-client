import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth';

const AdminPage = () => {
    const { signOutUser } = useAuth();
    return (
        <div>
            <h3 className="text-center">Main Admin Page</h3>
            <hr />

            <div className="d-flex justify-content-start align-items-center">

                <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='allrestaurent'>Restaurent List</NavLink>
                <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='addrestaurent'>Add New Restaurent</NavLink>
                <Button className="m-2" variant="danger" onClick={signOutUser}>Sign Out</Button>
            </div>

            <Outlet />

        </div>
    )
}

export default AdminPage