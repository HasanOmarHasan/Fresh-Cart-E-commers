import React from "react";
import {  Oval } from "react-loader-spinner";

export default function BtnLoading() {
  return (
    <>
      {/* <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}
      {/* <InfinitySpin
        visible={true}
        width="100"
        color="#fff"
        ariaLabel="infinity-spin-loading"
      /> */}
      <Oval
        visible={true}
        height="25"
        width="25"
        color="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
}
