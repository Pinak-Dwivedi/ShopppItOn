import { useEffect, useState } from "react";
import "./SearchBar.css";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams.get("search")]);

  function searchProducts(e) {
    e.preventDefault();

    if (search?.trim() === "") return;

    setSearchParams(
      (prev) => {
        prev.set("search", search);

        return prev;
      },
      {
        replace: true,
      }
    );

    navigate(`/productlisting?${searchParams.toString()}`);
  }

  return (
    <form className="search__form" onSubmit={searchProducts}>
      <input
        className="search__input"
        type="search"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="search__button">
        <BiSearchAlt className="search__button--image" />
      </button>
    </form>
  );
}
