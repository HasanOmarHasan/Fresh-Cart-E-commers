import React, { useContext, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSlider from "./Component/Slider/MainSlider";
import CategorisSlider from "./Component/Slider/CategorisSlider";
import { Helmet } from "react-helmet";
import Brand from "./Component/Brands/Brand";
import BestProductSell from "./Component/BestProductSell/BestProductSell";
// import { CartContext } from "../../context/cartContext";
// import { wishlistContext } from "../../context/wishlistContext";
// import { TokenCotext } from "../../context/tokenContext";

/** section in Home
 * hero section have big slider
 * slider show popular categoris :
 * trind  prodacts section:  show 6 or 9 prodact only if wonit see more go in product page
 * testimonial section :
 * brand  section :
 * footer section :
 */

export default function Home() {
  // const { tkn  } = useContext(TokenCotext);
  // const { getUserCart } = useContext(CartContext);
  // const { userWishlist } = useContext(wishlistContext);

  // useEffect(() => {
    
  //   if (tkn!== null) {
  //     // console.log(tkn , ' is update ')
  //     getUserCart();
  //     userWishlist();
  //   }
    
  // }, [tkn])
  return (
    <>
      <Helmet>
        <title>Home Page </title>
      </Helmet>
      <MainSlider />
      <CategorisSlider />
      <BestProductSell />
      <Brand />
    </>
  );
}
