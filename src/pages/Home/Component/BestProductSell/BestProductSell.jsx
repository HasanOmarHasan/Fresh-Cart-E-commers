import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../../../context/cartContext";
import { wishlistContext } from "../../../../context/wishlistContext";
import ProductLoding from "../../../../components/ui/Loading/productLoding";
import style from "../../../Product/product.module.css";

export default function BestProductSell() {
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: {
        sort: "-ratingsAverage ",
        limit: 8,
        page: 3,
      },
    });
  }

  const { data, isError, isLoading, isFetching } = useQuery(
    "BestProducts",
    getAllProducts,
    {
      refetchOnMount: false,
    }
  );

  const allProducts = data?.data.data;

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(wishlistContext);
  // console.log(allProducts);
  return (
    <>
      <section className="bg-main-light">
        <div className="container  ">
          <h3 className="text-center fw-bold  py-5">Best Proudect Sell </h3>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 gy-4">
            {allProducts ? (
              <>
                {" "}
                {allProducts.map((product, idx) => {
                  return (
                    <div key={idx} className="col">
                      <div className="card h-100 product ">
                        <figure className="position-relative">
                          <Link to={`/ProductDetails/${product.id}`}>
                            <img
                              src={product.imageCover}
                              className="card-img-top"
                              alt={product.title}
                            />
                          </Link>

                          <div className={`${style.contentLayer}`}>
                            <button
                              className={`${style.wishlist} wishlist position-absolute border-0 translate-middle-x`}
                              onClick={() => {
                                addToWishlist(product.id);
                              }}
                            >
                              <i className="fa-regular fa-heart fa-beat fs-5"></i>
                            </button>
                            {/*end wishlist  */}
                            <button
                              className={`${style.cart} position-absolute top-50 start-50   btn translate-middle rounded-5 btn-outline-dark py-2 `}
                              onClick={() => addToCart(product.id)}
                            >
                              <span>
                                Add to cart
                                <i className="fa-solid fa-cart-shopping fs-5"></i>
                              </span>
                            </button>
                          </div>
                        </figure>
                        <Link to={`/ProductDetails/${product.id}`}>
                          <div className="card-body">
                            <h3 className="card-title">
                              {product.title.split(" ").slice(0, 2).join(" ")}
                            </h3>
                            <p className="text-muted">{product.brand.name}</p>
                            <p className="card-text">
                              {product.description
                                .split(" ")
                                .slice(0, 3)
                                .join(" ")}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className=""> LE {product.price}</p>
                              <div className="">
                                <p className="text-muted">
                                  {product.ratingsAverage}{" "}
                                  <i className="fa-solid fa-star rating-color"></i>{" "}
                                  ({product.ratingsQuantity}){" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}{" "}
              </>
            ) : (
              <ProductLoding />
            )}
          </div>
          <Link className="text-center d-block text-main py-4" to={"/products"}>
            See all Product →
          </Link>
        </div>
      </section>
    </>
  );
}
