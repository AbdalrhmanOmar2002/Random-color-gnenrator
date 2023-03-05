import React, { useState, useEffect, useCallback } from "react";
import { handleB } from "../utils/utils";

const GenerateColor = ({ color }) => {
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coped, setCoped] = useState("");
  const [hCoped, setHCoped] = useState(false);

  const data = useCallback(
    (color) => handleB(setLoading, color).then((data) => setPalette(data)),
    [],
  );

  const handleCopy = (ele) => {
    navigator.clipboard.writeText(ele);
    setCoped(ele);
    setHCoped(true);
  };

  useEffect(() => {
    data(color);
  }, [data, color]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyC") {
        navigator.clipboard.writeText(palette.join(", "));

        setCoped("palette");
        setHCoped(true);
      }
      if (e.code === "Space") {
        data();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, palette]);

  useEffect(() => {
    setTimeout(() => {
      setHCoped(false);
      clearTimeout();
    }, 5000);
  }, [coped]);

  return (
    <>
      {hCoped && (
        <div className="fixed bg-[#0c1226] top-24 p-3 px-8 text-white rounded-3xl">
          Color {coped === "palette" ? `"${coped}"` : coped} copied to your
          clipboard
        </div>
      )}
      <div className="w-[90%] h-72 flex justify-evenly items-center  max-sm:inline-grid max-sm:col-auto max-sm:grid-cols-3 max-sm:gap-4 max-sm:mb-8">
        {loading ? (
          <h1 className="font-bold text-2xl">Loading...</h1>
        ) : (
          palette?.map((ele) => (
            <div
              key={ele}
              onClick={() => handleCopy(ele)}
              className="pt-2 pl-2 pr-2 rounded-md  bg-[#ffffff]"
            >
              <div
                className="w-40 h-44 flex flex-col items-center justify-end rounded-md cursor-copy max-lg:w-24 max-lg:h-28 max-sm:w-auto"
                style={{ backgroundColor: ele }}
              ></div>
              <h3 className="w-full h-10 flex justify-center items-center cursor-copy font-bold max-sm:font-normal max-sm:h-8">
                {ele}
              </h3>
            </div>
          ))
        )}
      </div>
      <button
        className="bg-[#7e6cca] text-white w-60 h-10 rounded-md"
        onClick={() => data()}
      >
        Generate palette
      </button>
    </>
  );
};

export default GenerateColor;
