import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import locationIcon from '../../Assets/icons/locationIcon.svg'


const RestaurantList = () => {

    let navigate = useNavigate();

    return (
        <section className='container'>

            <h3 className='my-4'>Click the Restaurent for Menu List</h3>


            <div className="container-fluid">

                <div onClick={() => navigate('/menu/restaurentID')} className="restaurentContainer">
                    <h4>Restaurent Name here...</h4>
                    <h5>
                        <span><img width='20' src={locationIcon} alt="" /></span>
                        <span> Zone Name , City Name</span>
                    </h5>

                    <h6><b>Owner:</b> Owner Name</h6>

                </div>

                <Outlet />

            </div>





        </section>
    )
}

export default RestaurantList