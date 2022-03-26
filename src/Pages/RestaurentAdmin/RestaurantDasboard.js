import React from 'react'
import { NavLink, Outlet, useParams, Navigate } from 'react-router-dom'
import SingleRestaurantApi from '../../Hooks/SingleRestaurantApi';

const RestaurantDasboard = () => {
    const { restaurantID } = useParams();
    const [Singlerestaurant, setSingleRestaurant] = SingleRestaurantApi(restaurantID)
    return (
        <div>
            <h4 className="text-center">Restaurant Owner Panel</h4>
            <h3 className="text-center">{Singlerestaurant?.RestaurantName}</h3>
            <hr />

            <div className="d-flex justify-content-start align-items-center">


                <NavLink className="btn deactive"
                    to="/restaurantadminpage" replace state={{ restaurantID: restaurantID }}
                >My Restaurant List</NavLink>

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