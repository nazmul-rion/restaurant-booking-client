import React from 'react'
import { useNavigate } from 'react-router-dom';
import OrderListUserApi from '../../Hooks/OderListUser'
import useAuth from '../../Hooks/useAuth';

const UserDashBoard = () => {
    const { user } = useAuth();
    const [orderListUser, setOrderListUser] = OrderListUserApi(user?.email);
    let navigate = useNavigate();
    return (
        <div>
            <h2>Order List</h2>

            <div className="container-fluid">
                {
                    orderListUser.map(order => {
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

        </div>
    )
}

export default UserDashBoard