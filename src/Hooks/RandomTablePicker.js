import { useEffect } from "react";
import { useState } from "react";

const RandomTablePicker = (restaurentID) => {

    const [RandomTables, setRandomTables] = useState([]);
    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:7000/alltables/checkability/${restaurentID}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setRandomTables(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [RandomTables, restaurentID]);

    return [RandomTables, setRandomTables];
}

export default RandomTablePicker;