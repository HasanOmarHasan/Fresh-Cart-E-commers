import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BtnLoadinf from "../../components/ui/Loading/BtnLoading";
import { Link, useNavigate } from "react-router-dom";
import { TokenCotext } from "../../context/tokenContext";
import { Helmet } from "react-helmet";
// import { CartContext } from "../../context/cartContext";
// import { wishlistContext } from "../../context/wishlistContext";

const schema = Yup.object({
  email: Yup.string().email("Enter valid Email").required(),
  password: Yup.string()
    .min(6, "should not leass than 6 ")
    .max(14, "should not more than 14")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,14}$/gi,
      " please enter Minimum 6 characters, at least one letter and one number"
    ),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setTkn } = useContext(TokenCotext);
  let Navigate = useNavigate();

  // user data will it send
  const userData = {
    email: "",
    password: "",
  };

  // what do in submit
  function onSubmit(values) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        localStorage.setItem("tkn", res.data.token);
        setTkn(res.data.token);

        toast.success(res.data.message, {});
        Navigate("/Home");
        // setTimeout(() => {
        // }, 2500);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 401") {
          // console.log(err.response.data.message);
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
        setIsLoading(false);
      });
  }

  // config formik
  const loginFormik = useFormik({
    initialValues: userData,
    onSubmit,
    validationSchema: schema,
  });

  return (
    <>
      <Helmet>
        <title>Login </title>
      </Helmet>
      <div className=" container pt-5 w-75 m-auto">
        {/*  should link formik to form by */}
        <h2>Login now : </h2>
        <form onSubmit={loginFormik.handleSubmit}>
          <label htmlFor="email"> email : </label>
          <input
            onBlur={loginFormik.handleBlur}
            onChange={loginFormik.handleChange}
            type="email"
            name="email"
            id="email"
            className="form-control mb-3"
            placeholder="email"
            value={loginFormik.values.email}
          />
          {loginFormik.errors.email && loginFormik.touched.email ? (
            <div className="alert alert-danger">{loginFormik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password"> password : </label>
          <input
            onBlur={loginFormik.handleBlur}
            onChange={loginFormik.handleChange}
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
            placeholder="password"
            value={loginFormik.values.password}
          />
          {loginFormik.errors.password && loginFormik.touched.password ? (
            <div className="alert alert-danger">
              {loginFormik.errors.password}
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn bg-main text-light justify-content-end "
            disabled={
              !(
                loginFormik.dirty &&
                loginFormik.isValid &&
                loginFormik.touched.email
              )
            }
          >
            {isLoading ? <BtnLoadinf /> : "Login"}
          </button>
          <div className="d-flex justify-content-between align-items-center mt-5">
            <div className="">
              Don't have account{" "}
              <Link className="text-main" to={"/Register"}>
                {" "}
                register now
              </Link>
            </div>
            <button className=" btn text-main">
              <i class="fa-solid fa-key"></i> Forget password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
