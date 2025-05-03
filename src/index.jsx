import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SignUp } from "./screens/SignUp";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignIn } from "./screens/SignIn";
import { ForgetPassword } from "./screens/ForgetPassword/ForgetPassword";
import { SendOtp } from "./screens/SendOtp/SendOtp";
import { ResetPassword } from "./screens/ResetPassword/ResetPassword";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}    />
        <Route path="/signin" element={<SignIn/>}    />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/send-code" element={<SendOtp/>} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
    
  </StrictMode>
);