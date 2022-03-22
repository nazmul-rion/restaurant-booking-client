import React from 'react'
import { Navigate, NavLink, useLocation, useParams } from 'react-router-dom';
import OrderListApi from '../../../Hooks/OrderListApi'

const AllorderList = () => {

    const location = useLocation();

    const { restaurantID } = location.state;

    const [orderList, setOrderList] = OrderListApi(restaurantID)

    return (
        <div className='container my-3'>

            <div className="my-4 d-flex justify-content-between align-items-center"  >
                <h3 className=''>Order List</h3>
                <h5 className=''>Order Found: {orderList.length}</h5>
            </div>
            <div className="container-fluid">
                {
                    orderList.map(order => {
                        return (
                            <NavLink to={`${order._id}`} key={order._id} className="restaurentContainer my-3" >
                                <h4>Order ID: {order._id}</h4>

                                <h6><b>Customer Name:</b> {order.CustomerName}</h6>

                            </NavLink>
                        )
                    })
                }



            </div>



        </div >
    )
}

export default AllorderList