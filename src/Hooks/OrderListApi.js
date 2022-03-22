import { useEffect } from "react";
import { useState } from "react";

const OrderListApi = (restaurentID, foodCategory) => {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:7000/allorders/${restaurentID}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setOrderList(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [orderList, restaurentID]);

    return [orderList, setOrderList];
}

export default OrderListApi;