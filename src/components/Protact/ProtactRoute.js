import React, { useContext } from "react";
import { TokenCotext } from "../../context/tokenContext";
import { Navigate } from "react-router-dom";

export const ProtactRoute = ({ children }) => {
  const { tkn } = useContext(TokenCotext);
  if (tkn !== null || localStorage.getItem("tkn") !== null) {
    return children;
  }

  return (
    <>
      <Navigate to={"/login"} />;
    </>
  );
};
