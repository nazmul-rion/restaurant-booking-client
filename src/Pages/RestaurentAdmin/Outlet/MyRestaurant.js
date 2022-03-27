import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../../../Hooks/useAuth';

const MyRestaurant = () => {
    let navigate = useNavigate()
    const [restaurantList, setRestaurantList] = useState([]);
    const { user, signOutUser } = useAuth();
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


            <h3 className='text-center  '>Welcome {user.displayName}</h3>
            <Button className="m-2" variant="danger" onClick={signOutUser}>Sign Out</Button>

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