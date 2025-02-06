import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'flowbite'
import 'flowbite-react' 
  const DashProducts = () => {

    const [products , setProducts] = useState({})
    const [showModal,setShowModal] = useState(false)
    const [deletingProduct, setDeletingProduct] = useState(null)
    useEffect(()=>{
        const getAllProducts=async()=>{
            try {
                const res = await fetch(`/api/product/getallproducts?sort=desc`)
                const data = await res.json()
                if(!res.ok){
                    console.log(data.message)
                }else{
                    console.log(data)
                    setProducts(data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getAllProducts()
    },[])
  return (
    <div className="   ">
      {/* ---modal--starts--- */}
      <div
        // style={showModal ? { display: "hidden" } : { display: "hidden" }}
        style={showModal ? {} : { display: "none" }}
        className="z-10 tracking-widest fixed top-0 left-0 h-screen w-full bg-white flex flex-col justify-center items-center md:text-xl"
      >
        <div className="border border-black p-1 m-0.5 ">
          <div className="flex flex-row justify-end m-2 ">
            <button
              onClick={() => {
                setShowModal(false);
                setDeletingProduct(null);
              }}
              className="hover:text-red-600 hover:scale-150 duration-500 "
            >
              <i className="text-3xl fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="p-2 text-center">
            <h1> {deletingProduct && deletingProduct._id}</h1>

            <img
              src={deletingProduct && deletingProduct.images[0]}
              className="w-44 mx-auto"
              alt=""
            />
            <h1>{deletingProduct && deletingProduct.name}</h1>
            <h1>
              ({deletingProduct && deletingProduct.instock} left in stock){" "}
            </h1>
          </div>
          <div className=" opacity-100 p-2 md:p-6 rounded-3xl">
            <div className=" flex flex-row ">
              <button className="border m-1 border-black  hover:bg-red-400 hover:scale-110  duration-300 py-2 px-5 rounded-xl text-black  ">
                delete it
              </button>
              <button className="border border-black  hover:bg-yellow-200  hover:scale-110  duration-300 py-2 px-5 rounded-xl text-yellow-500  ">
                offboard it
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setDeletingProduct(null);
                }}
                className="m-1  hover:bg-blue-200 border border-black  hover:scale-110  duration-300 py-2 px-5 rounded-xl text-blue-600  "
              >
                cancel it
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ---modal--ends--- */}
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center font-extrabold text-3xl mt-10 tracking-widest mx-1">
        Products ({products.allProducts && products.allProducts.length})
      </h1>
      <div className="relative overflow-x-auto text-xs tracking-widest sm:rounded-lg  md:mx-10 shadow-2xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                images
              </th>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                instock
              </th>
              <th scope="col" className="px-6 py-3">
                delete
              </th>
              <th scope="col" className="px-6 py-3">
                edit
              </th>
            </tr>
          </thead>
          <tbody>
            {products.allProducts &&
              products.allProducts.map((p, indx) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="  flex flex-row flex-wrap px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {p.images && (
                        <div>
                          <p className="bg-green-200 text-center tracking-widest text-[9px] rounded-lg my-0.5 ">
                            {p.images && p.images.length > 1
                              ? `${p.images.length} images`
                              : "image"} 
                          </p>
                          <img src={p.images[0]} className="w-20" alt="" />
                        </div>
                      )}
                    </th>
                    <td className="px-6 py-4">
                      <Link
                        className="hover:underline"
                        to={`/showproduct/${p._id}`}
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4">${p.price}/-</td>

                    <td className="px-6 py-4">{p.instock} left</td>
                    <td className="px-6 py-4">
                      {/* ---delete start---- */}
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setDeletingProduct(p);
                        }}
                        type="button"
                        hidden={showModal}
                        className="  hover:bg-red-200 duration-300 py-2 px-5 rounded-xl text-red-600  "
                      >
                        <i className="fa-solid fa-ban"></i>
                      </button>

                      {/* {showModal && (
                        <div className="  ">
                          <button className=" text-xs  hover:bg-red-200 duration-300 py-2 px-5 rounded-xl text-red-600  ">
                            delete
                          </button>
                          <button className="text-xs  hover:bg-yellow-200 duration-300 py-2 px-5 rounded-xl text-red-600  ">
                            offboard
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className="text-xs  hover:bg-blue-200 duration-300 py-2 px-5 rounded-xl text-blue-600  "
                          >
                            cancel
                          </button>
                        </div>
                      )} */}

                      {/* ---delete end  --- */}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/editproduct/${p._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <i className="text-xl fa-solid fa-pen-to-square"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashProducts;
