import "./AddProduct.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk } from "../../redux/slices/productSlice";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("Electronics");
  const [productImage1, setProductImage1] = useState(null);
  const [productImage2, setProductImage2] = useState(null);
  const [productImage3, setProductImage3] = useState(null);

  const { isLoading, validationError } = useSelector((state) => state.product);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!isAuthenticated || user.role !== "admin")
    return <Navigate to="/" replace />;

  function createProduct(e) {
    e.preventDefault();

    dispatch(
      createProductThunk({
        name,
        description,
        price,
        stock,
        category,
        productImage1,
        productImage2,
        productImage3,
      })
    );
  }

  return (
    <div className="addProduct">
      <div className="addProduct__formContainer">
        <h3 className="addProduct__formHeading">Add Product</h3>
        <form className="addProduct__form" onSubmit={(e) => createProduct(e)}>
          <div className="addProduct__formField">
            <label htmlFor="productName" className="addProduct__formLabel">
              Name
            </label>
            <input
              type="text"
              id="productName"
              className="addProduct__formInput"
              placeholder="e.g:- PS5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="addProduct__formError">
              {validationError?.name}
            </span>
          </div>

          <div className="addProduct__formField">
            <label
              htmlFor="productDescription"
              className="addProduct__formlabel"
            >
              Description
            </label>
            <textarea
              id="productDescription"
              className="addProduct__formInput"
              placeholder="e.g:- Get ready to have gaming experience like never before"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <span className="addProduct__formError">
              {validationError?.description}
            </span>
          </div>

          <div className="addProduct__formField">
            <label htmlFor="productPrice" className="addProduct__formlabel">
              Price
            </label>
            <input
              type="number"
              id="productPrice"
              className="addProduct__formInput"
              placeholder="e.g:- &#8377; 43000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="addProduct__formError">
              {validationError?.price}
            </span>
          </div>

          <div className="addProduct__formField">
            <label htmlFor="productStock" className="addProduct__formlabel">
              Stock
            </label>
            <input
              type="number"
              id="productStock"
              className="addProduct__formInput"
              placeholder="e.g:- 15"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <span className="addProduct__formError">
              {validationError?.stock}
            </span>
          </div>

          <div className="addProduct__formField">
            <label htmlFor="productCategory" className="addProduct__formlabel">
              Category
            </label>
            <select
              id="productCategory"
              className="addProduct__formInput"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Electronics">Electronics</option>
              <option value="Footwear">Footwear</option>
              <option value="Glasses">Glasses</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Jeans">Jeans</option>
            </select>
            <span className="addProduct__formError">
              {validationError?.category}
            </span>
          </div>

          <div className="addProduct__formField">
            <label htmlFor="productImage1" className="addProduct__formlabel">
              Product Image 1
            </label>

            <div className="addProduct__productImage">
              {productImage1 == null ? (
                <FaBox className="addProduct__productImagePreview" />
              ) : (
                <img
                  className="addProduct__productImagePreview"
                  src={URL.createObjectURL(productImage1)}
                  alt="product"
                />
              )}

              <input
                className="addProduct__formInput addProduct__productImageInput"
                type="file"
                id="productImage1"
                onChange={(e) => setProductImage1(e.target.files[0])}
              />
            </div>
            <span className="addProduct__formError">
              {validationError?.productImages}
            </span>
          </div>

          <div className="addProduct__formField">
            <label htmlFor="productImage2" className="addProduct__formlabel">
              Product Image 2
            </label>
            <div className="addProduct__productImage">
              {productImage2 == null ? (
                <FaBox className="addProduct__productImagePreview" />
              ) : (
                <img
                  className="addProduct__productImagePreview"
                  src={URL.createObjectURL(productImage2)}
                  alt="product"
                />
              )}

              <input
                className="addProduct__formInput addProduct__productImageInput"
                type="file"
                id="productImage2"
                onChange={(e) => setProductImage2(e.target.files[0])}
              />
            </div>
            <span className="addProduct__formError">
              {validationError?.productImages}
            </span>
          </div>

          <div className="addProduct__formField">
            <label htmlFor="productImage3" className="addProduct__formlabel">
              Product Image 3
            </label>
            <div className="addProduct__productImage">
              {productImage3 == null ? (
                <FaBox className="addProduct__productImagePreview" />
              ) : (
                <img
                  className="addProduct__productImagePreview"
                  src={URL.createObjectURL(productImage3)}
                  alt="product"
                />
              )}

              <input
                className="addProduct__formInput addProduct__productImageInput"
                type="file"
                id="productImage3"
                onChange={(e) => setProductImage3(e.target.files[0])}
              />
            </div>
            <span className="addProduct__formError">
              {validationError?.productImages}
            </span>
          </div>

          <button
            className="addProduct__formButton"
            type="submit"
            disabled={isLoading}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
