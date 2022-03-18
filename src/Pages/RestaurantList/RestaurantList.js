import React from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import locationIcon from '../../Assets/icons/locationIcon.svg'
import RestaurantListApi from '../../Hooks/RestaurantListApi';


const RestaurantList = () => {

    let navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [restaurantList, setRestaurantList] = RestaurantListApi(Object.fromEntries([...searchParams]));

    return (
        <section className='container'>

            <div className="my-4 d-flex justify-content-between align-items-center"  >
                <h3 className=''>Click the Restaurent for Menu List</h3>
                <h5 className=''>Restaurant Found: {restaurantList.length}</h5>
            </div>

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