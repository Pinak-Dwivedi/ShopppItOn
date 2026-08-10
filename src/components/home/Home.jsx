import "./Home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../../redux/slices/productSlice";
import CategorySection from "../categorySection/CategorySection";
import Loading from "../loading/Loading";

export default function Home() {
    const { latestProducts, isLoading } = useSelector((state) => state.product);
    const { isLoading: isAuthLoading } = useSelector((state) => state.user);

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

            {isLoading || isAuthLoading ? (
                <Loading />
            ) : (
                latestProducts?.map((categoryData, index) => {
                    return (
                        <CategorySection
                            key={index}
                            categoryData={categoryData}
                        />
                    );
                })
            )}
        </div>
    );
}
