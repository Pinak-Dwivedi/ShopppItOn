import "./ProductListFilter.css";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function ProductListFilter() {
  const { isLoading } = useSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryFilter, setCategoryFilter] = useState((prev) => {
    const category = searchParams.get("category") || [];

    return {
      Electronics: category.includes("Electronics"),
      Footwear: category.includes("Footwear"),
      Glasses: category.includes("Glasses"),
      Jeans: category.includes("Jeans"),
      "T-Shirt": category.includes("T-Shirt"),
    };
  });

  const [priceFilter, setPriceFilter] = useState({
    priceMin: searchParams.get("priceMin") || "min",
    priceMax: searchParams.get("priceMax") || "max",
  });

  const [ratingFilter, setRatingFilter] = useState({
    rating3Star: searchParams.get("rating3Star") === "true",
    rating4Star: searchParams.get("rating4Star") === "true",
  });

  function updateSearchParamsFilters() {
    setSearchParams(
      (prev) => {
        // category filters
        prev.delete("category");

        for (let key in categoryFilter) {
          if (categoryFilter[key]) prev.append("category", key);
        }

        // price filters
        if (priceFilter.priceMin !== "min")
          prev.set("priceMin", priceFilter.priceMin);
        else {
          prev.delete("priceMin");
        }

        if (priceFilter.priceMax !== "max")
          prev.set("priceMax", priceFilter.priceMax);
        else {
          prev.delete("priceMax");
        }

        // rating filters
        if (ratingFilter.rating3Star) prev.set("rating3Star", "true");
        else prev.delete("rating3Star");

        if (ratingFilter.rating4Star) prev.set("rating4Star", "true");
        else prev.delete("rating4Star");

        return prev;
      },
      { replace: true }
    );
  }

  function applyFilter() {
    updateSearchParamsFilters();
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
              checked={categoryFilter["Electronics"]}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    Electronics: !categoryFilter["Electronics"],
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
              checked={categoryFilter["Footwear"]}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    Footwear: !categoryFilter["Footwear"],
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
              checked={categoryFilter["Glasses"]}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    Glasses: !categoryFilter["Glasses"],
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
              checked={categoryFilter["Jeans"]}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    Jeans: !categoryFilter["Jeans"],
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
              checked={categoryFilter["T-Shirt"]}
              onChange={() =>
                setCategoryFilter((categoryFilter) => {
                  return {
                    ...categoryFilter,
                    "T-Shirt": !categoryFilter["T-Shirt"],
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
              checked={ratingFilter.rating4Star}
              onChange={() =>
                setRatingFilter((ratingFilter) => {
                  return {
                    ...ratingFilter,
                    rating4Star: !ratingFilter.rating4Star,
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
              checked={ratingFilter.rating3Star}
              onChange={() =>
                setRatingFilter((ratingFilter) => {
                  return {
                    ...ratingFilter,
                    rating3Star: !ratingFilter.rating3Star,
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
