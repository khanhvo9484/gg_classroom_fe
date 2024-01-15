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
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
          },
        }}
      />
    </>
  );
};

export default DefaultLayout;
