import React, { useEffect, useState } from 'react'
import useCart from '../../Context/CartManagement/useCart';
import trushIcon from '../../Assets/icons/trashIcon.svg'
import addIcon from '../../Assets/icons/itemAddIcon.svg'
import minusIcon from '../../Assets/icons/itemMinusIcon.svg'
import { useNavigate } from 'react-router-dom';
import RandomTablePicker from '../../Hooks/RandomTablePicker';
import BkashButton from 'react-bkash';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import TableInfoApi from '../../Hooks/TableInfoApi';

const TableBookingPage = () => {

    const { cartState, cartDispatch } = useCart();
    const [TableInformation, setTableInformation] = TableInfoApi(cartState.restaurentID);
    const { user } = useAuth();

    let navigate = useNavigate();

    const [TotalItemCost, setTotalItemCost] = useState(0);

    useEffect(() => {

        const total = cartState.cartList.map(item => item.ItemToalPrice).reduce((prev, curr) => prev + curr, 0);

        setTotalItemCost(total)
    }, [cartState])

    const [RandomTables, setRandomTables] = RandomTablePicker(cartState.restaurentID)

    const handleRandomTable = () => {

        const random = RandomTables[Math.floor(Math.random() * RandomTables.length)];

        cartDispatch({
            type: 'ADD_TABLE_TO_CART',
            selectedTable: random
        });

    }

    const handlePayment = () => {

        let order = {
            CustomerName: user.displayName,
            CustomerEmail: user.email,
            OrderTable: cartState.selectedTable,
            OrderDate: Date.now(),
            RestaurantID: cartState.restaurentID,
            OrderedFood: cartState.cartList
        };

        console.log(order)

        Swal.fire({
            title: 'Are you sure you want to order this Foods?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post('http://localhost:7000/addorder', order)
                        .then(res => {
                            if (res.data.insertedId) {

                                Swal.fire({
                                    title: "Wow",
                                    text: "Order placed",
                                    icon: "success",

                                });

                            }
                            else {
                                Swal.fire("Sorry!", "Some Error occure", "error");
                            }
                        });

                    let i = 0; let j = 0;
                    let foundTableIndex = 0;
                    let foundTableInfoIndex = 0;
                    let flag = 0;



                    TableInformation.Tables.map(tableRow => {
                        j = 0;
                        tableRow.TableInfo.map(tableinfos => {

                            //console.log(tableinfos.TableID)
                            if (tableinfos.TableID === order.OrderTable) {

                                foundTableInfoIndex = j;
                                flag = 1;
                            }
                            else j++;
                        })

                        if (flag === 1)
                            foundTableIndex = i;
                        i++;
                        flag = 0;
                    })

                    let q1 = `Tables.${foundTableIndex}.TableInfo.${foundTableInfoIndex}.Availity`;
                    let q2 = `Tables.${foundTableIndex}.TableInfo.${foundTableInfoIndex}.BookedDate`;

                    fetch(`http://localhost:7000/tablebooking/${order.RestaurantID}/${(order.OrderDate + 3600000)}/${q1}/${q2}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },

                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.modifiedCount) {
                                Swal.fire('Done')

                            }
                        })




                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });




    }



    return (
        <section className='container'>

            {
                cartState.cartList.length != 0 ? (
                    <>
                        <div className="table-responsive my-5">
                            <table className="table table-hover table-borderless ">
                                <thead>
                                    <tr>

                                        <th scope="col">Name</th>
                                        <th className="text-center" scope="col">Quantity</th>
                                        <th className="text-center" scope="col">Price</th>
                                        <th className="text-center" scope="col">Total Price</th>
                                        <th className="text-center" scope="col">Clear Item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartState.cartList.map(cart => {

                                            return (
                                                <tr key={cart.itemId}>

                                                    <td scope="">
                                                        {cart.itemName}
                                                    </td>

                                                    <td className="text-center" >
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img width='20' className='img-fluid' src={minusIcon} alt="-"
                                                                onClick={() => {
                                                                    cartDispatch({
                                                                        type: 'DECREASE_QUANTITY',
                                                                        itemId: cart.itemId
                                                                    });
                                                                }}
                                                            />

                                                            <span className='px-3'>{cart.quantity} </span>

                                                            <img width='20' className='img-fluid' src={addIcon} alt="+"
                                                                onClick={() => cartDispatch({
                                                                    type: 'ADD_TO_CART',

                                                                    item: {
                                                                        itemId: cart.itemId,
                                                                        itemName: cart.itemName,
                                                                        itemPrice: cart.itemPrice,
                                                                    },
                                                                    restaurentID: cartState.restaurentID
                                                                })}
                                                            />
                                                        </div>

                                                    </td>

                                                    <td className="text-center text-success" >
                                                        ৳{cart.itemPrice.toFixed(2)}
                                                    </td>

                                                    <td className="text-center text-success" >
                                                        ৳{cart.ItemToalPrice.toFixed(2)}
                                                    </td>

                                                    <td className="text-center" >
                                                        <img width='20' className='img-fluid' src={trushIcon} alt=""
                                                            onClick={() => {
                                                                cartDispatch({
                                                                    type: 'REMOVE_FROM_CART',
                                                                    itemId: cart.itemId
                                                                });
                                                            }}
                                                        />
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                                <tfoot className='border-top border-info '>

                                    <tr>
                                        <th scope="col">Total Cost</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th className=' text-success text-center' scope="col">৳{TotalItemCost.toFixed(2)}</th>
                                    </tr>

                                </tfoot>

                            </table>
                        </div>


                        {/* 2nd Part */}

                        <div className="d-flex flex-wrap align-items-center">
                            <span><b>Select Table From</b> </span>
                            <button onClick={() => navigate(`/tabletracking/${cartState.restaurentID}`)} className='btn btn-secondary mx-3'><span className=' fw-bold blinker '>Live</span> Table Tracking</button>
                            <span><b>OR</b></span>
                            <button
                                onClick={handleRandomTable}
                                className='btn btn-secondary mx-3'>Any Random Table</button>
                        </div>

                        <div className='my-4'>
                            <span><b>Selected Table:</b> <label className='px-5 py-1 text-light rounded bg-secondary'>{cartState.selectedTable}</label> </span>
                        </div>

                        <div className=' border border-info' />


                        {/* 3rd Part */}

                        <div className='my-5'>
                            <h5>Pay <span className='blinker'>20%</span> of Total : <span className='text-success'>৳{(TotalItemCost * .20).toFixed(2)}</span></h5>

                            <div className='my-4'>
                                <h5>Payment Option:
                                    <button onClick={handlePayment} className="btn bkashbtn mx-3">Bkash</button>
                                    <button onClick={handlePayment} className="btn nagadbtn mx-3">Nagad</button>

                                </h5>
                            </div>
                        </div>
                    </>

                )
                    :
                    (
                        <h3 className='text-danger text-center my-5'>Your Cart is Empty!!!</h3>
                    )
            }




        </section >
    )
}

export default TableBookingPage