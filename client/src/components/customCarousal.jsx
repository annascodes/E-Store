import React, { useState } from "react";
import "flowbite";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const fakePics = [
    "https://images.unsplash.com/photo-1589561818145-eb2a4ba71a3c?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1585221140117-5bc4baee9cd1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1585389490368-924a3be18e3d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1585904529540-db52ff70f4c6?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1586293403445-ffa224197984?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1526112455121-272736767b9e?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const [count, setCount] = useState(0);
  const { bag } = useSelector((state) => state.product);
  return (
    <div>
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center font-extrabold text-3xl mt-10 tracking-widest mx-1">
        custom carousal
      </h1>
      <div className="relative     my-10 md:m-20 py-10 border-4 border-gray-500 rounded-3xl ">
        {/* --name of carousl--  */}
        <div className=" flex flex-row justify-center absolute -top-4 w-full">
          <h1 className=" px-5 rounded-3xl bg-gray-500 font-extrathin tracking-widest text-gray-200">
            NEW ARRIVALS
          </h1>
        </div>
        <img
          src={
            fakePics[count] ||
            "https://loading.io/assets/mod/spinner/spinner/lg.gif"
          }
          className=" w-4/5  h-80 object-cover mx-auto shadow-2xl"
          alt=""
        />
        {/* ---buttons  */}
        <div className="absolute opacity-50 top-1/2    border-black flex flex-row justify-between w-full">
          <button
            onClick={() => {
              if (count === 0) {
                setCount(fakePics.length - 1);
              } else {
                setCount(count - 1);
              }
            }}
            className="  border-black m-1  py-1 px-2 hover:bg-blue-200 rounded-3xl"
          >
            <i className=" text-3xl fa-solid fa-arrow-left"></i>
          </button>
          <button
            onClick={() => {
              if (count === fakePics.length - 1) {
                setCount(0);
              } else {
                setCount(count + 1);
              }
            }}
            className="  border-black m-1 py-1 px-2 hover:bg-blue-200 rounded-3xl"
          >
            <i className=" text-3xl fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* --bullets--  */}
        <div className="flex flex-row justify-center mt-10 w-5/5 mx-auto   border-black   ">
          {fakePics.map((i, idx) => {
            return (
              // <div style={count === idx ? {fontSize:'30px',borderBottom:'2px solid black'}:{} } className="  shadow-2xl mx-3 ">{idx+1}</div>
              <div
                style={count === idx ? { backgroundColor: "gray" } : {}}
                className="w-2 h-2 shadow-2xl border border-gray-500 rounded-full mx-1"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
