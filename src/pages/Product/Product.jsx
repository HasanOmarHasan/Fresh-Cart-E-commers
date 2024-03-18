import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../components/ui/Loading/Loading";
import { debounce } from "lodash";

import axios from "axios";
import style from "./product.module.css";
import { useQuery } from "react-query";
import ProductLoding from "../../components/ui/Loading/productLoding";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { wishlistContext } from "../../context/wishlistContext.js";

export default function Product() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(wishlistContext);
  const [pageCount, setPageCount] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [keyword, setKeyword] = useState("");
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(0);
  // price[lte] اقل من سعر
  // price[gte] اعلي من السعر

  async function addCart(id) {
    await addToCart(id);
  }
 
  function getAllProducts() {
    let url = axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        page: pageCount,
      },
    });

    return url;
  }
  let { data } = useQuery(["allProducts", pageCount], getAllProducts, {
    refetchOnMount: false,
  });

  let allProducts = data?.data.data;

  const searchProduct = debounce(() => {
    const searchResult = allProducts.filter((product) =>
      product.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResult(searchResult);
  }, 300);

  const productArryOFObject = (arrayName) => {
    return (
      <>
        {arrayName.map((product, idx) => {
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
                    {/* wishlist  */}

                    {/* {wishlistProductId.length ? (
              <>
                {wishlistProductId.map((id, idx) => {
                  if (id === product.id) {
                    return (
                      <Link
                        to={""}
                        className={`${style.wishlist}  position-absolute border-0 translate-middle-x`}
                      >
                        
                        <i className="fa-solid fa-heart fs-5 text-danger"></i>
                      </Link>
                    );
                  }

                  return <></>;
                })}{" "}
                
              </>
            ) : (
              <>
                
              </>
            )} */}
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
                      onClick={() => addCart(product.id)}
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
                      {product.description.split(" ").slice(0, 3).join(" ")}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className=""> LE {product.price}</p>
                      <div className="">
                        <p className="text-muted">
                          {product.ratingsAverage}{" "}
                          <i className="fa-solid fa-star rating-color"></i> (
                          {product.ratingsQuantity}){" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Prodact</title>
      </Helmet>
      <div
        className={` ${style.pageHeader} h3   w-100  d-flex justify-content-center align-items-center`}
      >
        Products
      </div>

      <div className=" container py-5 ">
        <form class="d-flex mt-3 mb-5 justify-content-center" role="search">
          <input
            class="form-control me-2 w-50"
            type="search"
            placeholder="Search...."
            id="searchInput"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            class="btn btn-outline-success"
            type="button"
            onClick={() => {
              searchProduct();
            }}
          >
            Search
          </button>
        </form>
        <div className="row">
          {/* {allProducts ? (
            <div className="col-md-2 ms-auto ">
              <h3 className="h5 fw-medium mb-3">Price range</h3>
              <div className="col-md-12 ">
                <label htmlFor="priceRangeMin">Min</label>
                <input
                  className="form-control"
                  id="priceRangeMin"
                  placeholder="$0"
                  type="number"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="col-md-12 mt-2">
                <label htmlFor="priceRangeMax">Max</label>
                <input
                  className="form-control"
                  id="priceRangeMax"
                  placeholder="$1,0000"
                  type="number"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="d-grid mt-5">
                <button
                  className="btn btn-dark"
                  onClick={isApply}
                >
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <div className="col-md-2 ms-auto h5 fw-medium mb-3">
              Product Filters
              <p className=" placeholder-glow mt-4">
                <span className="placeholder col-2"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          )} */}
          <div className="col-md-12">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
              {allProducts ? (
                <>
                  {searchResult.length ? (
                    <>{productArryOFObject(searchResult)}</>
                  ) : (
                    <>{productArryOFObject(allProducts)}</>
                  )}{" "}
                </>
              ) : (
                <ProductLoding />
              )}
            </div>
          </div>
        </div>
        {allProducts ? (
          <div className="justify-content-center d-flex py-5 align-items-center ">
            <ul className="pagination ">
              <li className="page-item ">
                <button
                  className="page-link text-dark  "
                  onClick={() => {
                    setPageCount(pageCount - 1);
                  }}
                  disabled={pageCount === 1 || pageCount !== 2}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {pageCount === 1 ? (
                <>
                  {" "}
                  <li className="page-item">
                    <span
                      className="page-link text-light bg-main fw-bold"
                      to={""}
                    >
                      1
                    </span>
                  </li>
                  <li className="page-item">
                    <span className="page-link text-dark " to={""}>
                      2
                    </span>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="page-item">
                    <span className="page-link text-dark " to={""}>
                      1
                    </span>
                  </li>
                  <li className="page-item">
                    <span
                      className="page-link text-light bg-main fw-bold "
                      to={""}
                    >
                      2
                    </span>
                  </li>
                </>
              )}

              <li className="page-item">
                <button
                  className="page-link text-dark "
                  to={""}
                  aria-label="Next"
                  onClick={() => {
                    setPageCount(pageCount + 1);
                  }}
                  disabled={pageCount !== 1 || pageCount === 2}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
