import React from 'react'
import { Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import OrderListApi from '../../../Hooks/OrderListApi'

const AllorderList = () => {

    const location = useLocation();
    const navigate = useNavigate();
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
                            <div key={order._id}
                                onClick={() => navigate(`${order._id}`)}
                                className="restaurentContainer my-3">

                                <h4>Order ID: {order._id}</h4>

                                <h6><b>Customer Name:</b> {order.CustomerName}</h6>


                            </div>
                        )
                    })
                }



            </div>



        </div >
    )
}

export default AllorderList