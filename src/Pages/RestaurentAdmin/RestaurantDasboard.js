import React from 'react'
import { NavLink, Outlet, useParams, Navigate } from 'react-router-dom'

const RestaurantDasboard = () => {
    const { restaurantID } = useParams();
    return (
        <div>
            <h3 className="text-center">Restaurant Owner Panel</h3>
            <hr />

            <div className="d-flex justify-content-start align-items-center">


                <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")}
                    to="allorders" replace state={{ restaurantID: restaurantID }}
                >Order List</NavLink>

                <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='allmenu' replace state={{ restaurantID: restaurantID }}>Menu</NavLink>

                <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='alltable' replace state={{ restaurantID: restaurantID }}><span className=' fw-bold blinker '>Live</span> Table Tracking</NavLink>

                <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='edittable' replace state={{ restaurantID: restaurantID }}>Edit Table Info</NavLink>

            </div>

            <Outlet />

        </div >
    )
}

export default RestaurantDasboard