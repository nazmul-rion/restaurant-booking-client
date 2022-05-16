import React from 'react'
import Countdown from 'react-countdown';
import { useParams } from 'react-router-dom'
import SingleOrderDetailsApi from '../../../Hooks/SingleOrderDetailsApi';

const SingleOrderDetails = () => {
    const { orderID } = useParams();
    const [singleOrder, setSingleOrder] = SingleOrderDetailsApi(orderID);
    return (
        <div className='container'>
            <h5 className='mt-3'><b>Customer Name:</b> {singleOrder.CustomerName}</h5>
            <h5 className='mt-3'><b>Booked Table:</b> {singleOrder.OrderTable}</h5>
            <h5 className='mt-3'><b>Order Date: </b> {(new Date(singleOrder.OrderDate)).toString()}</h5>
            <h5 className='mt-3'><b>Time Left:</b>
                {
                    singleOrder.OrderDate && <Countdown date={singleOrder.OrderDate + 3600000}
                        renderer={({ hours, minutes, seconds }) => { return <span>{hours}h {minutes}m {seconds}s</span>; }}
                    />
                }

            </h5>

            <table className='table table-striped my-3'>
                <thead>
                    <tr className=''>
                        <th >Name</th>
                        <th className=' text-center'>Price</th>
                        <th className=' text-center'>Quantity</th>
                        <th className=' text-center'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        singleOrder.OrderedFood?.map(item => {
                            return (
                                <tr key={item.itemId} >
                                    <td >{item.itemName}</td>
                                    <td className=' text-center'>{item.itemPrice}</td>
                                    <td className=' text-center'>{item.quantity}</td>
                                    <td className=' text-center'>{item.ItemToalPrice}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>
        </div >
    )
}

export default SingleOrderDetails