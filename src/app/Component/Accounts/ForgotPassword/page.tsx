"use client";
import React, { FormEvent, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, Slide } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    try {
      // Local
      const response = await fetch(`/api/Email/${email}`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      


      const data = await response.json();

      if (data.success) {
        toast.success("Password reset email sent successfully!", {
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
      } else {
        toast.error("Failed to send reset email. Please try again.", {
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
      toast.error("Something went wrong!");
    }

    // alert(email);
  };

  return (
    <section className="auth d-flex">
      <div className="auth-left bg-main-50 flex-center">
        <Image
          src="/assets/images/School.jpeg"
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
            href="/Component/Accounts/ForgotPassword"
            className="auth-right__logo"
          >
            <Image
              src={"/assets/images/logo/logo.png"}
              alt="logo"
              width={200}
              className="w-100 h-[auto]"
              height={100}
              loading="lazy"
            />
          </Link>
          <h2 className="mb-8">Forgot Password?</h2>
          <p className="text-gray-600 text-15 mb-32">
            Lost your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </p>

          <form action="#">
            <div className="mb-24">
              <label htmlFor="email" className="form-label mb-8 h6">
                Email{" "}
              </label>
              <div className="position-relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control py-11 ps-40"
                  id="email"
                  placeholder="Type your email address"
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-envelope"></i>
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-main rounded-pill w-100"
              onClick={handleForgotPassword}
            >
              Send Reset Link
            </button>

            <Link
              href="/Component/Accounts/Login"
              className="my-32 text-main-600 flex-align gap-8 justify-content-center"
            >
              {" "}
              <i className="ph ph-arrow-left d-flex"></i> Back To Login
            </Link>

            <ul className="flex-align gap-10 flex-wrap justify-content-center">
              <li>
                <a
                  href="https://www.facebook.com"
                  className="w-38 h-38 flex-center rounded-6 text-facebook-600 bg-facebook-50 hover-bg-facebook-600 hover-text-white text-lg"
                >
                  <i className="ph-fill ph-facebook-logo"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  className="w-38 h-38 flex-center rounded-6 text-twitter-600 bg-twitter-50 hover-bg-twitter-600 hover-text-white text-lg"
                >
                  <i className="ph-fill ph-twitter-logo"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com"
                  className="w-38 h-38 flex-center rounded-6 text-google-600 bg-google-50 hover-bg-google-600 hover-text-white text-lg"
                >
                  <i className="ph ph-google-logo"></i>
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
