import "./FoodDisplay.css";
import { StoreContext } from "../../Contexts/StoreContext";
import { useContext } from "react";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  console.log(foodList);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((item, index) => {
          if (category === "All" || category === item.category)
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
              />
            );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
