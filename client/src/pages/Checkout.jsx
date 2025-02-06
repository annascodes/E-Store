import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyBag } from "../redux/product/productSlice";

const Checkout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { bag } = useSelector((state) => state.product);
  const [grandTotal, setGrandTotal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    let temp = 0;
    bag.map((p) => {
      temp += p.subTotal;
    });
    setGrandTotal(temp);
  });
  const handleSaveOrder = async (paymentType) => {
    try {
      const res = await fetch(`/api/order/createorder`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: currentUser.username,
          items: bag,
          grandTotal: grandTotal,
          status: "processing",
          paymentType
          // processing , dispatched , delivered, cancelled 
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
      } else {
        console.log(data);
        dispatch(emptyBag());
        setError(null);
        // navigate(`/orderstatus/${data._id}`);
        navigate(`/showorder/${data._id}`);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  console.log(currentUser)
  console.log(bag);
  console.log("grandtotal in checkout:", grandTotal);
  return (
    <div className=" tracking-widest   border-black my-10">
      {/* --- reciept --- */}
      <div className="md:mx-auto pb-5 border-dashed  shadow-2xl border-black md:w-4/5 w-full ">
        <h1 className="text-center text-2xl tracking-widest my-5">
          <i className="mr-1 fa-solid fa-receipt"></i>Receipt
        </h1>
        {/* <hr className="border border-black my-3 mx-10" /> */}
        {/* ------items on bill ----  */}
        <div className="">
          <div className="font-bold tracking-widest text-xs flex flex-row  px-4">
            <div className="w-1/2  ">
              <span className="">Sr. #</span>
              <span> name</span>
            </div>

            <div className="  pl-1   w-1/2 flex flex-row justify-between    ">
              <h1 className="mr-2">size/color</h1>
              <h1>qty X price/-</h1>
              <h2>total </h2>
            </div>
          </div>
          {bag &&
            bag.map((p, p_i) => {
              return (
                <div className=" tracking-widest my-4 text-xs flex flex-row  px-4">
                  <div className="w-1/2   border-red-500">
                    <span className="font-bold ">{p_i + 1}-</span>
                    <span> {p.product.name}</span>
                  </div>
                  <div className="w-1/2 flex flex-row justify-between   pl-1">
                    <h1 className="border border-black p-1 m-1">
                      {p.size ? p.size : "standard"} /{" "}
                      <div
                        style={p ? { backgroundColor: `${p.color}` } : {}}
                        className="w-4 h-4 border border-black rounded-full"
                      ></div>
                    </h1>
                    <h1 className="border border-black p-1 m-1">
                      {p.qty} x ${p.product.price}
                    </h1>
                    <h2 className="border border-black p-1 m-1">
                      $ {p.subTotal}.00{" "}
                    </h2>
                  </div>
                </div>
              );
            })}
          <div className="flex flex-row justify-end px-10 font-bold text-gray-600 mb-10">
            <div>
              <h1>Tax Included = $ 0.00 </h1>
              <h1>Grand Total= $ {grandTotal}.00 </h1>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <>
          <div
            className="mx-auto mt-10 md:w-1/2 p-4 mb-4 text-sm text-red-200 rounded-lg bg-red-700 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Danger alert! </span>
            {error}
          </div>
        </>
      )}

      {currentUser ? (
        <div className=" mx-auto mt-10  border-black w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-center">Payment Method</h1>
          <div className="flex flex-col md:flex-row justify-around my-7">
            <div className="">
              <Link
                onClick={() => handleSaveOrder('on delivery')}
                className="bg-black text-white my-1 p-5 hover:scale-110 duration-500 hover:underline underline-offset-8 block  font-thin "
              >
                <i className="mr-1 fa-solid fa-people-carry-box"></i> Payment on
                delivery
              </Link>
            </div>
            <div className="">
              <Link className="bg-black text-white my-1 p-5 hover:scale-110 duration-500 hover:underline underline-offset-8 block font-thin    ">
                <i className="mr-1 fa-regular fa-credit-card"></i>Payment by
                Card
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col justify-center my-10 items-center">
          <div className="md:w-2/5">
            <Link
              to={"/signin"}
              className="bg-black text-white my-1 p-5 hover:scale-110 duration-500 hover:underline underline-offset-8 block font-thin    "
            >
              <i className="mr-1 fa-regular fa-credit-card"></i>Get Sign-In to
              process payment
            </Link>
          </div>
          <p>
            Don't have an account? Lets{" "}
            <Link
              to={"/signup"}
              className="text-blue-500 underline underline-offset-8 hover:text-blue-800"
            >
              Sign-Up.
            </Link>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
