import { useEffect } from "react";
import { useState } from "react";

const OrderListApi = (restaurentID, foodCategory) => {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`https://restaurant-booking-server.onrender.com/allorders/${restaurentID}`)
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