import React from 'react'
import Countdown from 'react-countdown';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import TableInfoApi from '../../../Hooks/TableInfoApi';


const TableTrackingEdit = () => {
    const location = useLocation();
    const { restaurantID } = location.state;

    const [TableInformation, setTableInformation] = TableInfoApi(restaurantID)



    const handleAbility = (tableID, ability) => {

        let i = 0; let j = 0;
        let foundTableIndex = 0;
        let foundTableInfoIndex = 0;
        let flag = 0;

        TableInformation.Tables.map(tableRow => {
            j = 0;
            tableRow.TableInfo.map(tableinfos => {

                //console.log(tableinfos.TableID)
                if (tableinfos.TableID === tableID) {

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

        let qryName = `Tables.${foundTableIndex}.TableInfo.${foundTableInfoIndex}.Availity`;

        fetch(`http://localhost:7000/alltables/${restaurantID}/${qryName}/${ability}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire('Table updated')

                }
            })
    }

    if (TableInformation?.length === 0) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='container'>

            <div className="container">

                <div className='text-center my-3'>
                    <button className='btn Available mx-3'>Available</button>
                    <button className='btn Booked mx-3'>Booked</button>
                    <button className='btn Disable mx-3'>Disable</button>
                </div>


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


                                            <div className='d-flex flex-column align-items-center justify-content-center '>
                                                <button className={`btn Person${tableinfos.Person}btn ${tableinfos.Availity}`}>{tableinfos.TableID} ({tableinfos.Person}P)</button>

                                                {/* <span className='text-center'>{tableinfos?.BookedDate}</span> */}

                                                {
                                                    tableinfos.Availity === "Booked" ?
                                                        <Countdown date={(parseFloat(tableinfos.BookedDate))}
                                                            renderer={({ hours, minutes, seconds }) => { return <span>{hours}h {minutes}m {seconds}s</span>; }}
                                                        /> : ""

                                                }
                                                <div>
                                                    <button onClick={() => handleAbility(tableinfos.TableID, "Available")} className='btn Available p-0 px-2 mx-2'>A</button>
                                                    <button onClick={() => handleAbility(tableinfos.TableID, "Disable")} className='btn Disable  p-0 px-2 mx-2'>D</button>
                                                </div>




                                            </div>



                                        </div>


                                    )
                                }



                            </div>






                        )

                    }

                </div>
            </div >


        </div>
    )
}

export default TableTrackingEdit