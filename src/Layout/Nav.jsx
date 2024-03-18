import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSvg from "../assets/images/freshcart-logo.svg";
import { TokenCotext } from "../context/tokenContext";
import { CartContext } from "../context/cartContext";
import { paymentContext } from "../context/paymentContext";
import { wishlistContext } from "../context/wishlistContext";

export default function Nav() {
  const { tkn, setTkn } = useContext(TokenCotext);
  let Navigate = useNavigate();
  const { numOfCartItems } = useContext(CartContext);
  const { totalOrder } = useContext(paymentContext);
  const { wishlishCount } = useContext(wishlistContext);

  const logOut = () => {
    localStorage.removeItem("tkn");
    setTkn(null);
    Navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Home">
            <img src={logoSvg} alt="fresh cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {tkn ? (
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="/cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/categoris">
                    Categoris
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li> */}
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto align-items-lg-center align-items-sm-start mt-sm-3 mt-lg-0  ">
              {tkn ? (
                <>
                  {/* dilivary */}
                  {/* <div className="">
                <i class="fas fa-shipping-fast fs-5  mx-lg-2 "></i>
              </div> */}
                  {totalOrder ? (
                    <>
                      {totalOrder ? (
                        <Link to={"/allorders"}>
                          <span className="py-sm-2 py-lg-0 mx-lg-2">
                            <i className="fas fa-shipping-fast fs-5 fs-5  "></i>
                            <span className="position-absolute translate-middle badge  rounded-pill bg-danger ">
                              {totalOrder}
                            </span>
                          </span>
                        </Link>
                      ) : (
                        <Link to={"/allorders"}>
                          <i className="fas fa-shipping-fast fs-5 fs-5  mx-lg-2"></i>
                        </Link>
                      )}
                    </>
                  ) : (
                    <Link to={"/allorders"}>
                      <i className="fa-solid fa-truck fs-5 fs-5  mx-lg-2"></i>
                    </Link>
                  )}

                  {/* heart */}
                  {/* <div className="">
                <i class="fa-solid fa-heart fs-5  mx-lg-2"></i>
              </div> */}

                  {wishlishCount ? (
                    <Link to={"/wishlist"}>
                      <span className="py-sm-2 py-lg-0 mx-lg-2">
                        <i class="fa-solid fa-heart fs-5  fs-5  "></i>
                        <span className="position-absolute translate-middle badge  rounded-pill bg-danger ">
                          {wishlishCount}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <i className="fa-solid fa-heart fs-5 mx-lg-2"></i>
                  )}

                  {/* cart */}
                  {/* {numOfCartItems ? ( */}

                  {numOfCartItems ? (
                    <Link to={"/cart"}>
                      <span className="py-sm-2 py-lg-0 mx-lg-2">
                        <i className="fa-solid fa-cart-shopping fs-5  "></i>
                        <span className="position-absolute translate-middle badge  rounded-pill bg-danger ">
                          {numOfCartItems}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <Link to={"/cart"}>
                      <i className="fa-solid fa-cart-shopping fs-5  mx-lg-2"></i>
                    </Link>
                  )}

                  <li className="nav-item mx-lg-2">
                    <button
                      onClick={logOut}
                      className=" btn btn-outline-danger"
                    >
                      Logout
                    </button>
                  </li>
                  {/* user profile  */}
                  {/* <li>
                    <Link to={"/profile"}>
                      <button className="mx-lg-2 border-1 border-dark rounded-5   btn">
                        <i class="fa-solid fa-user fs-5  "></i>
                      </button>
                    </Link>
                  </li> */}
                </>
              ) : (
                <>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <i className="me-2 fa-brands fa-youtube"></i>
                    </li>
                    <li className="nav-item">
                      <i className="me-2 fa-brands fa-linkedin"></i>
                    </li>
                    <li className="nav-item">
                      <i className="me-2 fa-brands fa-twitter"></i>
                    </li>
                    <li className="nav-item">
                      <i className="me-2 fa-brands fa-tiktok"></i>
                    </li>
                    <li className="nav-item">
                      <i className="me-2 fa-brands fa-facebook"></i>
                    </li>
                    <li className="nav-item">
                      <i className="me-2 fa-brands fa-instagram"></i>
                    </li>
                  </ul>
                  <li className="nav-item"></li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/Login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
