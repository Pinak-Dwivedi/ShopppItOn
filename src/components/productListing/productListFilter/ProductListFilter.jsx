import "./ProductListFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getProductsThunk,
  setSearchQuery,
} from "../../../redux/slices/productSlice";

export default function ProductListFilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, searchQuery } = useSelector((state) => state.product);

  const [categoryFilter, setCategoryFilter] = useState({
    electronics: {
      status: searchQuery.filter.includes("Electronics") ? true : false,
      value: searchQuery.filter.includes("Electronics") ? "Electronics" : "",
    },
    footwear: {
      status: searchQuery.filter.includes("Footwear") ? true : false,
      value: searchQuery.filter.includes("Footwear") ? "Footwear" : "",
    },
    glasses: {
      status: searchQuery.filter.includes("Glasses") ? true : false,
      value: searchQuery.filter.includes("Glasses") ? "Glasses" : "",
    },
    jeans: {
      status: searchQuery.filter.includes("Jeans") ? true : false,
      value: searchQuery.filter.includes("Jeans") ? "Jeans" : "",
    },
    tShirt: {
      status: searchQuery.filter.includes("T-Shirt") ? true : false,
      value: searchQuery.filter.includes("T-Shirt") ? "T-Shirt" : "",
    },
  });

  const [priceFilter, setPriceFilter] = useState({
    priceMin: "min",
    priceMax: "max",
  });

  const [ratingFilter, setRatingFilter] = useState({
    rating3Star: {
      status: searchQuery.filter.includes("rating3Star") ? true : false,
      value: searchQuery.filter.includes("rating3Star") ? "T-Shirt" : "",
    },
    rating4Star: {
      status: searchQuery.filter.includes("rating4Star") ? true : false,
      value: searchQuery.filter.includes("rating4Star") ? "T-Shirt" : "",
    },
  });

  function prepareGetProductsQuery() {
    // category
    const { electronics, footwear, glasses, jeans, tShirt } = categoryFilter;

    let queryString = "";

    if (electronics.value !== "")
      queryString += `category=${electronics.value}&`;
    if (footwear.value !== "") queryString += `category=${footwear.value}&`;
    if (glasses.value !== "") queryString += `category=${glasses.value}&`;
    if (jeans.value !== "") queryString += `category=${jeans.value}&`;
    if (tShirt.value !== "") queryString += `category=${tShirt.value}&`;

    // price
    if (priceFilter.priceMin !== "min")
      queryString += `priceMin=${priceFilter.priceMin}&`;

    if (priceFilter.priceMax !== "max")
      queryString += `priceMax=${priceFilter.priceMax}&`;

    // rating
    if (ratingFilter.rating3Star.value !== "")
      queryString += `rating3Star=true&`;

    if (ratingFilter.rating4Star.value !== "")
      queryString += `rating4Star=true&`;

    return queryString;
  }

  function applyFilter() {
    const queryString = prepareGetProductsQuery();

    dispatch(
      setSearchQuery({
        ...searchQuery,
        filter: queryString,
      })
    );

    let query = `${searchQuery.search}${queryString}${searchQuery.page}`;

    dispatch(getProductsThunk(query));

    navigate(`/productlisting?${query}`);
  }

  return (
    <div className="productListFilter">
      <div className="productListFilter__heading">Filters</div>

      <div className="productListFilter__category">
        <div className="productListFilter__categoryHeading">Category</div>

        <div className="productListFilter__categoryList">
          <div className="productListFilter__categoryListItem">
            <label
              className="productListFilter__categoryLabel"
              htmlFor="electronics"
            >
              Electronics
            </label>

            <input
              className="productListFilter__categoryInput"
              type="checkbox"
              id="electronics"
              checked={categoryFilter.electronics.status}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    electronics: {
                      status: !categoryFilter.electronics.status,
                      value: !categoryFilter.electronics.status
                        ? "Electronics"
                        : "",
                    },
                  };
                })
              }
            />
          </div>

          <div className="productListFilter__categoryListItem">
            <label
              className="productListFilter__categoryLabel"
              htmlFor="footwear"
            >
              Footwear
            </label>
            <input
              className="productListFilter__categoryInput"
              type="checkbox"
              id="footwear"
              checked={categoryFilter.footwear.status}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    footwear: {
                      status: !categoryFilter.footwear.status,
                      value: !categoryFilter.footwear.status ? "Footwear" : "",
                    },
                  };
                })
              }
            />
          </div>
          <div className="productListFilter__categoryListItem">
            <label
              className="productListFilter__categoryLabel"
              htmlFor="glasses"
            >
              Glasses
            </label>
            <input
              className="productListFilter__categoryInput"
              type="checkbox"
              id="glasses"
              checked={categoryFilter.glasses.status}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    glasses: {
                      status: !categoryFilter.glasses.status,
                      value: !categoryFilter.glasses.status ? "Glasses" : "",
                    },
                  };
                })
              }
            />
          </div>

          <div className="productListFilter__categoryListItem">
            <label className="productListFilter__categoryLabel" htmlFor="jeans">
              Jeans
            </label>
            <input
              className="productListFilter__categoryInput"
              type="checkbox"
              id="jeans"
              checked={categoryFilter.jeans.status}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    jeans: {
                      status: !categoryFilter.jeans.status,
                      value: !categoryFilter.jeans.status ? "Jeans" : "",
                    },
                  };
                })
              }
            />
          </div>

          <div className="productListFilter__categoryListItem">
            <label
              className="productListFilter__categoryLabel"
              htmlFor="t-shirt"
            >
              T-Shirt
            </label>
            <input
              className="productListFilter__categoryInput"
              type="checkbox"
              id="t-shirt"
              checked={categoryFilter.tShirt.status}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    tShirt: {
                      status: !categoryFilter.tShirt.status,
                      value: !categoryFilter.tShirt.status ? "T-Shirt" : "",
                    },
                  };
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="productListFilter__price">
        <div className="productListFilter__priceHeading">Price</div>
        <div className="productListFilter__priceInfo">
          <select
            className="productListFilter__priceSelect"
            value={priceFilter.priceMin}
            onChange={(e) =>
              setPriceFilter({
                ...priceFilter,
                priceMin: e.target.value,
              })
            }
          >
            <option value="min" className="productListFilter__priceOption">
              Min
            </option>
            <option value="300" className="productListFilter__priceOption">
              300
            </option>
            <option value="600" className="productListFilter__priceOption">
              600
            </option>
            <option value="900" className="productListFilter__priceOption">
              900
            </option>
            <option value="1200" className="productListFilter__priceOption">
              1200
            </option>
            <option value="1500" className="productListFilter__priceOption">
              1500
            </option>
          </select>

          <select
            className="productListFilter__priceSelect"
            value={priceFilter.priceMax}
            onChange={(e) =>
              setPriceFilter({
                ...priceFilter,
                priceMax: e.target.value,
              })
            }
          >
            <option value="max" className="productListFilter__priceOption">
              Max
            </option>
            <option value="10000" className="productListFilter__priceOption">
              10000
            </option>
            <option value="20000" className="productListFilter__priceOption">
              20000
            </option>
            <option value="40000" className="productListFilter__priceOption">
              40000
            </option>
            <option value="60000" className="productListFilter__priceOption">
              60000
            </option>
            <option value="80000" className="productListFilter__priceOption">
              80000
            </option>
          </select>
        </div>
      </div>

      <div className="productListFilter__rating">
        <div className="productListFilter__ratingHeading">Customer Ratings</div>
        <div className="productListFilter__ratingList">
          <div className="productListFilter__ratingListFilter">
            <label
              className="productListFilter__ratingListFilterLabel"
              htmlFor="4Star"
            >
              4&#9733; & above
            </label>
            <input
              className="productListFilter__ratingListFilterInput"
              type="checkbox"
              id="4Star"
              checked={ratingFilter.rating4Star.status}
              onChange={() =>
                setRatingFilter((ratingFilter) => {
                  return {
                    ...ratingFilter,
                    rating4Star: {
                      status: !ratingFilter.rating4Star.status,
                      value: !ratingFilter.rating4Star.status
                        ? "rating4Star"
                        : "",
                    },
                  };
                })
              }
            />
          </div>
          <div className="productListFilter__ratingListFilter">
            <label
              className="productListFilter__ratingListFilterLabel"
              htmlFor="3Star"
            >
              3&#9733; & above
            </label>
            <input
              className="productListFilter__ratingListFilterInput"
              type="checkbox"
              id="3Star"
              checked={ratingFilter.rating3Star.status}
              onChange={() =>
                setRatingFilter((ratingFilter) => {
                  return {
                    ...ratingFilter,
                    rating3Star: {
                      status: !ratingFilter.rating3Star.status,
                      value: !ratingFilter.rating3Star.status
                        ? "rating3Star"
                        : "",
                    },
                  };
                })
              }
            />
          </div>
        </div>
      </div>

      <button
        className="productListFilter__applyFilterButton"
        disabled={isLoading}
        onClick={applyFilter}
      >
        Apply Filter
      </button>
    </div>
  );
}
