import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import FoodCategoryList from '../../../Hooks/FoodCategoryList';
import FoodListApi from '../../../Hooks/FoodListApi';
import trushIcon from '../../../Assets/icons/trashIcon.svg'
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const MenuEdit = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { restaurantID } = location.state;


    const [foodCategory, setFoodCategory] = useState("All");
    const [foodList, setFoodList] = FoodListApi(restaurantID, foodCategory);
    const [foodCategoryList, setFoodCategoryList] = FoodCategoryList(restaurantID);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const categoryHandle = (cat) => {
        setFoodCategory(cat);
    }

    const handleDeleteCategory = id => {
        const url = `http://localhost:7000/allfoodcategories/${id}`;

        swal("Are you sure you want Delete this Category?", {
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
                                const remainingcat = foodCategoryList.filter(cat => cat._id !== id);
                                setFoodCategoryList(remainingcat);
                            }
                        });
                }
            });

    }

    const handleDeleteFood = id => {
        const url = `http://localhost:7000/allfoods/${id}`;

        swal("Are you sure you want Delete this Item?", {
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
                                const remainingfood = foodList.filter(food => food._id !== id);
                                setFoodList(remainingfood);
                            }
                        });
                }
            });

    }

    const handleAddCategory = () => {
        Swal.fire({
            title: 'Enter a Category',
            input: 'text',

            showCancelButton: true,
            confirmButtonText: 'Insert',
            showLoaderOnConfirm: true,
            preConfirm: async (FoodCategoryName) => {
                const res = await axios.post('http://localhost:7000/addfoodcategory', { RestaurantID: restaurantID, FoodCategoryName: FoodCategoryName });
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Wow",
                        text: "Category inserted successful",
                        icon: "success",
                    });
                }
                else {
                    Swal.fire("Sorry!", "Some Error occure", "error");
                }
            }

        })
    }


    const handleAddFood = data => {
        Swal.fire({
            title: 'Are you sure you want to insert this Food?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post('http://localhost:7000/addfood', data)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: "Wow",
                                    text: "Food inserted successful",
                                    icon: "success",

                                });
                                reset();
                            }
                            else {
                                Swal.fire("Sorry!", "Some Error occure", "error");
                            }
                        });
                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });

        handleClose();
    }

    const handleAvailibity = (Availability, foodID) => {

        let chngAvailability = "";
        Availability === "Enable" ? chngAvailability = "Disable" : chngAvailability = "Enable";

        fetch(`http://localhost:7000/addFood/${chngAvailability}/${foodID}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire('Item updated')

                }
            })

    }


    return (
        <div className='container-fluid'>

            {/* Food Category Listing */}

            <div className="container my-3">

                <div className="d-flex m-3">
                    <button onClick={handleAddCategory} className='btn btn-warning mx-2'>Add Food Category</button>


                    <Button className='mx-2' variant="primary" onClick={handleShow}>
                        Add Food Items
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add A Food Item</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={handleSubmit(handleAddFood)}>
                            <Modal.Body>

                                <div className="container-fluid">

                                    <input hidden placeholder='Enter Food Name' className='form-control my-3'  {...register("RestaurantID", { required: true })} value={restaurantID} />
                                    {errors.RestaurantID && <span>This field is required</span>}

                                    <input placeholder='Enter Food Name' className='form-control my-3'  {...register("FoodName", { required: true })} />
                                    {errors.FoodName && <span>This field is required</span>}

                                    <input placeholder='Price' className='form-control my-3' {...register("Price", { required: true })} />
                                    {errors.Price && <span>This field is required</span>}



                                    <select className='form-control' {...register("FoodCategory", { required: true })} >

                                        {
                                            foodCategoryList.map(singleCategory => {
                                                return (
                                                    <option key={singleCategory._id} value={singleCategory.FoodCategoryName}>{singleCategory.FoodCategoryName}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    {errors.FoodCategory && <span>This field is required</span>}

                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <input className='btn btn-info m-3' type="submit" />
                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>

                <button className={foodCategory === "All" ? ` foodcategorybtn activecategory` : ` foodcategorybtn deactivecategory`}
                    onClick={() => categoryHandle("All")}
                >All</button>


                {
                    foodCategoryList.map(singleCategory => {
                        return (

                            <div key={singleCategory._id} className="d-inline mx-3">
                                <button
                                    className={foodCategory === singleCategory.FoodCategoryName ? ` foodcategorybtn activecategory` : ` foodcategorybtn deactivecategory`}
                                    onClick={() => categoryHandle(singleCategory.FoodCategoryName)}
                                >{singleCategory.FoodCategoryName}</button>
                                <img width={15} src={trushIcon} alt=""
                                    onClick={() => handleDeleteCategory(singleCategory._id)}
                                />
                            </div>

                        )
                    })
                }

            </div >


            <div className="d-flex flex-wrap align-items-center justify-content-md-start justify-content-center mb-3 container">

                {
                    foodList.map(food => {
                        return (
                            <div key={food._id} className="foodCard m-3">
                                <img className='img-fluid' src='https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg' alt="" />

                                <div className="d-flex justify-content-between align-items-center px-2">
                                    <div>
                                        <h5 className=''>{food.FoodName}</h5>
                                        <h6><b>Availability: </b> {food.Availability}</h6>
                                    </div>
                                    <h5 className='text-success'>৳{food.Price}</h5>
                                </div>

                                <div className="d-flex justify-content-between align-items-center m-2">

                                    <div>


                                        <button onClick={() => handleAvailibity(food.Availability, food._id)} className='btn py-0 bg-info'>Change</button>
                                    </div>

                                    <img width={35} src={trushIcon} alt=""
                                        onClick={() => handleDeleteFood(food._id)}
                                    />

                                </div>
                            </div>
                        )
                    })
                }






            </div>





        </div >
    )
}

export default MenuEdit