import { Outlet } from "react-router-dom";
import Header from "./header/header";
const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <div>FOOTER</div> */}
    </>
  );
};

export default DefaultLayout;
