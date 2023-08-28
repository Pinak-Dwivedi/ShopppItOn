import "./UpdateProduct.css";
import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductThunk } from "../../redux/slices/productSlice";

export default function UpdateProduct() {
  const { state } = useLocation();
  const productDetails = state?.productDetails;

  let productId,
    productName,
    productDescription,
    productPrice,
    productStock,
    productCategory,
    productImages,
    pImages = [];

  if (productDetails != null) {
    productId = productDetails.productId;
    productName = productDetails.productName;
    productDescription = productDetails.productDescription;
    productPrice = productDetails.productPrice;
    productStock = productDetails.productStock;
    productCategory = productDetails.productCategory;
    productImages = productDetails.productImages;
    pImages = JSON.parse(productImages);
  }

  const [name, setName] = useState(productName);
  const [description, setDescription] = useState(productDescription);
  const [price, setPrice] = useState(productPrice);
  const [stock, setStock] = useState(productStock);
  const [category, setCategory] = useState(productCategory);
  const [productImage1, setProductImage1] = useState(null);
  const [productImage2, setProductImage2] = useState(null);
  const [productImage3, setProductImage3] = useState(null);

  const { isLoading, validationError } = useSelector((state) => state.product);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!isAuthenticated || user.role !== "admin")
    return <Navigate to="/" replace />;

  function updateProduct(e) {
    e.preventDefault();

    dispatch(
      updateProductThunk({
        id: productId,
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
    <div className="updateProduct">
      <div className="updateProduct__formContainer">
        <h3 className="updateProduct__formHeading">Update Product</h3>
        <form
          className="updateProduct__form"
          onSubmit={(e) => updateProduct(e)}
        >
          <div className="updateProduct__formField">
            <label htmlFor="productName" className="updateProduct__formLabel">
              Name
            </label>
            <input
              type="text"
              id="productName"
              className="updateProduct__formInput"
              placeholder="e.g:- PS5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="updateProduct__formError">
              {validationError?.name}
            </span>
          </div>

          <div className="updateProduct__formField">
            <label
              htmlFor="productDescription"
              className="updateProduct__formLabel"
            >
              Description
            </label>
            <textarea
              id="productDescription"
              className="updateProduct__formInput"
              placeholder="e.g:- Get ready to have gaming experience like never before"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <span className="updateProduct__formError">
              {validationError?.description}
            </span>
          </div>

          <div className="updateProduct__formField">
            <label htmlFor="productPrice" className="updateProduct__formLabel">
              Price
            </label>
            <input
              type="number"
              id="productPrice"
              className="updateProduct__formInput"
              placeholder="e.g:- &#8377; 43000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="updateProduct__formError">
              {validationError?.price}
            </span>
          </div>

          <div className="updateProduct__formField">
            <label htmlFor="productStock" className="updateProduct__formLabel">
              Stock
            </label>
            <input
              type="number"
              id="productStock"
              className="updateProduct__formInput"
              placeholder="e.g:- 15"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <span className="updateProduct__formError">
              {validationError?.stock}
            </span>
          </div>

          <div className="updateProduct__formField">
            <label
              htmlFor="productCategory"
              className="updateProduct__formLabel"
            >
              Category
            </label>
            <select
              id="productCategory"
              className="updateProduct__formInput"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Electronics">Electronics</option>
              <option value="Footwear">Footwear</option>
              <option value="Glasses">Glasses</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Jeans">Jeans</option>
            </select>
            <span className="updateProduct__formError">
              {validationError?.category}
            </span>
          </div>

          <div className="updateProduct__imageNote">
            Note - Either upload all images or none
          </div>
          <div className="updateProduct__formField">
            <label htmlFor="productImage1" className="updateProduct__formLabel">
              Product Image 1
            </label>

            <div className="updateProduct__productImage">
              {productImage1 == null ? (
                <img
                  className="updateProduct__productImagePreview"
                  src={pImages[0]}
                  alt="product"
                />
              ) : (
                <img
                  className="updateProduct__productImagePreview"
                  src={URL.createObjectURL(productImage1)}
                  alt="product"
                />
              )}

              <input
                className="updateProduct__formInput updateProduct__productImageInput"
                type="file"
                id="productImage1"
                onChange={(e) => setProductImage1(e.target.files[0])}
              />
            </div>
            <span className="updateProduct__formError">
              {validationError?.productImages}
            </span>
          </div>

          <div className="updateProduct__formField">
            <label htmlFor="productImage2" className="updateProduct__formLabel">
              Product Image 2
            </label>
            <div className="updateProduct__productImage">
              {productImage2 == null ? (
                <img
                  className="updateProduct__productImagePreview"
                  src={pImages[1]}
                  alt="product"
                />
              ) : (
                <img
                  className="updateProduct__productImagePreview"
                  src={URL.createObjectURL(productImage2)}
                  alt="product"
                />
              )}

              <input
                className="updateProduct__formInput updateProduct__productImageInput"
                type="file"
                id="productImage2"
                onChange={(e) => setProductImage2(e.target.files[0])}
              />
            </div>
            <span className="updateProduct__formError">
              {validationError?.productImages}
            </span>
          </div>

          <div className="updateProduct__formField">
            <label htmlFor="productImage3" className="updateProduct__formlabel">
              Product Image 3
            </label>
            <div className="updateProduct__productImage">
              {productImage3 == null ? (
                <img
                  className="updateProduct__productImagePreview"
                  src={pImages[2]}
                  alt="product"
                />
              ) : (
                <img
                  className="updateProduct__productImagePreview"
                  src={URL.createObjectURL(productImage3)}
                  alt="product"
                />
              )}

              <input
                className="updateProduct__formInput updateProduct__productImageInput"
                type="file"
                id="productImage3"
                onChange={(e) => setProductImage3(e.target.files[0])}
              />
            </div>
            <span className="updateProduct__formError">
              {validationError?.productImages}
            </span>
          </div>

          <button
            className="updateProduct__formButton"
            type="submit"
            disabled={isLoading}
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
