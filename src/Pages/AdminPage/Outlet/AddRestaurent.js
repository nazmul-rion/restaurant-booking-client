import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddRestaurent = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        Swal.fire({
            title: 'Are you sure you want to insert this Restaurent?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post('https://restaurant-booking-server.onrender.com/addrestaurent', data)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: "Wow",
                                    text: "Restaurent inserted successful",
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
    }

    return (
        <div className='container-fluid'>
            <h5>Add a New Restaurent</h5>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="container">

                    <input placeholder='Enter Restaurent Name' className='form-control m-3'  {...register("RestaurantName", { required: true })} />
                    {errors.RestaurantName && <span>This field is required</span>}
                    <input placeholder='Enter Restaurent City' className='form-control m-3' {...register("City", { required: true })} />
                    {errors.City && <span>This field is required</span>}
                    <input placeholder='Enter Restaurent Zone' className='form-control m-3' {...register("Zone", { required: true })} />
                    {errors.Zone && <span>This field is required</span>}
                    <input placeholder='Enter Restaurent Owner Name' className='form-control m-3' {...register("OwnerName", { required: true })} />
                    {errors.OwnerName && <span>This field is required</span>}
                    <input type="email" placeholder='Enter Restaurent Owner Email' className='form-control m-3' {...register("OwnerEmail", { required: true })} />
                    {errors.OwnerEmail && <span>This field is required</span>}

                    <input className='btn btn-info m-3' type="submit" />
                </div>

            </form>


        </div>
    )
}

export default AddRestaurent