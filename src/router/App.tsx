import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import DefaultLayout from "../layout/default.layout";
import LandingPage from "../pages/public/home/landing.page";
import EditProfilePage from "../pages/public/edit-profile.page";
import SignInLayout from "../layout/SignInLayout";
import LoginForm from "../components/ui/form/login.form";
import SignUpForm from "../components/ui/form/signup.form";
import RequiredAuth from "../layout/required-auth.layout";
import RequiredNotAuth from "../layout/required-not-auth.layout";

function App() {

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="about" element={<h1>about</h1>} />
      </Route>
      <Route element={<SignInLayout />}>
        <Route element={<RequiredNotAuth />}>
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route path="/signup" element={<SignUpForm/>} />
      </Route>
      <Route element={<RequiredAuth />}>
        <Route path="dashboard" element={<h1>dashboard</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
