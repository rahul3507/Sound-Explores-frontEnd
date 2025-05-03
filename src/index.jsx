import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SignUp } from "./screens/SignUp";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignIn } from "./screens/SignIn";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn/>}    />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>
);