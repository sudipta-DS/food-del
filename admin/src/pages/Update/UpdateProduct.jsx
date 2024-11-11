import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", Number(data.price));
      formData.append("image", image);

      console.log(data);

      const res = await axios.put(`${url}/api/food/edit/${id}`, formData);
      if (res.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(res.data.message);
        navigate("/list");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("something error happened.");
    }
  };

  useEffect(() => {
    axios
      .get(`${url}/api/food/singleFood/${id}`)
      .then((res) => setData(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="add">
      <form onSubmit={(e) => onSubmitHandler(e)} action="" className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            name="image"
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={(e) => onChangeHandler(e)}
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={(e) => onChangeHandler(e)}
            name="description"
            rows="6"
            placeholder="Write content here"
            value={data.description}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={(e) => onChangeHandler(e)} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={(e) => onChangeHandler(e)}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
