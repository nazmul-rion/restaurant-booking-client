import React from 'react'
import { useParams } from 'react-router-dom'
import SingleOrderDetailsApi from '../../../Hooks/SingleOrderDetailsApi';

const SingleOrderDetails = () => {
    const { orderID } = useParams();
    const [singleOrder, setSingleOrder] = SingleOrderDetailsApi(orderID);
    return (
        <div>
            {orderID}
            {singleOrder.CustomerName}

        </div>
    )
}

export default SingleOrderDetails