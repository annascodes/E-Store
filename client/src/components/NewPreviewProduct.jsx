import React from "react";
import { Link } from "react-router-dom";

const NewPreviewProduct = ({ product }) => {
  return (
    <div>
      <div className="text-center my-2 p-1 ">
        <span className=" rounded-lg  p-3 bg-white text-gray-800 text-center font-thin text-5xl tracking-widest">
          PREVIEW
        </span>
      </div>
      {/* images  */}
      <div className="flex flex-row justify-around flex-wrap md:w-1/2 mx-auto">
        {product.images &&
          product.images.map((i, i_i) => {
            return (
              <div>
                <img src={i} className="w-32 m-1" alt="" />
              </div>
            );
          })}
      </div>

      <div className="flex flex-col gap-3    tracking-widest text-sm p-2 md:w-1/2 mx-auto">
        <h1>Name: {product.name}</h1>
        <h1>Description: {product.desc}</h1>
        <h1>Category: {product.category}</h1>
        <h1>Gender: {product.gender}</h1>
        <h1>Price: {product.price}</h1>
        <h1>InStock: {product.instock}</h1>
        <h1>
          Sizes: available in
          {product.size && product.size.length == 0 && (
            <span>
              {" "}
              Standard Size{" "}
              <Link className="text-blue-500 underline underline-offset-4">
                (size guidline)
              </Link>{" "}
            </span>
          )}
          <div className="my-2">
            {product.size &&
              product.size.map((s) => {
                return (
                  <span className="border border-black p-1 m-2 ">{s} </span>
                );
              })}
          </div>
        </h1>
        <div>
          Colors: available in
          {product.color && product.color.length == 0 && (
            <span> what shows in display</span>
          )}
          <div className="flex flex-row justify-start">
            {product.color &&
              product.color.map((c) => {
                return (
                  <div
                    style={{ backgroundColor: `${c}` }}
                    className="border w-5 h-5 border-black p-1 m-2 "
                  >
                    {" "}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPreviewProduct;
