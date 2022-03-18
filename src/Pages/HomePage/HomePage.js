import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import searchIcon from '../../Assets/icons/searchIcon.svg'
import RestaurantListApi from '../../Hooks/RestaurantListApi';

function HomePage() {

    let navigate = useNavigate();

    const [searchQuary, setSarchQuary] = useState({ searchInput: "", searchCity: "", searchZone: "" });




    return (
        <section className='container my-3'>

            <h5 className='my-3'>For Your Desire Restaurent Menu List Search The Restaurent First!</h5>


            {/* Search Box */}

            <div className='my-5 '>
                <div className='d-flex serach-container border border-2 border-dark w-75 mx-auto'>

                    <img className='my-2 mx-3' width='30' src={searchIcon} alt="search Icon" />

                    <input
                        onChange={(e) => {

                            searchQuary.searchInput = e.target.value;

                        }}
                        style={{ outline: 'none' }} className='w-100 border border-0' type="text" placeholder='Search The Restaurent First!' />

                </div>

                <h6 className='text-center my-3'>OR</h6>

                <div className="d-flex justify-content-evenly align-items-center">
                    <select onChange={(e) => {

                        searchQuary.searchCity = e.target.value;

                    }} className='mx-5  py-2 fs-5'>

                        <option value="">Select City</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>

                    </select>

                    <select onChange={(e) => {

                        searchQuary.searchZone = e.target.value;

                    }} className='mx-5  py-2 fs-5'>

                        <option value="">Select Zone</option>
                        <option value="Agrabad" >Agrabad</option>
                        <option value="2 No Gate">2 No Gate</option>

                    </select>
                </div>

                <div className=' text-center my-3'>
                    <button onClick={() => navigate(`/menu?searchInput=${searchQuary.searchInput}&&searchCity=${searchQuary.searchCity}&&searchZone=${searchQuary.searchZone}`)} className="btn getrestaurentbtn">Get the Restaurent List</button>
                </div>

            </div>





        </section >
    )
}

export default HomePage