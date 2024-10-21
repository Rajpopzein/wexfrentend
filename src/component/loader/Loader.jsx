import React from "react";
import "./loader.css";
import { InfinitySpin } from "react-loader-spinner";
import { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="loader_main">
      <InfinitySpin
        visible={true}
        width="200"
        ariaLabel="infinity-spin-loading"
        color="#EB8317"
      />
    </div>
  );
};

export default Loader;
