"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { confirmPasswordReset } from "firebase/auth";
import { toast, Slide } from "react-toastify";
import { auth } from "@/app/lib/firebase";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [oobCode, setOobCode] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setOobCode(searchParams.get("oobCode"));
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "") {
      toast.error("Please enter a password", {
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
    if (confirmPassword === "") {
      toast.error("Please enter a current password", {
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
      confirmPasswordInputRef.current?.focus();
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
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

    if (!oobCode) {
      toast.error("Invalid reset code", {
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

    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Password reset successful!", {
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
      router.push("/Component/Accounts/Login");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password", {
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
          <h2 className="mb-8">Reset Password?</h2>
          <p className="text-gray-600 text-15 mb-32">
            Please enter your new password below.
          </p>

          <form onSubmit={handleResetPassword}>
            <div className="mb-24">
              <label htmlFor="current-password" className="form-label mb-8 h6">
                New Password
              </label>
              <div className="position-relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control py-11 ps-40"
                  id="current-password"
                  placeholder="Enter New Password"
                  ref={passwordInputRef}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <span
                  className="position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y"
                  onClick={togglePasswordVisibility}
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

            <div className="mb-24">
              <label htmlFor="confirm-password" className="form-label mb-8 h6">
                Confirm Password
              </label>
              <div className="position-relative">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  className="form-control py-11 ps-40"
                  id="confirm-password"
                  placeholder="Confirm New Password"
                  ref={confirmPasswordInputRef}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <span
                  className="position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y"
                  onClick={toggleConfirmPasswordVisibility}
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
            </div>
            <button type="submit" className="btn btn-main rounded-pill w-100">
              Set New Password
            </button>

            <Link
              href="/Component/Accounts/Login"
              className="my-32 text-main-600 flex-align gap-8 justify-content-center"
            >
              {" "}
              <i className="ph ph-arrow-left d-flex"></i> Back To Login
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
