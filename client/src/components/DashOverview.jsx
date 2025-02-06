import React, { useEffect, useState } from "react";
import "flowbite";
import { Link } from "react-router-dom";
const DashOverview = () => {

   
  const [orderStats, setOrderStats] = useState([]);
  const [productStats, setProductStats] = useState([])
  const getOrderStats = async () => {
    try {
      const res = await fetch(`/api/order/stats`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data);
        setOrderStats(data);

        console.log(Object.keys(data).length);
        //  for (let i=0; i<Object.keys(data).length; i++){

        //  }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getProductStats = async () => {
    try {

      const res = await fetch(`/api/product/getstats`)
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        console.log(data)
        setProductStats(data)
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getProductStats();
    getOrderStats();
  }, []);
  console.log(orderStats);
  
  return (
    <div className="  border-black">
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center font-extrabold text-3xl mt-10 tracking-widest mx-1">
        OVERVIEW
      </h1>
      {/* orders related  */}
      <div className="  border-black">
        <h1 className="  ml-5 py-1 px-5 md:w-3/12 bg-gray-900 text-gray-100  font-extrabold text-3xl mt-10 tracking-widest mx-1">
          orders <span className="text-xs">(related)</span>
        </h1>
        <div className="flex flex-row flex-wrap gap-2 justify-around    border-4 border-gray-900 p-4 mx-5 -mt-1">
          {orderStats && (
            <div className="w-52    border-gray-900 rounded-xl ">
              <div className="text-blue-600 font-bold p-2  rounded-xl bg-blue-200 ">
                <i className="m-2 fa-solid fa-clipboard-list"></i>
                <span>
                  Total Orders{" "}
                  <span className=" text-3xl "> {orderStats.totalOrders}</span>{" "}
                </span>
              </div>
            </div>
          )}
          {orderStats && (
            <div className="w-52   border-gray-900 rounded-xl">
              <h1 className="text-center text-5xl font-extrabold "> </h1>
              <div className="text-green-600 font-bold p-2  rounded-xl bg-green-200 ">
                <i className="mx-2 fa-solid fa-square-check"></i>
                <span>
                  Delivered
                  <span className=" text-3xl ">
                    {" "}
                    {orderStats.statusDelivered &&
                      orderStats.statusDelivered.length}
                  </span>{" "}
                </span>
              </div>
            </div>
          )}
          {orderStats && (
            <div className="w-52 border-0 border-gray-900 rounded-xl">
              <h1 className="text-center text-5xl font-extrabold "> </h1>
              <div className="text-yellow-600 font-bold p-2  rounded-xl bg-yellow-200 ">
                <i className="mx-2 fa-solid fa-truck-fast"></i>
                <span>
                  Dispatched
                  <span className=" text-3xl ">
                    {" "}
                    {orderStats.statusDispatched &&
                      orderStats.statusDispatched.length}
                  </span>
                </span>
              </div>
            </div>
          )}
          {orderStats && (
            <div className="w-52 border-0 border-gray-900 rounded-xl p-0">
              <h1 className="text-center text-5xl font-extrabold "></h1>
              <div className="text-amber-600 font-bold p-2  rounded-xl bg-amber-200 ">
                <i className="mx-2 fa-solid fa-hourglass-start"></i>
                <span>
                  Processing
                  <span className=" text-3xl ">
                    {" "}
                    {orderStats.statusProcessing &&
                      orderStats.statusProcessing.length}{" "}
                  </span>
                </span>
              </div>
            </div>
          )}
          {orderStats && (
            <div className="w-52 border-0 border-gray-900 rounded-xl p-0">
              <h1 className="text-center text-5xl font-extrabold "></h1>
              <div className="text-red-600 font-bold p-2  rounded-xl bg-red-200 ">
                <i className="mx-2 fa-solid fa-rectangle-xmark"></i>
                <span>
                  Cancelled
                  <span className=" text-3xl ">
                    {" "}
                    {orderStats.statusCancelled &&
                      orderStats.statusCancelled.length}{" "}
                  </span>
                </span>
              </div>
            </div>
          )}
          {orderStats && (
            <div className="w-52 border-0 border-gray-900 rounded-xl p-0">
              <h1 className="text-center text-5xl font-extrabold "></h1>
              <div className="text-gray-300 font-bold p-2  rounded-xl bg-red-500 ">
                <i className="m-2 fa-regular fa-eye-slash"></i>
                <span>
                  Not seen yet
                  <span className=" text-3xl ">
                    {" "}
                    {orderStats.notSeenOrders &&
                      orderStats.notSeenOrders.length}{" "}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* orders related  */}
      <div className="  border-black">
       
        <h1 className="  ml-5 py-1 px-5 md:w-3/12 bg-gray-900 text-gray-100  font-extrabold text-3xl mt-10 tracking-widest mx-1">
          products <span className="text-xs">(related)</span>
        </h1>
        <div className="flex flex-row flex-wrap gap-2 justify-around    border-4 border-gray-900 p-4 mx-5 -mt-1">
          <div className="border border-black p-2 tracking-widest">
            Total Products
            <span className="font-extrabold text-lg tracking-widest">
              <i className="text-lg mx-1 fa-solid fa-arrow-right"></i>
              {productStats && productStats.totalProducts}
            </span>
          </div>
          <div className="border border-black p-2 tracking-widest">
            Men
            <i className="text-lg mx-1 fa-solid fa-arrow-right"></i>
            {productStats.menProducts && productStats.menProducts.length}
            <span className="font-extrabold text-lg tracking-widest"></span>
            <span className=" font-extrabold text-lg mx-2">|</span>
            Women
            <i className="text-lg mx-1 fa-solid fa-arrow-right"></i>
            {productStats.womenProducts && productStats.womenProducts.length}
            <span className="font-extrabold text-lg tracking-widest"></span>
          </div>

          {productStats.stats &&
            productStats.stats.map((c) => {
              return (
                <div className="border border-black p-2">
                  {c.categoryName}
                  <i className="text-lg mx-1 fa-solid fa-arrow-right"></i>
                  <span className="font-extrabold text-lg tracking-widest">
                    {" "}
                    {c.data.length}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DashOverview;

{
  /* --- orders overview  */
}
