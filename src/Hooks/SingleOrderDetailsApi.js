import { useEffect } from "react";
import { useState } from "react";

const SingleOrderDetailsApi = (orderID) => {
    const [singleOrder, setSingleOrder] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:7000/singleorder/${orderID}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setSingleOrder(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [singleOrder, orderID]);

    return [singleOrder, setSingleOrder];
}

export default SingleOrderDetailsApi;