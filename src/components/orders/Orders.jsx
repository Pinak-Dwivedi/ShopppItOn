import "./Orders.css";
import Order from "./Order/Order";
import Pagination from "../pagination/Pagination";
import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import {
  getOrdersThunk,
  getAllOrdersThunk,
} from "../../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

import formatNumberAsPrice from "../../utils/formatNumberAsPrice";

export default function Orders() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { orders, pagination, totalOrdersPrice } = useSelector(
    (state) => state.order
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const page = searchParams.get("page");

  useEffect(() => {
    if (isAuthenticated && user.role === "admin") {
      dispatch(getAllOrdersThunk(searchParams.toString()));
    } else if (isAuthenticated) {
      dispatch(getOrdersThunk(searchParams.toString()));
    }
  }, [dispatch, isAuthenticated, user, page]);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  function handlePageChange(newPageNum) {
    setSearchParams(
      (prev) => {
        prev.set("page", newPageNum);

        return prev;
      },
      {
        replace: true,
      }
    );
  }

  function onPrevPage(newPage) {
    handlePageChange(newPage);
  }

  function onNextPage(newPage) {
    handlePageChange(newPage);
  }

  function onPageNum(pNum) {
    handlePageChange(pNum);
  }

  return (
    <div className="orders">
      {user?.role === "admin" ? (
        <div className="orders__heading">All Orders</div>
      ) : (
        <div className="orders__heading">My Orders</div>
      )}

      <div className="orders__total">
        <div className="orders__totalHeading">Total Orders Price</div>
        <div className="orders__totalPrice">
          {formatNumberAsPrice(totalOrdersPrice)}
        </div>
      </div>

      <div className="orders__list">
        {orders != null ? (
          orders.map((order) => {
            return <Order key={order.orderId} orderDetails={order} />;
          })
        ) : (
          <div className="orders__noOrdersFound">No orders found!</div>
        )}
      </div>

      {pagination != null ? (
        <Pagination
          paginationDetails={{
            pageNum: pagination?.pageNum,
            totalItems: pagination?.totalOrders,
            itemsPerPage: pagination?.ordersPerPage,
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
