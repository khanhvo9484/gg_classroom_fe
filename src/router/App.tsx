import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import LandingPage from "../pages/public/home/landing.page";
function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<LandingPage/>} />
        <Route path="about" element={<h1>about</h1>} />
        <Route path="dashboard" element={<h1>dashboard</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
