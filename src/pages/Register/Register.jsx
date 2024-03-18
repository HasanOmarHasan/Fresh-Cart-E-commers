import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BtnLoadinf from "../../components/ui/Loading/BtnLoading";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const schema = Yup.object({
  name: Yup.string()
    .required("must be require")
    .min(3, "should not less 4 charcter "),
  email: Yup.string().email("Enter valid Email").required(),
  password: Yup.string()
    .min(6, "should not leass than 6 ")
    .max(14, "should not more than 14")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,14}$/gi,
      " please enter Minimum 6 characters, at least one letter and one number"
    ),
  rePassword: Yup.string()
    .min(6, "should not leass than 6 ")
    .max(14, "should not more than 14"),
  phone: Yup.string()
    .required()
    .matches(/^01[0-25][0-9]{8}$/, "Ener Egyption number"),
});

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  let Navigate = useNavigate();

  // user data will it send
  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  // what do in submit
  function onSubmit(values) {
    // console.log("submit .....", values);
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        toast.success(res.data.message, {});
        setTimeout(() => {
          Navigate("/login");
        }, 3500);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {});
        setIsLoading(false);
      });
  }

  // config formik
  const registerFormik = useFormik({
    initialValues: userData,
    onSubmit,
    // validate(values) {
    //   // console.log(values)
    //   let errors = {};
    //   const validName = /^[A-Za-z][A-Za-z0-9 _]{4,14}$/;
    //   const validPhone = /^01[0125][0-9]{8}$/;
    //   const validEmail =
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   const validPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;

    //   if (validName.test(values.name) === false) {
    //     errors.name = "should name not less than 4 and not more of 14";
    //   }
    //   if (validPhone.test(values.phone) === false) {
    //     errors.phone = "please enter egyption number phone ";
    //   }
    //   if (validEmail.test(values.email) === false) {
    //     errors.email = "please enter valid e-mail  ";
    //   }
    //   if (validPass.test(values.password)) {
    //     errors.password =
    //       " please enter Minimum 6 characters, at least one letter and one number";
    //   }
    //   if (values.rePassword !== values.password) {
    //     errors.rePassword = " password not matct";
    //   }

    //   // console.log(errors)
    //   return errors;
    // },
    validationSchema: schema,
  });

  return (
    <>
      <Helmet>
        <title> Register</title>
      </Helmet>
      <div className=" container pt-5 w-75 m-auto">
        {/*  should link formik to form by */}
        <h2>Register now : </h2>
        <form onSubmit={registerFormik.handleSubmit}>
          <label htmlFor="name"> name : </label>
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            type="text"
            name="name"
            id="name"
            className="form-control mb-3"
            placeholder="name"
            value={registerFormik.values.name}
          />

          {registerFormik.errors.name && registerFormik.touched.name ? (
            <div className="alert alert-danger">
              {registerFormik.errors.name}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="email"> email : </label>
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            type="email"
            name="email"
            id="email"
            className="form-control mb-3"
            placeholder="email"
            value={registerFormik.values.email}
          />
          {registerFormik.errors.email && registerFormik.touched.email ? (
            <div className="alert alert-danger">
              {registerFormik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password"> password : </label>
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
            placeholder="password"
            value={registerFormik.values.password}
          />
          {registerFormik.errors.password && registerFormik.touched.password ? (
            <div className="alert alert-danger">
              {registerFormik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword"> rePassword : </label>
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control mb-3"
            placeholder="rePassword"
            value={registerFormik.values.rePassword}
          />
          {registerFormik.errors.rePassword &&
          registerFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {registerFormik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone"> phone : </label>
          <input
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
            type="text"
            name="phone"
            id="phone"
            className="form-control mb-3"
            placeholder="phone"
            value={registerFormik.values.phone}
          />
          {registerFormik.errors.phone && registerFormik.touched.phone ? (
            <div className="alert alert-danger">
              {registerFormik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn bg-main text-light justify-content-end "
            disabled={!(registerFormik.dirty && registerFormik.isValid)}
          >
            {isLoading ? <BtnLoadinf /> : "Register"}
          </button>
          <div className="mt-5">
            Already have account {" "}
            <Link className="text-main" to={"/login"}>
              {" "}
              Login now
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
