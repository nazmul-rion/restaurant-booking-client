import React, { useState } from 'react'
import locationIcon from '../../Assets/icons/locationIcon.svg'
import useCart from '../../Context/CartManagement/useCart';

const RestaurantDetails = () => {


    const [foodCategory, setFoodCategory] = useState("");

    const { cartState, cartDispatch } = useCart();

    const categoryHandle = (cat) => {
        setFoodCategory(cat);
    }

    console.log(cartState)
    return (
        <section className='container my-5'>

            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                <div>
                    <h4>Restaurent Name</h4>
                    <h5>
                        <span><img width='20' src={locationIcon} alt="" /></span>
                        <span> Zone Name , City Name</span>
                    </h5>
                </div>

                <div>
                    <h4><b>Owner:</b> Owner Name</h4>
                </div>
            </div>


            {/* Food Category Listing */}

            <div className=" my-3">


                <button className="btn foodcategorybtn"
                    onClick={() => categoryHandle("")}
                >All</button>
                <button className="btn foodcategorybtn"
                    onClick={() => categoryHandle("Vegitable and Salad")}
                >Vegitable and Salad</button>


            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-md-start justify-content-center my-3">


                <div className="foodCard">
                    <img className='img-fluid' src='https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg' alt="" />

                    <div className="d-flex justify-content-between align-items-center px-2">
                        <h5 className=''>Burger</h5>
                        <h5 className='text-success'>৳126.00</h5>
                    </div>

                    <button className='btn mt-2 w-100'
                        onClick={() => cartDispatch({
                            type: 'ADD_TO_CART',

                            item: {
                                itemId: "asfasfas",
                                itemName: 'afsf',
                                itemPrice: 45848.48,
                            }
                        })}
                    >Add to <span className=' fw-bold blinker '>Live</span> Table Booking</button>
                </div>




            </div>


        </section>
    )
}

export default RestaurantDetails