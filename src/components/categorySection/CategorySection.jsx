import "./CategorySection.css";
import CategoryProduct from "./categoryProduct/CategoryProduct";

export default function CategorySection({ categoryData }) {
  return (
    <div className="category">
      <h2 className="category__heading">{categoryData[0]?.productCategory}</h2>

      <div className="category__productsList">
        {categoryData?.map((productInfo) => {
          return (
            <CategoryProduct
              key={productInfo.productId}
              productInfo={productInfo}
            />
          );
        })}
      </div>
    </div>
  );
}
