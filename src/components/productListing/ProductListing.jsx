import "./ProductListing.css";
import ProductListFilter from "./productListFilter/ProductListFilter";
import ProductListProduct from "./productListProduct/ProductListProduct";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProductsThunk,
  sortProducts,
  setSearchQuery,
} from "../../redux/slices/productSlice";
import Pagination from "../pagination/Pagination";

export default function ProductListing() {
  const shouldMakeGetProductsRequest = useRef(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    products,
    searchQuery,
    pagination: paginationDetails,
  } = useSelector((state) => state.product);

  const [sortStatus, setSortStatus] = useState({
    priceLowToHigh: false,
    priceHighToLow: false,
    newestFist: false,
  });

  useEffect(() => {
    if (shouldMakeGetProductsRequest.current === true) {
      let query = `${searchQuery.search}${searchQuery.filter}${searchQuery.page}`;

      dispatch(getProductsThunk(query));

      return () => {
        shouldMakeGetProductsRequest.current = false;
      };
    }
  }, [dispatch, searchQuery.search, searchQuery.filter, searchQuery.page]);

  function sortPriceLowToHigh() {
    dispatch(sortProducts("priceLowToHigh"));

    setSortStatus({
      priceLowToHigh: true,
      priceHighToLow: false,
      newestFist: false,
    });
  }

  function sortPriceHighToLow() {
    dispatch(sortProducts("priceHighToLow"));

    setSortStatus({
      priceLowToHigh: false,
      priceHighToLow: true,
      newestFist: false,
    });
  }

  function sortNewestFirst() {
    dispatch(sortProducts("newestFirst"));

    setSortStatus({
      priceLowToHigh: false,
      priceHighToLow: false,
      newestFist: true,
    });
  }

  // pagination

  function onPrevPage(newPageNum) {
    dispatch(
      setSearchQuery({
        ...searchQuery,
        page: `page=${newPageNum}`,
      })
    );

    let query = `${searchQuery.search}${searchQuery.filter}page=${newPageNum}`;

    dispatch(getProductsThunk(`${query}`));

    navigate(`/productlisting?${query}`);
  }

  function onNextPage(newPageNum) {
    dispatch(
      setSearchQuery({
        ...searchQuery,
        page: `page=${newPageNum}`,
      })
    );

    let query = `${searchQuery.search}${searchQuery.filter}page=${newPageNum}`;

    dispatch(getProductsThunk(`${query}`));

    navigate(`/productlisting?${query}`);
  }

  function onPageNum(newPageNum) {
    dispatch(
      setSearchQuery({
        ...searchQuery,
        page: `page=${newPageNum}`,
      })
    );

    let query = `${searchQuery.search}${searchQuery.filter}page=${newPageNum}`;

    dispatch(getProductsThunk(`${query}`));

    navigate(`/productlisting?${query}`);
  }

  return (
    <div className="productListing">
      <div className="productListing__sort">
        <span className="productListing__sortHeading">Sort By</span>
        <button
          className={`productListing__sortButton ${
            sortStatus.priceLowToHigh ? "active" : ""
          }`}
          disabled={isLoading}
          onClick={sortPriceLowToHigh}
        >
          Price Low To High
        </button>
        <button
          className={`productListing__sortButton ${
            sortStatus.priceHighToLow ? "active" : ""
          }`}
          disabled={isLoading}
          onClick={sortPriceHighToLow}
        >
          Price High To Low
        </button>
        <button
          className={`productListing__sortButton ${
            sortStatus.newestFist ? "active" : ""
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
