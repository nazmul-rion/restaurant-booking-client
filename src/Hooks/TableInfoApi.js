import { useEffect } from "react";
import { useState } from "react";

const TableInfoApi = (restaurentID) => {

    const [TableInformation, setTableInformation] = useState([]);
    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:7000/alltables/${restaurentID}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setTableInformation(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [TableInformation, restaurentID]);

    return [TableInformation, setTableInformation];
}

export default TableInfoApi;