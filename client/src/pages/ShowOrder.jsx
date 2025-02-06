import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ShowOrder = () => {
  const {currentUser} = useSelector(state=>state.user)
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [err, setErr] = useState(null);

  const handleIsSeen = async()=>{
    console.log('going to mark it seen')
    try {
      const res = await fetch( `/api/order/markitseen/${id}`,
      {
        method:'put'
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }
      else{
        console.log(data)
        setOrder({...order, isSeen:true})
      }
    } catch (error) {
      console.log(error.message)
      setErr(error.message)
    }
  }

  const getOrder = async () => {
    try {
      const res = await fetch(`/api/order/getorder/${id}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data);
        setOrder(data);
      }
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="md:w-8/12 py-2 mx-auto">
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center font-extrabold text-3xl mt-10 tracking-widest mx-1">
        Order Details
      </h1>
      {/* --- status  */}
      <div className=" w-48 tracking-widest bg-gray-900 mx-5 my-5 p-2 rounded-xl ">
        <h1 className="text-center text-xl font-extrabold text-gray-200">
          Status
        </h1>
        {order && order.status === "processing" && (
          <div className="text-amber-600 font-bold p-2  rounded-xl bg-amber-200 ">
            <i className="mx-2 fa-solid fa-hourglass-start"></i>
            <span>Processing</span>
          </div>
        )}
        {order && order.status === "cancelled" && (
          <div className="text-red-600 font-bold p-2  rounded-xl bg-red-200 ">
            <i className="mx-2 fa-solid fa-rectangle-xmark"></i>
            <span>Cancelled</span>
          </div>
        )}
        {order && order.status === "delivered" && (
          <div className="text-green-600 font-bold p-2  rounded-xl bg-green-200 ">
            <i className="mx-2 fa-solid fa-square-check"></i>
            <span>Delivered</span>
          </div>
        )}
        {order && order.status === "dispatched" && (
          <div className="text-yellow-600 font-bold p-2  rounded-xl bg-yellow-200 ">
            <i className="mx-2 fa-solid fa-truck-fast"></i>
            <span>Dispatched</span>
          </div>
        )}
      </div>

      {/* --- table  */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="py-1 px-5   text-lg font-extrabold text-left rtl:text-right text-gray-600 bg-white dark:text-white dark:bg-gray-800">
            Order placed on{" "}
            <span className="font-semibold tracking-widest border-2 border-gray-600 p-1 rounded-xl">
              {new Date(order.createdAt).toLocaleDateString()}
              <span className="text-xs"> (m/d/y)</span>
            </span>
          </caption>

          <caption className="p-5 text-lg font-extrabold text-left rtl:text-right text-gray-600 bg-white dark:text-white dark:bg-gray-800">
            ORDER INVOICE #{" "}
            <span className="font-semibold tracking-widest border-2 border-gray-600 p-1 rounded-xl">
              {id}
            </span>
          </caption>
          <caption className="px-5  my-2 text-lg font-extrabold text-left rtl:text-right text-gray-600 bg-white dark:text-white dark:bg-gray-800">
            CUSTOMER NAME{" "}
            <span className="font-semibold tracking-widest border-2 border-gray-600 p-1 rounded-xl">
              {order.user_name}
            </span>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr no.
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                size / color
              </th>
              {currentUser && currentUser.isAdmin && (
                <>
                  <th scope="col" className="px-6 py-3">
                    in-stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ordered qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    will be left
                  </th>
                </>
              )}
              <th scope="col" className="px-6 py-3">
                sub-total
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items &&
              order.items.map((o, o_i) => {
                return (
                  <tr key={o_i} className="bg-white dark:bg-gray-800">
                    <td className="max-w-2   border-black px-6 py-4">
                      {o_i + 1}
                    </td>
                    <th
                      scope="row"
                      className="max-w-10  text-xs  border-black  font-medium text-gray-900   dark:text-white"
                    >
                      {o.product.name}
                    </th>
                    <td className="px-6 py-4">
                      {o.size || "standard"} /
                      <div
                        style={o.color ? { backgroundColor: `${o.color}` } : {}}
                        className="w-4 h-4 border border-black rounded-xl"
                      ></div>
                    </td>
                    {currentUser && currentUser.isAdmin && (
                      <>
                        <td className="px-6 py-4">
                          {o.product.instock} in-stock
                        </td>
                        <td className="px-6 py-4">{o.qty} ordered</td>
                        <td className="px-6 py-4">
                          {o.product.instock - o.qty} will be left
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4">
                      (${o.product.price} x {o.qty})
                      <span className="font-bold tracking-widest ml-2">
                        ${o.subTotal}
                      </span>{" "}
                    </td>
                  </tr>
                );
              })}
            {/* --grand total  */}
            <tr className=" bg-gray-900 text-gray-200 dark:bg-gray-800">
              <td className="max-w-2   border-black px-6 py-4"></td>
              <th
                scope="row"
                className="max-w-10  text-lg  border-black tracking-widest  font-bold    dark:text-white"
              >
                Grand Total
              </th>
              <td className="px-6 py-4"> </td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">
                <span className="font-bold text-lg tracking-widest ml-2">
                  ${order.grandTotal}
                </span>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {currentUser && currentUser.isAdmin && (
        <>
          {/* --- isSeen  */}
          {order && (
            <div className="  border-black flex flex-row justify-center">
              <button
                onClick={handleIsSeen}
                disabled={order.isSeen}
                className="disabled:cursor-not-allowed relative rounded-xl  p-5 mt-5 underline underline-offset-4   hover:scale-125 duration-500 bg-zinc-900 text-zinc-200 hover:text-zinc-400"
              >
                {order.isSeen ? "Seen" : "Mark it seen"}
                {!order.isSeen && (
                  <div className="absolute -top-2 -right-2">
                    <span className="relative flex w-5 h-5 ">
                      <span className=" animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full w-5 h-5  bg-red-500" />
                    </span>
                  </div>
                )}
              </button>
            </div>
          )}
          {/* --change status  */}
          <div className=" w-48 tracking-widest bg-gray-900 mx-5 my-5 p-2 rounded-xl ">
            <h1 className="text-center text-xl font-extrabold text-gray-200">
              change status to
            </h1>
            {order && order.status !== "processing" && (
              <button className="text-amber-600 hover:underline underline-offset-4 font-bold p-2 my-1  rounded-xl bg-amber-200 ">
                <i className="mx-2 fa-solid fa-hourglass-start"></i>
                <span>Processing</span>
              </button>
            )}
            {order && order.status !== "cancelled" && (
              <button className="text-red-600 hover:underline underline-offset-4 font-bold p-2 my-1  rounded-xl bg-red-200 ">
                <i className="mx-2 fa-solid fa-rectangle-xmark"></i>
                <span>Cancelled</span>
              </button>
            )}
            {order && order.status !== "delivered" && (
              <button className="text-green-600 hover:underline underline-offset-4 font-bold p-2 my-1  rounded-xl bg-green-200 ">
                <i className="mx-2 fa-solid fa-square-check"></i>
                <span>Delivered</span>
              </button>
            )}
            {order && order.status !== "dispatched" && (
              <button className="text-yellow-600 hover:underline underline-offset-4 font-bold p-2 my-1  rounded-xl bg-yellow-200 ">
                <i className="mx-2 fa-solid fa-truck-fast"></i>
                <span>Dispatched</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowOrder;
