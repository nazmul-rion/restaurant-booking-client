import { useEffect } from "react";
import { useState } from "react";

const FoodListApi = (restaurentID, foodCategory) => {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`https://restaurant-booking-server.onrender.com/allfoods/${restaurentID}/${foodCategory}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setFoodList(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [foodList, foodCategory, restaurentID]);

    return [foodList, setFoodList];
}

export default FoodListApi;