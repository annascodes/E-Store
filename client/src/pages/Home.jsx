import React, { useEffect, useState } from "react";
import "flowbite";
import { Link, useNavigate } from "react-router-dom";
 
import ShowCase from "../components/ShowCase";
const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [cardImages, setCardImages] = useState({});
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(`/api/category/getallcategories`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          // console.log(data)
          setCategories(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const getProducts = async () => {
      try {
        const res = await fetch(`/api/product/getallproducts?sort=desc`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          // console.log(data)
          setProducts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    let temp = {};
    products.allProducts &&
      products.allProducts.map((p, i) => {
        temp[i] = p.images[0];
      });
    setCardImages(temp);
  }, [products]);
  // console.log(cardImages)

  return (
    <div>
      <div>
        <h1 className="text-xs text-center bg-gray-900 text-white ">
          <Link className="hover:underline tracking-widest ">
            SALE! on women and kids cloths
          </Link>
        </h1>

      </div>
      <div className="     border-black flex flex-col md:flex-row flex-wrap p-1">
        {/* --- text  */}
        <div className="  p-5 w-full  md:w-1/2 border-black flex flex-row justify-center items-center">
          <div>
            <h1 className="text-5xl text-gray-800 tracking-tighter font-extrabold">
              Beyond ordinary. Crafted for the discerning...
            </h1>
            <p className=" leading-10 my-5 text-3xl font-extrabold tracking-tighter text-gray-800">
              Made to be{" "}
              <span className="bg-black p-1 text-red-500">noticed.</span> Made
              to <span className="bg-black p-1 text-red-500">last.</span>
            </p>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Latest sale on cloths
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Explore new arrivals
              </button>
              <button
                type="button"
                className="text-green-600 px-4 py-2 text-sm font-medium   bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Best seller
              </button>
            </div>
          </div>
        </div>
        {/* --- photo  */}
        <div className="  w-full md:w-1/2 border-black p-10 grid-rows-2 grid  gap-2 ">
          <div className="relative hover:scale-105 duration-500">
            <Link>
              <img
                src="https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-full h-56 object-cover rounded-3xl"
              />
            </Link>
            <div className="   border-black absolute w-full bottom-16 text-center">
              <Link className="text-7xl font-extrabold tracking-widest hover:underline    text-white   ">
                Jeans
              </Link>
            </div>
          </div>

          <div className="relative    hover:scale-105 duration-500">
            <img
              src="https://images.unsplash.com/photo-1527529422472-65e6c7fd9f6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoJTIwbWFya2V0fGVufDB8fDB8fHww"
              alt=""
              className="w-full h-56 object-cover rounded-3xl "
            />
            <div className="   border-black absolute w-full bottom-16 text-center">
              <Link className=" tracking-widest  rounded-xl text-6xl  font-extrabold hover:underline   left-2 text-white">
                New arrivals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- categories ---  */}

      <div className="  py-5 flex flex-row justify-center">
        <div className="   flex flex-row flex-wrap justify-center">
          <Link
            // to={`/filterproducts?gender=men&category=&sort=new&priceRange=100-300`}
            to={`/filterproducts?gender=men`}
          >
            <div className="bg-white hover:underline underline-offset-8   hover:scale-150 duration-500 shadow-xl   text-4xl font-extrabold  text-gray-800 tracking-widest m-2 p-10 rounded-xl">
              MEN
            </div>
          </Link>
          <Link to={`/filterproducts?gender=women`}>
            <div className="bg-white     hover:underline underline-offset-8   hover:scale-150 duration-500 shadow-xl   text-4xl font-extrabold  text-gray-800 tracking-widest m-2 p-10 rounded-xl">
              WOMEN
            </div>
          </Link>
          <Link to={`/filterproducts?gender=kids`}>
            <div className="bg-white    hover:underline underline-offset-8   hover:scale-150 duration-500 shadow-xl   text-4xl font-extrabold  text-gray-800 tracking-widest m-2 p-10 rounded-xl">
              KIDS
            </div>
          </Link>
        </div>
      </div>

      {/* --- products ---  */}
      <h1 className="text-center text-3xl tracking-widest my-5">
        new arrivals
      </h1>
      <div className="flex flex-row flex-wrap justify-around px-10">
        {products.allProducts &&
          products.allProducts.map((p, p_indx) => {
            return (
              <div
                key={p_indx}
                className=" hover:border-green-500 hover:scale-105 duration-500 shadow-lg my-5 max-w-xs bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              >
                <Link to={`/showproduct/${p._id}`}>
                  <img
                    className="rounded-t-lg w-screen h-80 object-cover"
                    src={
                      cardImages[p_indx] ||
                      "https://cdn.dribbble.com/users/1053052/screenshots/3600670/_____.gif"
                    }
                    alt={p.name}
                  />
                </Link>

                <div className="  border-black p-3">
                  {/* small imgs */}
                  <p className="border border-green-400 p-1 rounded-full mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 flex flex-row flex-wrap justify-around">
                    {p.images &&
                      p.images.map((i, indx) => {
                        return (
                          <Link
                            key={indx}
                            onClick={(e) => {
                              // e.preventDefault()

                              setCardImages({ ...cardImages, [p_indx]: i });
                            }}
                          >
                            <img
                              src={i}
                              className="opacity-25 hover:opacity-100 w-7 my-1"
                            />
                          </Link>
                        );
                      })}
                  </p>

                  <div className="flex flex-row justify-center my-1">
                    <h1 className="border border-black px-1 text-[9px] mx-1">
                      {p.gender}
                    </h1>
                  </div>
                  <Link to={`/showproduct/${p._id}`}>
                    <h5 className="hover:underline underline-offset-8 mb-2 text-sm leading-6 font-bold tracking-widest text-grau-800 dark:text-white">
                      {p.name}
                    </h5>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
