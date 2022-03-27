import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import locationIcon from '../../Assets/icons/locationIcon.svg'
import useCart from '../../Context/CartManagement/useCart';
import FoodCategoryList from '../../Hooks/FoodCategoryList';
import FoodListApi from '../../Hooks/FoodListApi';
import SingleRestaurantApi from '../../Hooks/SingleRestaurantApi';

const RestaurantDetails = () => {

    const { restaurentID } = useParams();

    const { cartState, cartDispatch } = useCart();

    const [foodCategory, setFoodCategory] = useState("All");

    const [Singlerestaurant, setSingleRestaurant] = SingleRestaurantApi(restaurentID);

    const [foodList, setFoodList] = FoodListApi(restaurentID, foodCategory);

    const [foodCategoryList, setFoodCategoryList] = FoodCategoryList(restaurentID);




    const categoryHandle = (cat) => {
        setFoodCategory(cat);
    }


    return (
        <section className='container my-5'>

            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                <div>
                    <h4>{Singlerestaurant.RestaurantName}</h4>
                    <h5>
                        <span><img width='20' src={locationIcon} alt="" /></span>
                        <span> {Singlerestaurant.Zone}, {Singlerestaurant.City}</span>
                    </h5>
                </div>

                <div>
                    <h4><b>Owner:</b> {Singlerestaurant.OwnerName}</h4>
                </div>
            </div>


            {/* Food Category Listing */}

            <div className=" my-3">


                <button className={foodCategory === "All" ? ` foodcategorybtn activecategory` : ` foodcategorybtn deactivecategory`}
                    onClick={() => categoryHandle("All")}
                >All</button>


                {
                    foodCategoryList.map(singleCategory => {
                        return (
                            <button key={singleCategory._id}
                                className={foodCategory === singleCategory.FoodCategoryName ? ` foodcategorybtn activecategory` : ` foodcategorybtn deactivecategory`}
                                onClick={() => categoryHandle(singleCategory.FoodCategoryName)}
                            >{singleCategory.FoodCategoryName}</button>
                        )
                    })
                }




            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-md-start justify-content-center my-3">

                {
                    foodList.map(food => {

                        return (
                            <div key={food._id} className="foodCard m-3">
                                <div className='d-flex justify-content-center'>
                                    <img className='img-fluid ' src={food.foodImage} alt="" />
                                </div>

                                <div className="d-flex justify-content-between align-items-center px-2">
                                    <h5 className=''>{food.FoodName}</h5>
                                    <h5 className='text-success'>৳{food.Price}</h5>
                                </div>

                                {
                                    food.Availability === "Enable" ?
                                        (<button className='btn mt-2 w-100'
                                            onClick={() => cartDispatch({
                                                type: 'ADD_TO_CART',

                                                item: {
                                                    itemId: food._id,
                                                    itemName: food.FoodName,
                                                    itemPrice: food.Price,
                                                },
                                                restaurentID: restaurentID
                                            })}
                                        >Add to <span className=' fw-bold blinker '>Live</span> Table Booking</button>)
                                        :
                                        (<button className='btn  bg-danger w-100'>Disabled</button>)
                                }

                            </div>
                        )
                    })
                }






            </div>


        </section>
    )
}

export default RestaurantDetails