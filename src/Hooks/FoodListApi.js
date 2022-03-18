import { useEffect } from "react";
import { useState } from "react";

const FoodListApi = (restaurentID, foodCategory) => {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:7000/allfoods/${restaurentID}/${foodCategory}`)
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