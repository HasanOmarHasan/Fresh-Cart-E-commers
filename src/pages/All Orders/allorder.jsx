import React, { useContext, } from "react";
import "./allorder.css";
import { Link } from "react-router-dom";
import { paymentContext } from "../../context/paymentContext";
import Loading from "../../components/ui/Loading/Loading";
import { Helmet } from "react-helmet";

export default function AllOrder() {
  const { res } = useContext(paymentContext);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Order</title>
      </Helmet>
      <div className="container w-75  card  px-5  my-5 ">
        <h3 className="   my-3"> Thanks for your Order</h3>
        <div className="card-bady">
          {res.length ? (
            <>
              {res.map((data, idx) => {
                return (
                  <>
                    <div className="card my-4   " key={idx}>
                      {/* badge  */}
                      <span className="position-absolute top-0 start-100 translate-middle p-2 badge text-bg-info fs-6">
                        {data.paymentMethodType}
                      </span>

                      {/* end of badg */}
                      <div className="card-body">
                        <h5 className="card-title">ORDER {data.id} </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Invoice Date :{" "}
                          {`${data.createdAt.slice(
                            0,
                            10
                          )} in ${data.createdAt.slice(11, 16)}`}
                        </h6>
                        <div className="product-details my-2">
                          <ul className="list-group list-group-flush">
                            {/* loop li */}
                            {data.cartItems.length ? (
                              <>
                                {data.cartItems.map((item, index) => {
                                  return (
                                    <li className="list-group-item" key={index}>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <Link
                                            className="text-main"
                                            to={`/ProductDetails/${item.product.id}`}
                                          >
                                            {item.product.title}
                                          </Link>{" "}
                                          <p className="text-muted m-0">
                                            Qt: {item.count} item{" "}
                                          </p>
                                          <span className="fw-semibold">
                                            {" "}
                                            $ {item.price} via{" "}
                                          </span>
                                        </div>
                                        <div className="col-md-6">
                                          {/* <figure> */}
                                          <img
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            className="m-auto d-block"
                                            width={"100"}
                                            // height={"100"}
                                          />
                                          {/* </figure> */}
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}{" "}
                              </>
                            ) : (
                              "not prodact"
                            )}
                          </ul>
                        </div>
                        <div className="order-details mt-3 mb-5 ">
                          <div className="row">
                            <h5>Order Details</h5>
                            <div className="col-md-6 ">
                              <p className="m-0">To Mr {data.user.name}</p>
                              <p>phone : {data.shippingAddress.phone} </p>
                              <p className="m-0">
                                in address {data.shippingAddress.city}{" "}
                              </p>
                              <p>{data.shippingAddress.details} </p>
                            </div>
                            <div className="col-md-6">
                              <p>
                                <span className="fw-semibold">
                                  shipping Price :{" "}
                                </span>{" "}
                                {data.shippingPrice}{" "}
                              </p>
                              <p>
                                <span className="fw-semibold">
                                  tax Price :{" "}
                                </span>{" "}
                                {data.taxPrice}{" "}
                              </p>
                            </div>
                            <div className=" text-center fs-5 mt-3">
                              {" "}
                              <span className="fw-bold">Total Price :</span>
                              {data.totalOrderPrice}{" "}
                            </div>
                          </div>
                        </div>
                        {/* progress */}
                        <div className=" order card-footer">
                          <div className="progressbar-track">
                            <ul className="progressbar">
                              <li id="step-1" className="text-muted green">
                                <span className="fas fa-gift"></span>
                              </li>
                              <li id="step-2" className="text-muted green">
                                <span className="fas fa-check"></span>
                              </li>
                              <li id="step-3" className="text-muted green">
                                <span className="fas fa-box"></span>
                              </li>
                              <li id="step-4" className="text-muted green">
                                <span className="fas fa-truck"></span>
                              </li>
                              <li id="step-5" className="text-muted ">
                                <span className="fas fa-box-open"></span>
                              </li>
                            </ul>
                            <div id="tracker"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
