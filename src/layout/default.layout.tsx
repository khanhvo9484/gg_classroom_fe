import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";
import { Toaster } from "react-hot-toast";
const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "66vh",
        }}
      >
        <Outlet />
      </div>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default DefaultLayout;
