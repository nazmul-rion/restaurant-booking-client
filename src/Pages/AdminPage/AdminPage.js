import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminPage = () => {
    return (
        <div>
            <h3 className="text-center">Main Admin Page</h3>
            <hr />

            <div className="d-flex justify-content-start align-items-center">

                <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='allrestaurent'>Restaurent List</NavLink>
                <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='addrestaurent'>Add New Restaurent</NavLink>
            </div>

            <Outlet />

        </div>
    )
}

export default AdminPage