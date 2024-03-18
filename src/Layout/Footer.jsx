import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="  bg-main-light mt-3">
        <div className="ms-5 pt-5">
          <h4>Get fresh cart app</h4>
          <h6 className="text-muted">
            we will send your link to download in your phone{" "}
          </h6>
        </div>
        <div className="container py-2">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for download</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="emailDownloadApp"
                    id="emailDownloadApp"
                    className="form-control"
                    placeholder=" emailDownloadApp address"
                  />
                </div>
              </div>

              <div className="col-auto">
                <button
                  data-mdb-ripple-init
                  type="submit"
                  className="btn bg-main text-light mb-4"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
          <div className="border-top border-bottom py-3 row d-flex justify-content-between mb-4">
            <div className="col-md-6">
              payment partners{" "}
              <img
                src={require("../assets/images/pngwing.com (2).png")}
                alt=" pay"
                className="ps-3"
                // style={{ width: "50px" }}
                width="100px"
              />
            </div>
            <div className="col-md-6 justify-content-end align-items-end ms-auto">
              Get delivres with frish cart{" "}
              <div className="d-inline-block">
                <img
                  src={require("../assets/images/pngwing.com (3).png")}
                  alt="amazone pay"
                  className="ps-3"
                  // style={{ width: "50px" }}
                  width="100px"
                />{" "}
                <img
                  src={require("../assets/images/pngwing.com (4).png")}
                  alt="amazone pay"
                  className="ps-1"
                  // style={{ width: "50px" }}
                  width="100px"
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
