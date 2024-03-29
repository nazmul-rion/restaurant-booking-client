import { useEffect } from "react";
import { useState } from "react";

const RestaurantListApi = (qry) => {
    const [restaurantList, setRestaurantList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`https://restaurant-booking-server.onrender.com/allrestaurants?searchInput=${qry.searchInput}&&searchCity=${qry.searchCity}&&searchZone=${qry.searchZone}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setRestaurantList(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [restaurantList, qry]);

    return [restaurantList, setRestaurantList];
}

export default RestaurantListApi;