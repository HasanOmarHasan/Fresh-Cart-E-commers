import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Payment() {
  const { getUserCart, cardId, totalCartPrice, clearCart } =
    useContext(CartContext);
  const token = localStorage.getItem("tkn");
  const headers = {
    token,
  };
  const nav = useNavigate();
  console.log(cardId, "card id");
  console.log(token, "token ");
  //BUG not work the valuse in form
  function confirmOnlinePayment() {
    const phone = document.getElementById("inputPhone").value;
    const city = `${document.getElementById("inputCity").value} ${
      document.getElementById("inputStat").value
    } ${document.getElementById("inputZip").value}`;

    const details = document.getElementById("details").value;

    const shippingAddress = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    // console.log(shippingAddress);https://ecommerce.routemisr.com/api/v1/orders/checkout-session/
    // console.log(cardId);
    if (cardId !== null)
      // "http://localhost:3000/allorders"
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}`,
          shippingAddress,
          {
            headers,
            params: {
              URL: document.location.href.split("/", 3).join(""),
            },
          }
        )
        .then((res) => {
          getUserCart();
          clearCart();
          //   console.log(res);
          //   console.log(res.data.session.url);
          window.open(res.data.session.url);
          toast.success("payment complet  seccessfily");
        })
        .catch((err) => {
          console.log(err);
          toast.error("payment error");
        });
  }
  function confirmCashPayment() {
    const phone = document.getElementById("inputPhone").value;
    const city = `${document.getElementById("inputCity").value} ${
      document.getElementById("inputStat").value
    } ${document.getElementById("inputZip").value}`;

    const details = document.getElementById("details").value;

    const shippingAddress = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    console.log(shippingAddress);
    console.log(cardId);
    if (cardId !== null)
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,
          shippingAddress,
          {
            headers,
          }
        )
        .then((res) => {
          getUserCart();
          clearCart();

          toast.success("payment complet  seccessfily");
          //   setTimeout(() => {
          //     nav("/home");
          //   }, 1500);
        })
        .catch((err) => {
          console.log(err);
          toast.error("payment error");
        });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Getway</title>
      </Helmet>
      <div className="container py-5">
        <div className="row container">
          <h2 className="my-3">Payment Details : </h2>
          <div className="col-md-8">
            <form className="row g-3">
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPhone"
                  placeholder=""
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  City
                </label>
                <input type="text" className="form-control" id="inputCity" />
              </div>

              <div className="col-md-2">
                <label htmlFor="inputStat" className="form-label">
                  State
                </label>
                <input type="text" className="form-control" id="inputStat" />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Zip
                </label>
                <input type="text" className="form-control" id="inputZip" />
              </div>

              <label htmlFor="detals">Massage details</label>
              <textarea
                name="details"
                id="details"
                rows="2"
                required
                className="form-control"
              ></textarea>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    save me cridet card
                  </label>
                </div>
              </div>
              <div className=" yt-4 ">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmCashPayment}
                >
                  Confirm Cash pay
                </button>
                <button
                  type="button"
                  className="btn btn-primary  mx-3"
                  onClick={confirmOnlinePayment}
                >
                  Confirm online pay
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 container">
            <p class="fw-bold pt-lg-0 pt-4 pb-2">Payment Summary</p>
            <div class="card px-md-3 px-2 pt-4">
              <div class=" mb-4">
                {" "}
                <span class="py-1"> account</span>{" "}
              </div>
              <div class="d-flex justify-content-between pb-3">
                {" "}
                <small class="text-muted">Transaction code</small>
              </div>
              <div class="d-flex justify-content-between ">
                {" "}
                <input type="text" class="ps-2" placeholder="COUPON CODE" />
                <button class="btn btn-primary">Apply</button>
              </div>
              <div class="d-flex flex-column b-bottom">
                <div class="d-flex justify-content-between py-3">
                  {" "}
                  <small class="text-muted">Order Summary</small>
                  <p>${totalCartPrice} </p>
                </div>
                <div class="d-flex justify-content-between pb-3">
                  {" "}
                  <small class="text-muted">Additional Service</small>
                  <p>$0.0</p>
                </div>
                <div class="d-flex justify-content-between">
                  {" "}
                  <small class="text-muted">Total Amount</small>
                  <p>$ {totalCartPrice}</p>
                </div>
              </div>
              <div class="sale my-3">
                {" "}
                <span>
                  sale<span class="px-1">expiring</span>
                  <span>in</span>:
                </span>
                <span class="text-danger">
                  21<span class="ps-1">hours</span>,31
                  <span class="ps-1 ">minutes</span>
                </span>{" "}
                use code VC115665
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
