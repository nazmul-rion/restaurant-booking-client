import React from 'react'
import useCart from '../../Context/CartManagement/useCart';

const TableTrackingPage = () => {

    const { cartState, cartDispatch } = useCart();

    return (
        <section>

            <div className="container">

                <div className=" table-container ">


                    <div className="d-flex justify-content-between  align-items-center">

                        <div className="d-flex flex-column ">
                            <div className="d-flex justify-content-evenly align-items-center">
                                <button className='btn cashtable'>Cash</button>
                                <button className='btn kitchentable'>Kitchen</button>
                                <button className='btn washroom'>Wash Room</button>
                            </div>


                            <div className='my-5  d-flex justify-content-evenly align-items-center'>

                                <div className="d-flex flex-column">
                                    <button onClick={() => {

                                        cartDispatch({
                                            type: 'ADD_TABLE_TO_CART',
                                            tableID: "tableID",
                                            tableName: "tableName"
                                        });
                                    }} className='btn twoPersionbtn'>T1 (2P)</button>
                                    <button onClick={() => {
                                        cartDispatch({
                                            type: 'ADD_TABLE_TO_CART',
                                            tableID: "tableID",
                                            tableName: "tableName"
                                        });
                                    }} className='btn twoPersionbtn'>T2 (2P)</button>
                                </div>

                                <div className="d-flex flex-column">
                                    <button onClick={() => {
                                        cartDispatch({
                                            type: 'ADD_TABLE_TO_CART',
                                            tableID: "tableID",
                                            tableName: "tableName"
                                        });
                                    }} className='btn eightPersionbtn'>T3 (8P)</button>
                                    <button onClick={() => {
                                        cartDispatch({
                                            type: 'ADD_TABLE_TO_CART',
                                            tableID: "tableID",
                                            tableName: "tableName"
                                        });
                                    }} className='btn eightPersionbtn'>T4 (8P)</button>
                                </div>

                                <div className="d-flex flex-column">
                                    <button onClick={() => {
                                        cartDispatch({
                                            type: 'ADD_TABLE_TO_CART',
                                            tableID: "tableID",
                                            tableName: "tableName"
                                        });
                                    }} className='btn twoPersionbtn'>T5 2P</button>
                                    <button onClick={() => {
                                        cartDispatch({
                                            type: 'ADD_TABLE_TO_CART',
                                            tableID: "tableID",
                                            tableName: "tableName"
                                        });
                                    }} className='btn twoPersionbtn'>T6 2P</button>
                                </div>

                            </div>


                            <div className='my-5  d-flex justify-content-evenly align-items-center'>

                                <button onClick={() => {
                                    cartDispatch({
                                        type: 'ADD_TABLE_TO_CART',
                                        tableID: "tableID",
                                        tableName: "tableName"
                                    });
                                }} className='btn sixPersionbtn'>T7 (6P)</button>
                                <button onClick={() => {
                                    cartDispatch({
                                        type: 'ADD_TABLE_TO_CART',
                                        tableID: "tableID",
                                        tableName: "tableName"
                                    });
                                }} className='btn sixPersionbtn'>T8 (6P)</button>
                                <button onClick={() => {
                                    cartDispatch({
                                        type: 'ADD_TABLE_TO_CART',
                                        tableID: "tableID",
                                        tableName: "tableName"
                                    });
                                }} className='btn sixPersionbtn'>T9 (6P)</button>
                                <button onClick={() => {
                                    cartDispatch({
                                        type: 'ADD_TABLE_TO_CART',
                                        tableID: "tableID",
                                        tableName: "tableName"
                                    });
                                }} className='btn sixPersionbtn'>T10 (6P)</button>
                                <button onClick={() => {
                                    cartDispatch({
                                        type: 'ADD_TABLE_TO_CART',
                                        tableID: "tableID",
                                        tableName: "tableName"
                                    });
                                }} className='btn sixPersionbtn'>T11 (6P)</button>

                            </div>

                        </div>


                        <div className='d-flex flex-column'>
                            <button onClick={() => {
                                cartDispatch({
                                    type: 'ADD_TABLE_TO_CART',
                                    tableID: "tableID",
                                    tableName: "tableName"
                                });
                            }} className='btn fourPersionbtn'>T12 (4P)</button>
                            <button onClick={() => {
                                cartDispatch({
                                    type: 'ADD_TABLE_TO_CART',
                                    tableID: "tableID",
                                    tableName: "tableName"
                                });
                            }} className='btn fourPersionbtn'>T13 (4P)</button>
                            <button onClick={() => {
                                cartDispatch({
                                    type: 'ADD_TABLE_TO_CART',
                                    tableID: "tableID",
                                    tableName: "tableName"
                                });
                            }} className='btn fourPersionbtn'>T14 (4P)</button>
                        </div>



                    </div>

                </div>

            </div >




        </section >
    )
}

export default TableTrackingPage