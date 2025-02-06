import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { putInBag, totalItems } from "../redux/product/productSlice";

const Bag = () => {
  const { bag, itemsInBag } = useSelector((state) => state.product);
  const [prices, setPrices] = useState({});
  const navigate = useNavigate()
  const [grandTotal, setGrandTotal] = useState(0);
  const [numOfItems, setNumOfItems] = useState(0);

  let [tempBag, setTempBag] = useState([...bag]);
  console.log("tempBag:", tempBag);
  console.log("bag:", bag);

  const dispatch = useDispatch();
   
const handleRemoveFromBag = (r_indx)=>{
console.log(r_indx)
setTempBag(tempBag.filter((o,i)=>i!==r_indx))
}
  const handleGrandTotal = () => {
    let tempTotal = 0;
    let tempItems = 0;
    tempBag.map((b_o, b_indes) => {
      tempTotal += b_o.subTotal;
      tempItems += b_o.qty;
    });
    setGrandTotal(tempTotal);
    setNumOfItems(tempItems);
    dispatch(totalItems(tempItems))
  };
  useEffect(() => {
    handleGrandTotal();
    
  }, []);
  useEffect(() => {
    dispatch(putInBag(tempBag));
    handleGrandTotal();
  }, [tempBag]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* left  */}
      <div className="w-full md:w-4/6">
        <h1 className="  text-4xl mx-5 mt-10 mb-5">
          Your Bag{" "}
          <span className="text-sm">
            ({numOfItems > 1 ? `${numOfItems} items` : `${numOfItems} item`})
          </span>{" "}
        </h1>
        {tempBag.length === 0 && (
          <div className="">
            <h1 className="border-4 border-black border-l-0 border-r-0 m-4 py-5  text-center tracking-widest text-gray-800 text-7xl  font-bold">
              Bag is empty
            </h1>

            <div className="text-center">
              <Link className="bg-black text-white p-2 font-bold tracking-widest hover:underline underline-offset-8">
                Continue shopping
              </Link>
            </div>
          </div>
        )}
        {tempBag &&
          tempBag.map((b_obj, p_index) => {
            return (
              <div
                key={p_index}
                className="flex flex-row flex-wrap justify-start  border-b-2 border-b-gray-500 my-1 mx-2   p-2"
              >
                {/* ---image dive--  */}
                <div className="mx-auto md:mb-10">
                  <img
                    src={b_obj.product.images[0]}
                    className="w-56 rounded-xl shadow-2xl"
                    alt=""
                  />
                </div>
                {/* --- detail div ---  */}
                <div className="mx-auto   md:ml-20  border-red-700 text-gray-500 tracking-widest">
                  <p className="  max-w-64 p-1 pt-0 font-bold tracking-widest">
                    {b_obj.product.name}
                  </p>
                  <p className="p-1 text-xs">Sku: {b_obj.product._id}</p>
                  <p className="p-1 text-xs">
                    Size: {b_obj.size ? b_obj.size : "standard"}
                  </p>
                  <div className="p-1 text-xs">
                    Color: {b_obj.color ? b_obj.color : "default"}{" "}
                    <div
                      style={{ backgroundColor: `${b_obj.color}` }}
                      className="inline-block -mb-1 rounded-xl w-10 h-5"
                    ></div>
                  </div>

                  {/* --- qty div ---  */}
                  <div className="  border-black my-5 p-2 w-1/2">
                    <div className="  flex flex-row justify-between   ">
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("incrementing ", tempBag);

                          setTempBag(
                            tempBag.map((o, c_index) => {
                              if (c_index === p_index) {
                                // setPrices({
                                //   ...prices,
                                //   [p_index]: b_obj.product.price * (o.qty + 1),
                                // });
                                return {
                                  ...o,
                                  qty: o.qty + 1,
                                  subTotal: o.product.price * (o.qty + 1),
                                };
                              } else {
                                return o;
                              }
                            })
                          );
                          // dispatch(putInBag(tempBag));
                        }}
                        className="border px-5  mr-5 text-black"
                      >
                        <div>
                          <i className="text-lg hover:text-blue-800 fa-solid fa-plus"></i>
                        </div>
                      </Link>

                      <span className="text-lg ">{b_obj.qty}</span>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          if (b_obj.qty > 0) {
                            console.log("decrementing ", tempBag);
                            setTempBag(
                              tempBag.map((o, c_index) => {
                                if (c_index === p_index) {
                                  //   setPrices({
                                  //     ...prices,
                                  //     [p_index]:
                                  //       b_obj.product.price * (o.qty - 1),
                                  //   });
                                  return {
                                    ...o,
                                    qty: o.qty - 1,
                                    subTotal: o.product.price * (o.qty - 1),
                                  };
                                } else {
                                  return o;
                                }
                              })
                            );
                            //  dispatch(putInBag(tempBag));
                          }
                        }}
                        className=" border px-5 ms-5  text-black"
                      >
                        <div className="">
                          <i className="text-lg hover:text-blue-800 fa-solid fa-minus"></i>
                        </div>
                      </Link>
                    </div>

                    {/* <Link
                    onClick={() => {
                      setQty(0);
                      //   setPlacingProducts([]);
                    }}
                  >
                    <div className="border border-red-600 rounded-full my-1 px-4 inline-block">
                      reset
                    </div>
                  </Link> */}
                  </div>

                  {/* --- items x price ---  */}
                  <div className="ps-1  ">
                    <div className=" ">
                      {b_obj.qty} x ${b_obj.product.price}
                    </div>
                    <div className=" ">
                      Total ${b_obj.product.price * b_obj.qty}
                    </div>
                  </div>
                  {/* --- 3 options ---  */}
                  <div className="flex flex-row justify-between  p-2 text-sm   mt-5">
                    <Link className="hover:underline underline-offset-4">
                      Save for later
                    </Link>
                    <Link className="hover:underline underline-offset-4">
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleRemoveFromBag(p_index)}
                      className="hover:underline underline-offset-4"
                    >
                      Remove
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* right  */}
      <div className="    w-full md:w-2/6 bg-gray-100 rounded-xl">
        <div className="  w-2/3 mx-auto my-10 tracking-widest">
          <h1 className="font-extrabold text-xl my-5">Order summary</h1>

          <div className="flex flex-row justify-between   border-black ">
            <span>
              {" "}
              Total <span className="text-sm">({numOfItems} items)</span>{" "}
            </span>
            <span className="w-32   ">: ${grandTotal} </span>
          </div>
          <br />
          <div className="flex flex-row justify-between   border-black ">
            <span>Including TAX</span>
            <span className="w-32 ">: 0</span>
          </div>
          <br />
          <hr className="bg-gray-400 h-0.5 my-4" />
          <div className="flex flex-row justify-between   border-black ">
            <span>Estimated Total Price</span>
            <span className="w-32 ">: ${grandTotal}</span>
          </div>
          <div className="flex flex-row justify-center mt-20">
            <button
              type="button"
              disabled={bag.length === 0}
              onClick={()=>navigate('/checkout')}
              className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
