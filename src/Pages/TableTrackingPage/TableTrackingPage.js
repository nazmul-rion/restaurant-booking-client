import React, { useState } from 'react'
import './TableTrackingPage.css'
import useCart from '../../Context/CartManagement/useCart';
import TableInfoApi from '../../Hooks/TableInfoApi';
import { useNavigate } from 'react-router-dom';

const TableTrackingPage = () => {

    const { cartState, cartDispatch } = useCart();

    let navigate = useNavigate()

    const [TableInformation, setTableInformation] = TableInfoApi(cartState.restaurentID)

    if (TableInformation.length === 0) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <section>

            <div className="container">

                <div className='text-center my-3'>
                    <button className='btn Available mx-3'>Available</button>
                    <button disabled className='btn Booked mx-3'>Booked</button>
                    <button className='btn SelectedTable mx-3'>Selected</button>
                    <button disabled className='btn Disable mx-3'>Disable</button>
                </div>

                <button onClick={() => navigate("/tablebooking")} className='btn btn-warning my-3'>&lt;-- Back To Cart</button>

                <div className=" table-container my-3">

                    <div className="d-flex justify-content-evenly align-items-center">
                        <button className='btn cashtable'>Cash</button>
                        <button className='btn kitchentable'>Kitchen</button>
                        <button className='btn washroom'>Wash Room</button>
                    </div>

                    {
                        TableInformation.Tables.map(tableRow =>

                            <div key={tableRow.TableInfo} className={`mb-5 d-flex justify-content-${tableRow.alignment}`
                            }>


                                {
                                    tableRow.TableInfo.map(tableinfos =>


                                        <div key={tableinfos.TableID} className="">

                                            {tableinfos.Availity === "Available" ?
                                                (<button onClick={() => {

                                                    cartDispatch({
                                                        type: 'ADD_TABLE_TO_CART',
                                                        selectedTable: tableinfos.TableID
                                                    });
                                                }} className={cartState.selectedTable === tableinfos.TableID ? `btn SelectedTable Person${tableinfos.Person}btn ${tableinfos.Availity}` : `btn  Person${tableinfos.Person}btn ${tableinfos.Availity}`}>{tableinfos.TableID} ({tableinfos.Person}P)</button>
                                                )
                                                :
                                                (
                                                    <button disabled onClick={() => {

                                                        cartDispatch({
                                                            type: 'ADD_TABLE_TO_CART',
                                                            selectedTable: tableinfos.TableID
                                                        });
                                                    }} className={`btn Person${tableinfos.Person}btn ${tableinfos.Availity}`}>{tableinfos.TableID} ({tableinfos.Person}P)</button>
                                                )
                                            }


                                        </div>


                                    )
                                }



                            </div>






                        )

                    }

                </div>
            </div >


        </section >
    )
}

export default TableTrackingPage