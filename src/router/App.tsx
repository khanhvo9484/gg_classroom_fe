import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/default.layout";
import LandingPage from "../pages/public/home/landing.page";
import SignInLayout from "../layout/sign-in.layout";
import LoginForm from "../components/ui/form/login.form";
import SignUpForm from "../components/ui/form/signup.form";
import RequiredAuth from "../layout/required-auth.layout";
import RequiredNotAuth from "../layout/required-not-auth.layout";
import SignOut from "../components/signout.component";
import ProfilePage from "../pages/public/profile.page";
import HomePage from "../pages/public/home/home.page";
import SuccessPage from "@/pages/public/static/success.page";
import RecoverPasswordForm from "../components/ui/form/recover_password.form";
import VerifyEmail from "@/pages/public/verify.email.page";
import RecoveryChangePasswordForm from "@/components/ui/form/recovery-change-password.form";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<LandingPage />} />
        <Route element={<SignInLayout />}>
          <Route path="recover-password" element={<RecoverPasswordForm />} />
          <Route element={<RequiredNotAuth />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="sign-up" element={<SignUpForm />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="recovery-change-password" element={<RecoveryChangePasswordForm />} />
          </Route>
        </Route>
      </Route>

      <Route element={<RequiredAuth />}>
        <Route element={<DefaultLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="sign-out" element={<SignOut />} />
      </Route>

      <Route path="success-page" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
