import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import TableInfoApi from '../../../Hooks/TableInfoApi';
import uploadIcon from '../../../Assets/icons/upload.svg'
import downloadIcon from '../../../Assets/icons/download.svg'
import Swal from 'sweetalert2';

const TableInfoEdit = () => {

    const location = useLocation();
    const { restaurantID } = location.state;

    const [TableInformation, setTableInformation] = TableInfoApi(restaurantID);
    const [row, setRow] = useState(0);

    const [tablelist, setTableList] = useState([]);

    const handleUploadTableDesign = () => {

        fetch(`http://localhost:7000/addtablelayout/${restaurantID}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tablelist)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire('Table Layout updated')

                }
            })
    }

    const handleCol = (col, table) => {

        let intcol = parseInt(col)
        table.col = intcol;
        for (let i = 0; i < intcol; i++) {

            table.TableInfo[i] = {
                TableID: "T",
                Person: 0,
                Availity: "Available",
                BookedDate: ""
            }
        }
        table.TableInfo.length = intcol;
    }

    const handleAlgn = (alg, table) => {
        table.alignment = alg;
    }

    const handleTableID = (tableid, tabinfo) => {

        let newtablelist = [...tablelist];
        tabinfo.TableID = tableid;
        setTableList(newtablelist);


    }

    const handleTablePerson = (person, tabinfo) => {
        let newtablelist = [...tablelist];
        tabinfo.Person = person;
        setTableList(newtablelist);
    }


    return (
        <div className='container-fluid'>
            <h6>Table Row: <button onClick={() => {
                setRow(row - 1);
                tablelist.length = row - 1;

            }} className='btn btn-danger p-0 px-3'>
                -
            </button>

                <span className='px-3'>{row}</span>


                <button onClick={() => {

                    setRow(row + 1);
                    tablelist.push({
                        col: 1, alignment: "", TableInfo: [
                            {
                                TableID: "T",
                                Person: 0,
                                Availity: "Available",
                                BookedDate: ""
                            }]
                    });
                }} className='btn btn-success p-0 px-3'>+</button>


                {
                    TableInformation.Tables ? <img className='img-fluid mx-3' onClick={() => {
                        setTableList(TableInformation.Tables);
                        setRow(TableInformation.Tables.length);
                    }} width={40} src={downloadIcon} alt="" /> : <></>
                }

                {
                    tablelist ? <img className='img-fluid mx-3' onClick={handleUploadTableDesign} width={40} src={uploadIcon} alt="" /> : <></>
                }
            </h6>

            {
                tablelist.map((table, index1) => {
                    return (
                        <div key={index1}>
                            <div className='my-3 mb-4'>
                                <label className='py-1 px-2 ' >Col</label>
                                <input onChange={(e) => handleCol(e.target.value, table)} className='py-1 px-2 me-3' type="number"
                                    value={table.col} />
                                <label className='py-1 px-2' >Alignment</label>
                                <select onChange={(e) => handleAlgn(e.target.value, table)} className='py-1 px-2 me-3' type="text">
                                    <option value="evenly">Evenly</option>
                                    <option value="between">Between</option>
                                    <option value="around">Around</option>
                                    <option value="center">Center</option>
                                </select>
                            </div>

                            <div className={` mb-5 d-flex justify-content-${table.alignment}`}>

                                {
                                    table.TableInfo.map((tabinfo, index2) => {

                                        return (
                                            <div key={index2} className='mx-2 border p-2 border-dark'>
                                                <input onChange={(e) => handleTableID(e.target.value, tabinfo)} className='my-2 py-1 ' type="text" placeholder='Table ID' value={tabinfo.TableID} />
                                                <br />
                                                <input onChange={(e) => handleTablePerson(e.target.value, tabinfo)} className='my-2 py-1 ' type="text" placeholder='Person Capacity' value={tabinfo.Person} />
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>
                    )
                })
            }




        </div >
    )
}

export default TableInfoEdit