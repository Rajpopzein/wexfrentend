import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginPage/LoginPage.css";
import "./SignupPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation

const LoginPage = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    name: "",
    cnfpassword: "",
  });

  const handleSignup = async () => {
    navigate("/");
  };

  // Define Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cnfpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: formdata,
    validationSchema, // Use the validation schema
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://wexbackend-1.onrender.com/api/users/create_user",
          values
        );
        if (response.status === 201) {
          toast.success("Signup Successful");
          navigate("/");
          formik.resetForm(); // Reset the form after successful signup
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Signup failed");
      }
    },
  });

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
          <h2>Create Account</h2>
        </div>
        <form className="login_form" onSubmit={formik.handleSubmit}>
          <input
            className="input_login_form"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            placeholder="Name"
            id="name"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error_message">{formik.errors.name}</div>
          )}
          <input
            className="input_login_form"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            placeholder="Email"
            id="email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error_message">{formik.errors.email}</div>
          )}
          <div className="passwordSession">
            <input
              className="input_login_form"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              id="password"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error_message">{formik.errors.password}</div>
            )}
            <input
              className="input_login_form"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cnfpassword}
              type="password"
              id="cnfpassword"
              placeholder="Confirm Password"
            />
            {formik.touched.cnfpassword && formik.errors.cnfpassword && (
              <div className="error_message">{formik.errors.cnfpassword}</div>
            )}
          </div>
          <button className="input_login_form login_btn" type="submit">
            Sign Up
          </button>
        </form>
        <p>
          Already a member?{" "}
          <span className="sign-in-btn" onClick={handleSignup}>
            Sign In
          </span>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
