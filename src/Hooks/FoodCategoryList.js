import { useEffect } from "react";
import { useState } from "react";

const FoodCategoryList = (restaurentID) => {

    const [foodCategoryList, setFoodCategoryList] = useState([]);
    useEffect(() => {
        let isMounted = true;
        fetch(`https://restaurant-booking-server.onrender.com/allfoodcategories/${restaurentID}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setFoodCategoryList(data);
                }
            });
        return () => {
            isMounted = false;
        };

    }, [foodCategoryList, restaurentID]);

    return [foodCategoryList, setFoodCategoryList];
}

export default FoodCategoryList;