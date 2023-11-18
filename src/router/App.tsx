import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/default.layout";
import LandingPage from "../pages/public/home/landing.page";
import EditProfilePage from "../pages/public/edit-profile.page";
import SignInLayout from "../layout/SignInLayout";
import LoginForm from "../components/ui/form/login.form";
import SignUpForm from "../components/ui/form/signup.form";
function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="about" element={<h1>about</h1>} />
        <Route path="dashboard" element={<h1>dashboard</h1>} />
      </Route>
      <Route element={<SignInLayout />}>
        <Route path="/login" element={<LoginForm setAuth={"abc"} />} />
        <Route path="/signup" element={<SignUpForm setAuth={"abc"}/>} />
      </Route>
    </Routes>
  );
}

export default App;
