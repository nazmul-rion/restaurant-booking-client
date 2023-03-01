import { useEffect } from "react";
import { useState } from "react";

const SingleRestaurantApi = (id) => {
    const [Singlerestaurant, setSingleRestaurant] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`https://restaurant-booking-server.onrender.com/allrestaurants/${id}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setSingleRestaurant(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [Singlerestaurant, id]);

    return [Singlerestaurant, setSingleRestaurant];
}

export default SingleRestaurantApi;