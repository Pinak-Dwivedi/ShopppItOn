import "./Home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../../redux/slices/productSlice";
import CategorySection from "../categorySection/CategorySection";

export default function Home() {
  const { latestProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk("latest=true"));
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__heroText">
          <div>GET READY FOR</div>
          <div>YOUR FAVOURITE SHOPPING</div>
        </div>
      </div>

      {latestProducts?.map((categoryData, index) => {
        return <CategorySection key={index} categoryData={categoryData} />;
      })}
    </div>
  );
}
