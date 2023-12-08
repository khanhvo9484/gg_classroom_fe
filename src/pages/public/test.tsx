import React from "react";
import { customAxios } from "@/api/custom-axios";
const Test = () => {
  return (
    <div
      onClick={() => {
        customAxios
          .get("/auth/protected")
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
      style={{ cursor: "pointer" }}
    >
      Request protected route
    </div>
  );
};

export default Test;
