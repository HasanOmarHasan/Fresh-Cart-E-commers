import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import Loading from "../../components/ui/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    products,
    totalCartPrice,
    deletCartItem,
    clearCart,
    isProductEmpity,
    updateCount,
  } = useContext(CartContext);

  // let isEmpityFlag = false;
  function deletItem(id) {
    deletCartItem(id);
    // console.log(isEmpityFlag, "isEmpityFlag");
  }

  function updateCountCart(id, newCount) {
    updateCount(id, newCount);
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                <p className="h6 mt-3">
                  <Link to={"/products"}>← Back to Product </Link>
                </p>
                <button className="btn btn-outline-warning">
                  {" "}
                  {/* Confirm a Payment */}
                  <Link to={"/payment"}> Confirm a Payment </Link>{" "}
                </button>
              </div>
              <div className="">
                <h5 className="h4">
                  Totle price :{" "}
                  <span className="text-muted ">{totalCartPrice} .0/LE</span>
                  <div className="mt-2 ms-auto">
                    <button
                      className="btn  btn-outline-danger"
                      onClick={() => {
                        clearCart();
                      }}
                    >
                      <span className="pe-2">Remove all Carts</span>
                      <i className="fas fa-trash fa-lg"></i>
                    </button>
                  </div>
                </h5>
              </div>
            </div>
            {products.length ? (
              <>
                {" "}
                {products.map((product, idx) => {
                  return (
                    <>
                      <div className="card rounded-3 mb-4" key={idx}>
                        <div className="card-body p-4">
                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={product.product.imageCover}
                                className="img-fluid rounded-3"
                                alt={product.product.title}
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <p className="lead fw-normal mb-2">
                                <Link
                                  to={`/ProductDetails/${product.product.id}`}
                                >
                                  {product.product.title
                                    .split(" ")
                                    .slice(0, 2)
                                    .join(" ")}
                                </Link>
                              </p>
                              <p>
                                <span className="text-muted">Brand: </span>
                                {product.product.brand.name}
                              </p>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
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
                                    updateCountCart(
                                      product.product.id,
                                      product.count - 1
                                    );
                                  }}
                                  disabled={product.count === 1}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <input
                                  type="text"
                                  className="form-control text-center border border-secondary"
                                  value={product.count}
                                />
                                <button
                                  className="btn btn-outline-success border border-secondary px-3"
                                  type="button"
                                  id="button-addon2"
                                  data-mdb-ripple-color="dark"
                                  onClick={() => {
                                    updateCountCart(
                                      product.product.id,
                                      product.count + 1
                                    );
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h5 className="mb-0 text-success">
                                LE {product.price}{" "}
                              </h5>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <button
                                className="btn text-danger"
                                onClick={() => {
                                  deletItem(product.product.id);
                                }}
                              >
                                {" "}
                                <i className="fas fa-trash fa-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {/* products.length == 0 */}
                {products.length || isProductEmpity ? (
                  <>
                    <div className="card rounded-3 mb-4">
                      <div className="card-body p-4">
                        <h3 className="text-center"> Your cart is Empity </h3>{" "}
                      </div>
                    </div>
                  </>
                ) : (
                  <Loading />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
