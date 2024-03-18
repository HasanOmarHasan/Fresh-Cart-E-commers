import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/ui/Loading/Loading";
import Slider from "react-slick";
import { CartContext } from "../../../context/cartContext";
import { wishlistContext } from "../../../context/wishlistContext";
import { Helmet } from "react-helmet";

// import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const { id } = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isError, isLoading } = useQuery(
    `productDetails/${id}`,
    () => getProductDetails(id),
    {
      // cacheTime: 3000,
    }
  );
  const product = data?.data.data;

  const { addToCart, updateCount } = useContext(CartContext);
  const { addToWishlist } = useContext(wishlistContext);

  function addCart(id) {
    addToCart(id);
  }
  const [count, setCount] = useState(1);

  const [imgTogle, setImgTogle] = useState("");

  useEffect(() => {
    if (product) {
      setImgTogle(product?.images[0]);
    }
  }, [product]);
  // console.log(product.title);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="py-5">
          <div className="container">
            <Helmet>
              <meta charSet="utf-8" />
              <title>{product.title}</title>
            </Helmet>
            <div className="row gx-5">
              <aside className="col-lg-6">
                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                  <img
                    src={imgTogle}
                    alt={product.title}
                    style={{
                      maxWidth: "400px",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit w-100"
                    loading="lazy"
                  />
                </div>
                <div className="d-flex justify-content-center mb-3 ">
                  {product.images.map((img, idx) => {
                    return (
                      <button
                        key={idx}
                        data-fslightbox="mygalley"
                        className="border mx-1 rounded-2 item-thumb"
                        data-type="image"
                        onClick={() => {
                          setImgTogle(product.images[idx]);
                        }}
                      >
                        <img
                          src={img}
                          alt={product.title}
                          width="100"
                          height="100"
                          loading="lazy"
                          className="rounded-2 w-100"
                        />
                      </button>
                    );
                  })}
                </div>
              </aside>

              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <h4 className="title text-dark">{product.title}</h4>
                  <div className="d-flex flex-row my-3">
                    <div className="text-warning mb-1 me-2">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="ms-1">
                        {product.ratingsAverage} ({product.ratingsQuantity})
                      </span>
                    </div>
                    <span className="text-muted">
                      <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                      {product.quantity} orders
                    </span>
                    <span className="text-success ms-2">In stock</span>
                  </div>

                  <div className="mb-3">
                    <span className="h5">${product.price}.00</span>
                    <span className="text-muted">/LE</span>
                  </div>

                  <p>{product.description}</p>

                  <div className="row">
                    <dt className="col-3">Brand</dt>
                    <dd className="col-9">{product.brand.name} </dd>

                    <dt className="col-3">category</dt>
                    <dd className="col-9">{product.category.name} </dd>
                    {/*
                  <dt className="col-3">Type:</dt>
                  <dd className="col-9">Regular</dd> */}

                    <dt className="col-3">sold</dt>
                    <dd className="col-9">{product.sold} </dd>
                  </div>

                  <hr />

                  <div className="row mb-4">
                    {product.category.name === "Electronics" ? (
                      ""
                    ) : (
                      <div className="col-md-4 col-6">
                        <label className="mb-2">Size</label>
                        <select
                          className="form-select border border-secondary"
                          // style="height: 35px;"
                          style={{ height: "35px" }}
                        >
                          {/* XS	S	M	L	XL	XXL */}
                          <option>XS</option>
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                          <option>XXL</option>
                        </select>
                      </div>
                    )}

                    {/* <!-- col.// --> */}
                    <div className="col-md-4 col-6 mb-3">
                      <label className="mb-2 d-block">Quantity</label>
                      <div
                        className="input-group mb-3"
                        style={{ width: "170px" }}
                      >
                        <button
                          className="btn btn-outline-success  border border-secondary px-3"
                          type="button"
                          id="button-addon1"
                          data-mdb-ripple-color="dark"
                          onClick={() => {
                            setCount(count - 1);
                            updateCount(product.id, count);
                          }}
                          disabled={count === 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control text-center border border-secondary"
                          value={count}
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />
                        <button
                          className="btn btn-outline-success border border-secondary px-3"
                          type="button"
                          id="button-addon2"
                          data-mdb-ripple-color="dark"
                          onClick={() => {
                            setCount(count + 1);
                            updateCount(product.id, count);
                          }}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={"/payment"}
                    className="btn btn-warning shadow-0 me-2"
                  >
                    {" "}
                    Buy now{" "}
                  </Link>
                  <button
                    className="btn btn-success shadow-0 me-2"
                    onClick={() => addCart(product.id)}
                  >
                    {" "}
                    <i className=" fa fa-shopping-basket"></i> Add to cart{" "}
                  </button>
                  <button
                    onClick={() => {
                      addToWishlist(product.id);
                    }}
                    className="btn btn-light border border-secondary py-2 icon-hover px-3 me-2 "
                  >
                    {" "}
                    <i className="fa fa-heart fa-lg text-danger"></i> Save{" "}
                  </button>
                </div>
              </main>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
