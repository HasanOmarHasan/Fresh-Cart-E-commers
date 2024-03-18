import React from "react";
import notFoundImg from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <div className="d-flex justify-content-sm-center  pt-5 px-sm-2">
        <img src={notFoundImg} alt="" className="" />
      </div>
    </>
  );
}
