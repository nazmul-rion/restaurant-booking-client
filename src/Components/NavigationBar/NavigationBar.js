import React from 'react'
import './NavigationBar.css'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import cartIcon from '../../Assets/icons/cartIcon.svg'
import useCart from '../../Context/CartManagement/useCart'

function NavigationBar() {

    const { cartState, cartDispatch } = useCart();
    let navigate = useNavigate();


    return (
        <>

            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <NavLink to='/' >
                        <img
                            src="/favicon.ico"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">


                            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to="/">Home</NavLink>

                            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to="/menu">Menu</NavLink>

                            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to="/tablebooking"><span className=' fw-bold blinker '>Live</span> Table Booking</NavLink>

                            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to="/tabletracking"><span className=' fw-bold blinker '>Live</span> Table Tracking</NavLink>

                            <span className='m-2 text-decoration-none' onClick={() => navigate('/tablebooking')}>
                                <img width='25' src={cartIcon} alt="" /><sub className='fs-6 text-danger fw-bold'>{cartState.cartList.length}</sub>
                            </span>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>





        </>
    )
}

export default NavigationBar