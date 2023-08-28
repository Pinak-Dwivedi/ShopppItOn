import "./Orders.css";
import Order from "./Order/Order";
import Pagination from "../pagination/Pagination";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrdersThunk,
  getAllOrdersThunk,
} from "../../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

import formatNumberAsPrice from "../../utils/formatNumberAsPrice";

export default function Orders() {
  const shouldMakeGetOrdersCall = useRef(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, pagination, totalOrdersPrice } = useSelector(
    (state) => state.order
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (shouldMakeGetOrdersCall.current === true) {
      if (isAuthenticated && user.role === "admin") {
        dispatch(getAllOrdersThunk("page=1"));
      } else if (isAuthenticated) {
        dispatch(getOrdersThunk("page=1"));
      } else if (!isAuthenticated) {
        return navigate("/");
      }

      return () => {
        shouldMakeGetOrdersCall.current = false;
      };
    }
  }, [dispatch, isAuthenticated, user, navigate]);

  function onPrevPage(newPage) {
    if (isAuthenticated && user.role === "admin") {
      dispatch(getAllOrdersThunk(`page=${newPage}`));
    } else if (isAuthenticated) {
      dispatch(getOrdersThunk(`page=${newPage}`));
    }
  }

  function onNextPage(newPage) {
    if (isAuthenticated && user.role === "admin") {
      dispatch(getAllOrdersThunk(`page=${newPage}`));
    } else if (isAuthenticated) {
      dispatch(getOrdersThunk(`page=${newPage}`));
    }
  }

  function onPageNum(pNum) {
    if (isAuthenticated && user.role === "admin") {
      dispatch(getAllOrdersThunk(`page=${pNum}`));
    } else if (isAuthenticated) {
      dispatch(getOrdersThunk(`page=${pNum}`));
    }
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
