import React, { useContext } from "react";
import Loading from "../../components/ui/Loading/Loading";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../context/wishlistContext";
import { CartContext } from "../../context/cartContext";
import style from "./../Product/product.module.css";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const { allProducts, deletProductWishlist } = useContext(wishlistContext);
  const { addCart } = useContext(CartContext);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
      </Helmet>
      <h3 className="text-center mt-5 mb-3 fs-1 fw-bold py-4">
        {" "}
        WishList items
      </h3>
      <div className="container w-75">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {allProducts ? (
            <>
              {" "}
              {allProducts.map((product, idx) => {
                return (
                  <div key={idx} className="col">
                    <div className="card h-100 product">
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
                            onClick={() => {
                              deletProductWishlist(product.id);
                            }}
                            className={`${style.wishlist} wishlist position-absolute border-0 translate-middle-x btn btn-outline-danger w-auto`}
                          >
                            {" "}
                            <i className="fas fa-trash fa-lg fs-5"></i>{" "}
                          </button>
                          <button
                            className={`${style.cart} position-absolute top-50 start-50   btn translate-middle rounded-5 btn-outline-dark py-2 `}
                            onClick={() => addCart(product.id)}
                          >
                            <span>
                              Add to cart
                              {/* <i className="fa-solid fa-cart-shopping fs-5"></i> */}
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
            <>
              {allProducts.length ? (
                <h3 className="text-center my-4">
                  {console.log(allProducts.length)}
                </h3>
              ) : (
                <Loading />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
