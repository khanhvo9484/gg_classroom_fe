import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";
const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;
