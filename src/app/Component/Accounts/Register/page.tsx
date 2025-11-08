"use client";
import React, { useState, FormEvent, useRef } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { Slide, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const userNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  const Validation = () => {
    if (!userName) {
      toast.error("User Name is Required", {
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

      userNameInputRef.current?.focus();
      return false;
    }

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
      toast.error("Please enter a valid email address", {
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

    if (password.length <= 8) {
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

      passwordInputRef.current?.focus();
      return false;
    }

    if (password !== Confirmpassword) {
      toast.error("Password and Confirm Password must be the same", {
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
    return true;
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (Validation()) {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
          name: userName,
          email,
          password,
          role: "admin",
        }, { withCredentials: true });

        if (res.data.success) {
          toast.success(res.data.message, {
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

          setUserName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          setTimeout(() => {
            router.push("/component/accounts/login");
          }, 3000);
        } else {
          toast.error(res.data.message, {
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
        }
      } catch (error) {
        toast.error(`Error: ${error}`, {
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
      }
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
            <Link
              href="/component/accounts/register"
              className="auth-right__logo"
            >
              <Image
                src={"/assets/images/logo/Sky-Nova-Logo.png"}
                alt="logo"
                width={75}
                className="w-80 h-[auto]"
                height={100}
                loading="lazy"
              />
            </Link>
            <h2 className="mb-8">Sign Up</h2>
            <p className="text-gray-600 text-15 mb-32">
              Please sign up to your account and start the adventure
            </p>

            <form action="#">
              <div className="mb-24">
                <label htmlFor="username" className="form-label mb-8 h6">
                  {" "}
                  User Name
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control py-11 ps-40"
                    id="userName"
                    ref={userNameInputRef}
                    name="userName"
                    placeholder="Enter User Name"
                    autoFocus
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                    <i className="ph ph-user"></i>
                  </span>
                </div>
              </div>
              <div className="mb-24">
                <label htmlFor="email" className="form-label mb-8 h6">
                  Email{" "}
                </label>
                <div className="position-relative">
                  <input
                    type="email"
                    value={email}
                    ref={emailInputRef}
                    className="form-control py-11 ps-40"
                    id="email"
                    placeholder="Type your email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                    <i className="ph ph-envelope"></i>
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
                    id="password"
                    className="form-control py-11 ps-40"
                    name="password"
                    ref={passwordInputRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password"
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
                <span className="text-gray-900 text-15 mt-4">
                  Must be at least 8 characters
                </span>
              </div>
              <div className="mb-24">
                <label
                  htmlFor="current-password"
                  className="form-label mb-8 h6"
                >
                  Confirm Password
                </label>
                <div className="position-relative">
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    id="password"
                    className="form-control py-11 ps-40"
                    name="password"
                    value={Confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password"
                  />
                  <span
                    className="position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y"
                    onClick={toggleConfirmPasswordVisibility} // Add click event
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={`ph ${
                        isConfirmPasswordVisible ? "ph-eye" : "ph-eye-slash"
                      }`}
                    ></i>
                  </span>
                  <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                    <i className="ph ph-lock"></i>
                  </span>
                </div>
                <span className="text-gray-900 text-15 mt-4">
                  Must be at least 8 characters
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-main rounded-pill w-100"
                onClick={handleRegister}
              >
                Sign Up
              </button>
              <p className="mt-32 text-gray-600 text-center">
                Already have an account?
                <Link
                  href="/component/accounts/login"
                  className="text-main-600 hover-text-decoration-underline"
                  style={{ marginLeft: "5px", fontWeight: "bold" }}
                >
                  {" "}
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
