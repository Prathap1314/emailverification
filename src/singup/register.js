// src/Register.jsx

import React, { useState } from "react";
import emailjs from "emailjs-com";
import "react-phone-input-2/lib/style.css";

import PhoneInput from 'react-phone-input-2';
import './form.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!username || username.length < 4 || username.length > 15) {
      errors.username = "Username must be between 4 and 15 characters";
    }
    if (!email || !email.includes("@") || !email.includes(".com")) {
      errors.email = "Enter a valid email address";
    }
    if (!phoneno || phoneno.length < 10) {
      errors.phoneno = "Enter a valid phone number";
    }
    if (!password || password.length < 5 || password.length > 15) {
      errors.password = "Password must be between 5 and 15 characters";
    }
    if (password !== confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
    return true;
  };

  const sendOtp = () => {
    if (!email || !email.includes("@") || !email.includes(".com")) {
      setErrors({ email: "Enter a valid email address" });
      return;
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);

    const templateParams = {
      user_email: email,
      user_otp: otp,
    };

    emailjs.send("service_24l2g68", "template_kuuv7rs", templateParams, "amTKnho2A0rACef13")
      .then(() => {
        setIsOtpSent(true);
        alert("OTP sent to your email");
      })
      .catch(() => {
        alert("Failed to send OTP");
      });
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setIsOtpVerified(true);
      alert("OTP verified");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm() || !isOtpVerified) {
      return;
    }
    alert("Registration Successful");
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmpassword("");
    setErrors({});
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setOtp("");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Registration Form</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="button" onClick={sendOtp} disabled={isOtpSent}>Send OTP</button>
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {isOtpSent && (
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
            <button type="button" onClick={verifyOtp} disabled={isOtpVerified}>Verify OTP</button>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="phoneno">Phone No</label>
          <PhoneInput
            country={'us'}
            value={phoneno}
            onChange={phone => setPhone(phone)}
            containerClass="phone-input-container"
            inputClass="phone-input" 
          />
          {errors.phoneno && <span className="error-message">{errors.phoneno}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(event) => setConfirmpassword(event.target.value)}
          />
          {errors.confirmpassword && <span className="error-message">{errors.confirmpassword}</span>}
        </div>

        <button id="btn" className="btn"type="submit" disabled={!isOtpVerified}>Register</button>
      </form>
    </div>
  );
};

export default Register;
