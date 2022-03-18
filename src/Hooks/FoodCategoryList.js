import { useEffect } from "react";
import { useState } from "react";

const FoodCategoryList = (restaurentID) => {

    const [foodCategoryList, setFoodCategoryList] = useState([]);
    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:7000/allfoodcategories/${restaurentID}`)
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