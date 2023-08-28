import "./CategoryProduct.css";
import { useNavigate } from "react-router-dom";
import formatNumberAsPrice from "../../../utils/formatNumberAsPrice";

export default function CategoryProduct({ productInfo }) {
  const navigate = useNavigate();

  const { productId, productName, productImages } = productInfo;
  const productImage = JSON.parse(productImages)[0];

  function gotoProductPage() {
    navigate(`/product/${productName.split(" ").join("-")}`, {
      state: { productId },
    });
  }

  let productPrice = productInfo?.productPrice;

  return (
    <div className="category__product" onClick={gotoProductPage}>
      <div className="category__productImageBox">
        <img
          className="category__productImage"
          src={productImage}
          alt="computerImage"
        />
      </div>

      <div className="category__productInfo">
        <div className="category__productName">{productName}</div>
        <div className="category__productprice">
          {formatNumberAsPrice(productPrice)}
        </div>
      </div>
    </div>
  );
}
