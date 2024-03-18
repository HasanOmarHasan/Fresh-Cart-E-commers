import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./cartContext";

export const paymentContext = createContext();

export default function PaymentContextProvider({ children }) {
  const { userId } = useContext(CartContext);
  const [totalOrder, setTotalOrder] = useState(0);
  const [res, setRes] = useState([]);
  function getUserOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
        // console.log(res?.data, "data");
        setRes(res?.data);
        setTotalOrder(res?.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (userId) {
      getUserOrders();
    }
  }, [userId]);
  return (
    <>
      <paymentContext.Provider
        value={{
          totalOrder,
          res,
        }}
      >
        {children}
      </paymentContext.Provider>
    </>
  );
}

