import { useEffect } from "react";
import { useState } from "react";

const RestaurantListApi = () => {
    const [restaurantList, setRestaurantList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`./FakeData/RestaurantList.json`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setRestaurantList(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [restaurantList]);

    return [restaurantList, setRestaurantList];
}

export default RestaurantListApi;