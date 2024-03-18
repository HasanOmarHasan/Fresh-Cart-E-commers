import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      {/* <div className=" d-flex justify-content-center align-items-center vh-100"> */}
      <ThreeDots
        visible={true}
        height="400"
        width="150"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="m-auto justify-content-center"
      />
      {/* </div> */}
    </>
  );
}
