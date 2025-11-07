"use client";
import React, { useState, FormEvent, useRef } from "react";
import Image from "next/image";
import { Slide, toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const Validation = () => {
    if (!email) {
      toast.error("Email is Required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      emailInputRef.current?.focus();
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Invalid Email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      emailInputRef.current?.focus();
      return false;
    }
    if (!password) {
      toast.error("Password is Required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });

      passwordInputRef.current?.focus();
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });

      return false;
    }

    return true;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!Validation()) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        { email, password },
        { withCredentials: true } // ensures cookies are sent/received
      );

      if (res.data.success) {
        Cookies.set(".AuthBearer", res.data.token, {
          expires: 7, // expires in 7 days
          secure: true, // only sent over HTTPS
          sameSite: "strict",
        });

        // Optionally store user info (non-sensitive)
        Cookies.set("user", JSON.stringify(res.data.user), {
          expires: 7,
          sameSite: "strict",
        });

        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Slide,
        });

        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/Component/Admin/Dashboard");
        }, 2000);
      } else {
        toast.error(res.data.message || "Login failed", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error: any) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Slide,
        }
      );
    }
  };

  return (
    <>
      <section className="auth d-flex">
        <div className="auth-left bg-main-50 flex-center">
          <Image
            src="/assets/images/Plane.avif"
            alt=""
            width={500}
            height={500}
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
            quality={100}
          />
        </div>
        <div className="auth-right py-40 px-24 flex-center flex-column">
          <div className="auth-right__inner mx-auto w-100">
            <Link href="/Component/Accounts/Login" className="auth-right__logo">
              <Image
                src={"/assets/images/logo/Sky-Nova-Logo.png"}
                alt="logo"
                width={75}
                className="w-80 h-[auto]"
                height={100}
                loading="lazy"
              />
            </Link>
            <div className="mb-20">
              <h5 className="text-gray-500 mb-1">Welcome Back</h5>
              <h1
                className="text-4xl font-bold text-gray-900"
                style={{ fontWeight: "bold" }}
              >
                Sky Nova Travels
              </h1>
              <p className="text-gray-600 text-15 mt-4">
                Sign in to your account to manage bookings, flights, and
                customer information with ease.
              </p>
            </div>

            <form action="#">
              <div className="mb-24">
                <label htmlFor="fname" className="form-label mb-8 h6">
                  Email
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    ref={emailInputRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="form-control py-11 ps-40"
                    id="fname"
                    placeholder="Type your username"
                  />
                  <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                    <i className="ph ph-user"></i>
                  </span>
                </div>
              </div>
              <div className="mb-24">
                <label
                  htmlFor="current-password"
                  className="form-label mb-8 h6"
                >
                  Password
                </label>
                <div className="position-relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="form-control py-11 ps-40"
                    id="current-password"
                    placeholder="Enter Current Password"
                    ref={passwordInputRef}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <span
                    className="position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y"
                    onClick={togglePasswordVisibility} // Add click event
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={`ph ${
                        isPasswordVisible ? "ph-eye" : "ph-eye-slash"
                      }`}
                    ></i>
                  </span>
                  <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                    <i className="ph ph-lock"></i>
                  </span>
                </div>
              </div>
              <div className="mb-32 flex-between flex-wrap gap-8">
                <Link
                  href="/Component/Accounts/ForgotPassword"
                  className="text-main-600 hover-text-decoration-underline text-15 fw-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-main rounded-pill w-100"
                onClick={handleLogin}
              >
                Sign In
              </button>
              <p className="mt-32 text-gray-600 text-center">
                New on our platform?
                <Link
                  href="/Component/Accounts/Register"
                  className="text-main-600 hover-text-decoration-underline"
                  style={{ marginLeft: "5px", fontWeight: "bold" }}
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
