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

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="profile" element={<ProfilePage />} />

        <Route element={<SignInLayout />}>
          <Route element={<RequiredNotAuth />}>
            <Route path="login" element={<LoginForm />} />
          </Route>
          <Route path="sign-up" element={<SignUpForm />} />
        </Route>
      </Route>

      <Route element={<RequiredAuth />}>
        <Route element={<DefaultLayout />}>
          <Route path="home" element={<HomePage />} />
        </Route>
        <Route path="sign-out" element={<SignOut />} />
      </Route>
    </Routes>
  );
}

export default App;
