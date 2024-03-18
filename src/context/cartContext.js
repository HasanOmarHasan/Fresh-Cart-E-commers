import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { TokenCotext } from "./tokenContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [isProductEmpity, setIsProductEmpity] = useState(false);
  const [cardId, setcardId] = useState(null);
  const [userId, setUserId] = useState(null);
  const { tkn } = useContext(TokenCotext);
  // console.log(tkn, "tkn");
  // const token = localStorage.getItem("tkn");
  // console.log(token, "token");
  const headers = {
    token:tkn,
  };

  function updateStat(res) {
    setProducts(res?.data.data.products);
    setTotalCartPrice(res?.data.data.totalCartPrice);
    setNumOfCartItems(res?.data.numOfCartItems);
    setcardId(res?.data.data._id);
    setUserId(res?.data.data.cartOwner);

    // setIsProductEmpity(false);
  }

  function addToCart(id) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((res) => {
        let mess = res?.data.message;
        toast.success(mess);
        getUserCart();
      })
      .catch((err) => {
        let mess = err?.data.message;
        toast.error(mess);
      });
  }

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => {
        updateStat(res);
      })
      .catch((err) => {
        console.log(err, "error in get user data");
        toast.error(err.message)
        if (
          err?.response?.data.message.includes("No cart exist for this user")
        ) {
          setIsProductEmpity(true);
        }
      });
  }

  function deletCartItem(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((res) => {
        updateStat(res);

        if (products !== null && products.length === 1) {
          console.log(
            products !== null && products.length === 1,
            "in delet item "
          );
          setIsProductEmpity(true);
        }

        toast.success("The item is deleted");
      })
      .catch((err) => {
        toast.error("error in delet item");
        console.log(err, "error in delet cart item 💀");
      });
    // return isEmpityFlag;
  }
  function clearCart() {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        toast.success("The Cart is clear");
        setIsProductEmpity(true);
        setProducts([]);
        setTotalCartPrice(0);
        setNumOfCartItems(0);
      })
      .catch((err) => {
        toast.error("error 💀");
        console.log(err, "error in clear cart ");
      });
  }
  function updateCount(id, newCount) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        updateStat(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Should add product frist to Count it");
      });
  }

  useEffect(() => {
    if (tkn !== null) {
      getUserCart();
    }
  }, [tkn]);

  return (
    <>
      <CartContext.Provider
        value={{
          addToCart,
          numOfCartItems,
          products,
          totalCartPrice,
          deletCartItem,
          clearCart,
          isProductEmpity,
          updateCount,
          getUserCart,
          cardId,
          userId,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
