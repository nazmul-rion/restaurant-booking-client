import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import locationIcon from '../../Assets/icons/locationIcon.svg'
import RestaurantListApi from '../../Hooks/RestaurantListApi';


const RestaurantList = () => {

    let navigate = useNavigate();
    const [restaurantList, setRestaurantList] = RestaurantListApi();

    return (
        <section className='container'>

            <h3 className='my-4'>Click the Restaurent for Menu List</h3>

            <div className="container-fluid">
                {
                    restaurantList.map(restaurant => {
                        return (
                            <div key={restaurant._id} onClick={() => navigate(`/menu/${restaurant._id}`)} className="restaurentContainer my-3">
                                <h4>{restaurant.RestaurantName}</h4>
                                <h5>
                                    <span><img width='20' src={locationIcon} alt="" /></span>
                                    <span> {restaurant.Zone} , {restaurant.City}</span>
                                </h5>

                                <h6><b>Owner:</b> {restaurant.OwnerName}</h6>

                            </div>
                        )
                    })
                }



            </div>





        </section>
    )
}

export default RestaurantList