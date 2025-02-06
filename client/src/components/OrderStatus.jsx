import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [error, setError] = useState(null);
  const getOrder = async () => {
    try {
      const res = await fetch(`/api/order/getorder/${id}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
      } else {
        console.log(data);
        setOrder(data);
        setError(null);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="p-5">
      {error && (
        <div
          className="md:w-2/5 mt-10 mx-1 md:mx-auto p-4 mb-4 text-sm text-red-200 rounded-lg bg-red-700 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">!!! The order does not exist</span>
        </div>
      )}

      {order && (
        <div className="px-10">
          <h1 className=" mt-10">
            Your order was placed on
            <span className="bg-yellow-200 mx-2">
              {" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </h1>
          <h1 className="">
            Order status is{" "}
            <span className="bg-yellow-200 mx-2 px-1"> {order.status} </span>
          </h1>
        </div>
      )}
      {!error && (
        <div className="tracking-widest  text-xs relative overflow-x-auto">
          <table className="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr #
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  size
                </th>
                <th scope="col" className="px-6 py-3">
                  qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order && order.items &&
                order.items.map((o, indx) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {indx + 1}
                      </th>
                      <th
                        scope="row"
                        className="text-xs px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {o.product.name}
                      </th>
                      <td className=" px-6 py-4">
                        <div
                          style={
                            o.color ? { backgroundColor: `${o.color}` } : {}
                          }
                          className="w-4 h-4 rounded-full border border-gray-400 "
                        ></div>
                      </td>
                      <td className="text-xs px-6 py-4">{o.size ? o.size:'standard'}</td>
                      <td className="text-xs px-6 py-4">{o.qty}</td>
                      <td className="text-xs px-6 py-4">${o.subTotal}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
