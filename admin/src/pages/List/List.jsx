import "./List.css";
import axios from "axios";
import { url } from "../../assets/assets";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const removeFood = async (foodId) => {
    const res = await axios.post(`${url}/api/food/remove`, { id: foodId });
    if (res.data.success) {
      fetchList();
      toast.success(res.data.message);
    } else {
      toast.error("item not removed.");
    }
  };

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  function editPage(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div
              onClick={() => editPage(item._id)}
              key={index}
              className="list-table-format"
            >
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
