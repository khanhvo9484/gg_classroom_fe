import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import LandingPage from "../pages/public/home/landing.page";
import EditProfilePage from "../pages/public/edit-profile.page";
import SignInLayout from "../layout/SignInLayout";
import LoginForm from "./../khoa/LoginForm";
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
        {/* <Route path="/signin" element={<SignIN />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
