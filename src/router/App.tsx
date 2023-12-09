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
import NotVerify from "@/pages/public/not.verify.page";
import VerifySignUpPage from "@/pages/public/static/verify-sign-up.page";
import Test from "@/pages/public/test";
import ClassPage from "@/pages/class-page/class.page";
import NewsClassPage from "@/pages/class-page/news-class.page";
import MembersPage from "@/pages/class-page/members.page";
import Header from "@/layout/header/main.header";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test></Test>} />
      <Route path="/main-header" element={<Header></Header>} />
      <Route element={<DefaultLayout />}>
        <Route index element={<LandingPage />} />
        <Route element={<SignInLayout />}>
          <Route path="recover-password" element={<RecoverPasswordForm />} />
          <Route element={<RequiredNotAuth />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="sign-up" element={<SignUpForm />} />
            <Route path="auth/verify-email" element={<VerifyEmail />} />
            <Route
              path="auth/reset-password"
              element={<RecoveryChangePasswordForm />}
            />
            <Route path="not-verify" element={<NotVerify />} />
            <Route path="sign-up/verify" element={<VerifySignUpPage />} />
          </Route>
        </Route>
        <Route path="course/:courseId" element={<ClassPage />}>
          <Route path="news" element={<NewsClassPage />} />
          <Route path="members" element={<MembersPage />} />
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
