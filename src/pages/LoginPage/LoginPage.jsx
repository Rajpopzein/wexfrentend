import React from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation

const LoginPage = () => {
  const navigate = useNavigate();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Set up Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema, // Use the validation schema
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/login",
          values
        );
        if (response.status === 200) {
          localStorage.setItem("token", response.data.data.token);
          navigate("/dashboard");
          toast.success(response.data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Login failed");
      }
    },
  });

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div className="login-main">
      <section className="image_section">
        <img
          className="login_image"
          src="https://blush.design/api/download?shareUri=Yx14I_ypArFKDxbA&c=Hair_0%7Eff00bf-0.1%7E4d33a2_Rainbow_0%7E16c738-0.1%7E008bf7_Skin_0%7Efeb1cd-0.1%7Eef9e89&bg=10375c&w=800&h=800&fm=png"
          alt="login"
        />
        <h3>Welcome Back</h3>
        <p>Just a couple of clicks, then we start</p>
      </section>
      <section className="form_section">
        <div className="login_form_header">
          <h2>Sign In</h2>
        </div>
        <form className="login_form" onSubmit={formik.handleSubmit}>
          <input
            className="input_login_form"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error_message">{formik.errors.email}</div>
          )}
          <input
            className="input_login_form"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error_message">{formik.errors.password}</div>
          )}
          <button className="input_login_form login_btn" type="submit">
            Sign In
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="sigin-up-btn" onClick={handleSignup}>
            Sign Up
          </span>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
