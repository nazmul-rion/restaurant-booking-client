import { useEffect } from "react";
import { useState } from "react";

const OrderListUserApi = (userEmail) => {
    const [orderListUser, setOrderListUser] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`https://restaurant-booking-server.onrender.com/alluserorders/${userEmail}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setOrderListUser(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [orderListUser, userEmail]);

    return [orderListUser, setOrderListUser];
}

export default OrderListUserApi;