import React from 'react'
import './NavigationBar.css'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function NavigationBar() {


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
                        <Nav className="ms-auto">


                            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to="/">Home</NavLink>

                            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to="/menu">Menu</NavLink>

                            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to="/tablebooking"><span className=' fw-bold blinker '>Live</span> Table Booking</NavLink>

                            <NavLink className={(navInfo) => (navInfo.isActive ? "m-2 btn active" : "m-2 btn deactive")} to="/tabletracking"><span className=' fw-bold blinker '>Live</span> Table Tracking</NavLink>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>





        </>
    )
}

export default NavigationBar