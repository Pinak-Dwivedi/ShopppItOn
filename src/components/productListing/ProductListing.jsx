import "./ProductListing.css";
import ProductListFilter from "./productListFilter/ProductListFilter";
import ProductListProduct from "./productListProduct/ProductListProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getProductsThunk,
  sortProducts,
} from "../../redux/slices/productSlice";
import Pagination from "../pagination/Pagination";

export default function ProductListing() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isLoading,
    products,
    pagination: paginationDetails,
  } = useSelector((state) => state.product);

  const priceLowToHigh = searchParams.get("priceLowToHigh"),
    priceHighToLow = searchParams.get("priceHighToLow"),
    newestFirst = searchParams.get("newestFirst");

  useEffect(() => {
    if (priceLowToHigh === "true") dispatch(sortProducts("priceLowToHigh"));
    else if (priceHighToLow === "true")
      dispatch(sortProducts("priceHighToLow"));
    else if (newestFirst === "true") dispatch(sortProducts("newestFirst"));
  }, [dispatch, priceLowToHigh, priceHighToLow, newestFirst]);

  const search = searchParams.get("search"),
    page = searchParams.get("page"),
    category = searchParams.getAll("category").toString(),
    priceMin = searchParams.get("priceMin"),
    priceMax = searchParams.get("priceMax"),
    rating3Star = searchParams.get("rating3Star"),
    rating4Star = searchParams.get("rating4Star");

  useEffect(() => {
    dispatch(getProductsThunk(searchParams.toString()));
  }, [
    dispatch,
    search,
    page,
    category,
    priceMin,
    priceMax,
    rating3Star,
    rating4Star,
  ]);

  function sortPriceLowToHigh() {
    setSearchParams(
      (prev) => {
        prev.delete("priceHighToLow");
        prev.delete("newestFirst");
        prev.set("priceLowToHigh", "true");

        return prev;
      },
      { replace: true }
    );
  }

  function sortPriceHighToLow() {
    setSearchParams(
      (prev) => {
        prev.delete("priceLowToHigh");
        prev.delete("newestFirst");
        prev.set("priceHighToLow", "true");

        return prev;
      },
      { replace: true }
    );
  }

  function sortNewestFirst() {
    setSearchParams(
      (prev) => {
        prev.delete("priceHighToLow");
        prev.delete("priceLowToHigh");
        prev.set("newestFirst", "true");

        return prev;
      },
      { replace: true }
    );
  }

  function handlePageChange(newPageNum) {
    setSearchParams((prev) => {
      prev.set("page", newPageNum);

      return prev;
    });
  }

  function onPrevPage(newPageNum) {
    handlePageChange(newPageNum);
  }

  function onNextPage(newPageNum) {
    handlePageChange(newPageNum);
  }

  function onPageNum(pNum) {
    handlePageChange(pNum);
  }

  return (
    <div className="productListing">
      <div className="productListing__sort">
        <span className="productListing__sortHeading">Sort By</span>
        <button
          className={`productListing__sortButton ${
            searchParams.get("priceLowToHigh") === "true" ? "active" : ""
          }`}
          disabled={isLoading}
          onClick={sortPriceLowToHigh}
        >
          Price Low To High
        </button>
        <button
          className={`productListing__sortButton ${
            searchParams.get("priceHighToLow") === "true" ? "active" : ""
          }`}
          disabled={isLoading}
          onClick={sortPriceHighToLow}
        >
          Price High To Low
        </button>
        <button
          className={`productListing__sortButton ${
            searchParams.get("newestFirst") === "true" ? "active" : ""
          }`}
          disabled={isLoading}
          onClick={sortNewestFirst}
        >
          Newest First
        </button>
      </div>

      <div className="productListing__filterAndProductList">
        <ProductListFilter />

        <div className="productListing__productList">
          {products == null ? (
            <div className="productListing__noProductsError">
              No Products Found! Try Searching!
            </div>
          ) : (
            products?.map((product) => {
              return (
                <ProductListProduct
                  key={product.productId}
                  productInfo={product}
                />
              );
            })
          )}
        </div>
      </div>
      {paginationDetails != null ? (
        <Pagination
          paginationDetails={{
            pageNum: paginationDetails?.pageNum,
            totalItems: paginationDetails?.totalProducts,
            itemsPerPage: paginationDetails?.productsPerPage,
          }}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onPageNum={onPageNum}
        />
      ) : (
        ""
      )}
    </div>
  );
}
