import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TokenCotext } from "./tokenContext";

export const wishlistContext = createContext();
// const token = localStorage.getItem("tkn");

export default function WishlistContextProvider({ children }) {
  // console.log(token, "token");
  // const [wishlistProductId, setWishlistProductId] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [wishlishCount, setwishlishCount] = useState(0);
  // ف حل بفكر اجربة بعد لما اخلص ال فاكشن و اتستها هو اني اعمل فاكشن بتست اذا ال
  // ال البرودكت اي دي دا جوا الاري و لا لاء  isIdInWishlist(id)
  // وفاكشن تانية بتقيس اذا البروكت دا مش جوا الوش ليست اري isIdNotWishlist(id)
  // بس لازم اعمل لوب جوا الاري عشان اعرف هل دا جوا ولا لاء ودي ممكن اعملها ف فاكشن منفصل
  // ولازم دي تتعمل اول ما افتح الصفحة فدي هتكون تبع getuserwishlist call in provider and set in wishlistProductId

  const { tkn } = useContext(TokenCotext);
  const headers = {
    token: tkn,
  };
  function addToWishlist(id) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        userWishlist();
        // setWishlistProductId(res.data.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err, "error in wishlist");
      });
  }
  function deletProductWishlist(id) {
    axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

        {
          headers,
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        toast.success(res.data.message);
        userWishlist();
      })
      .catch((err) => {
        console.log(err, "error in delet wishlist");
      });
  }
  function userWishlist() {
    axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",

        {
          headers,
        }
      )
      .then((res) => {
        setwishlishCount(res.data.count);
        setAllProducts(res.data.data);
        // console.log(res.data.data[0]._id);ho
        // setWishlistProductId(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error in user wishlist");
      });
  }

  useEffect(() => {
    if (tkn !== null) {
      userWishlist();
    }
  }, [tkn]);

  return (
    <>
      <wishlistContext.Provider
        value={{
          addToWishlist,
          allProducts,
          wishlishCount,
          deletProductWishlist,
          userWishlist,
        }}
      >
        {children}
      </wishlistContext.Provider>
    </>
  );
}
