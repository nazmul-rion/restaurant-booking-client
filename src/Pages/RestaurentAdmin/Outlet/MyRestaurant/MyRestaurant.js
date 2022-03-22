import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const MyRestaurant = () => {
    let navigate = useNavigate()
    const [restaurantList, setRestaurantList] = useState([]);
    const user = { UserName: "Nazmul Rion", email: "rion@gmail.com" }
    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:7000/allrestaurantsbyemail/${user.email}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {

                    setRestaurantList(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [restaurantList, user.email]);



    return (
        <div>
            {/* <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='allorders'>Order List</NavLink>

            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='allmenu'>Menu</NavLink>

            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to='alltable'><span className=' fw-bold blinker '>Live</span> Table Tracking</NavLink> */}

            <h3 className='text-center  '>Welcome {user.UserName}</h3>

            <div className="container-fluid">
                {
                    restaurantList.map(res => {
                        return (
                            <div key={res._id}
                                onClick={() => navigate(res._id)}
                                className="restaurentContainer my-3">
                                <h4>Restaurant Name: {res.RestaurantName}</h4>

                                <h6><b>City Name:</b> {res.City}</h6>
                                <h6><b>Zone Name:</b> {res.Zone}</h6>

                            </div>
                        )
                    })
                }



            </div>




        </div >
    )
}

export default MyRestaurant