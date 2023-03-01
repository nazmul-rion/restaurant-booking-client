import React from 'react'
import RestaurantListApi from '../../../Hooks/RestaurantListApi';
import locationIcon from '../../../Assets/icons/locationIcon.svg'
import swal from 'sweetalert';

const AllRestaurentList = () => {
    const [restaurantList, setRestaurantList] = RestaurantListApi({ searchInput: "", searchCity: "", searchZone: "" });

    const handleDeleteOrder = id => {
        const url = `https://restaurant-booking-server.onrender.com/allrestaurants/${id}`;

        swal("Are you sure you want Cancel this Order?", {
            buttons: ["No", "Yes"],
        })
            .then((value) => {
                if (value) {
                    fetch(url, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                swal("Deleted Successfull...", {
                                    icon: "success",
                                });
                                const remainingrestaurant = restaurantList.filter(res => res._id !== id);
                                setRestaurantList(remainingrestaurant);
                            }
                        });
                }
            });

    }
    if (restaurantList.length === 0) {
        return <div className="d-flex justify-content-center">
            <h1>Loading...</h1>
        </div>
    }

    return (
        <div className='container my-3'>

            <div className="my-4 d-flex justify-content-between align-items-center"  >
                <h3 className=''>Restaurent List</h3>
                <h5 className=''>Restaurant Found: {restaurantList.length}</h5>
            </div>
            <div className="container-fluid">
                {
                    restaurantList.map(restaurant => {
                        return (
                            <div key={restaurant._id} className="restaurentContainer my-3">
                                <h4>{restaurant.RestaurantName}</h4>
                                <h5>
                                    <span><img width='20' src={locationIcon} alt="" /></span>
                                    <span> {restaurant.Zone} , {restaurant.City}</span>
                                </h5>

                                <h6><b>Owner:</b> {restaurant.OwnerName}</h6>
                                <button onClick={() => handleDeleteOrder(restaurant._id)} className="btn btn-danger">Delete</button>
                            </div>
                        )
                    })
                }



            </div>



        </div >
    )
}

export default AllRestaurentList