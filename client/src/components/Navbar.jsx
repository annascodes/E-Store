import React, { useEffect, useState } from "react";
import "flowbite";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { itemsInBag } = useSelector((state) => state.product);
  const [ctg, setCtg] = useState([])

  useEffect(()=>{
    const getCategories = async()=>{
      try {
        const res = await fetch(`/api/category/getallcategories`)
        const data  = await res.json()
        if(!res.ok){
          console.log(data.message)
        }else{
          // console.log(data)
          setCtg(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    getCategories()

  },[])

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    console.log("signing out");

    try {
      const res = await fetch(`/api/user/signout`, {
        method: "post",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data);
        dispatch(signOut());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <nav className="mx-1 bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
          <Link
            to="/"
            href="https://flowbite.com/"
            className="  flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src={currentUser.pic}
              className="h-8"
              alt="Flowbite Logo"
            /> */}

            <span className=" self-center text-gray-900 text-6xl font-extrabold tracking-tighter whitespace-nowrap dark:text-white">
              souk.
            </span>
          </Link>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* ---------------img div start */}

            <Link
              to={"/bag"}
              className=" relative hover:text-gray-700     border-black mx-1 p-4"
            >
              <i className="text-2xl fa-solid fa-bag-shopping"></i>
              <p className="absolute   border-black rounded bg-black px-1 text-sm text-white top-1 right-2 font-bold">
                {itemsInBag && itemsInBag}{" "}
              </p>
            </Link>
            {currentUser && (
              <>
                <button
                  type="button"
                  className="flex border border-black text-sm bg-gray-800 rounded-lg md:me-0 focus:ring-4 focus:ring-blue-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-12 h-12 rounded-lg   object-cover"
                    src={currentUser.pic}
                    // src={
                    //   currentUser.picr ||
                    //   "https://i.pinimg.com/564x/26/82/78/2682787e9d8241a3164a67748ac505b6.jpg"
                    // }
                    alt="user photo"
                    referrerPolicy="no-referrer"
                  />
                </button>
                {/* Dropdown menu */}
                <div
                  className="border border-black z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {currentUser.username}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {currentUser.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to={"/dashboard"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <Link
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {/* ---------------img div end     */}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className=" items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* --- home  */}
              <li>
                <Link
                  to="/"
                  href="#"
                  className="tracking-widest block   text-white bg-green-600  md:m-0 my-1     rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500  ps-2 hover:underline text-center "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {/* --- women dropdown start  */}
              <li>
                <button
                  id="dropdownHoverButton_women"
                  data-dropdown-toggle="dropdownHover_women"
                  data-dropdown-trigger="hover"
                  className="tracking-widest block   text-white bg-green-600  md:m-0 my-1     rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500  ps-2 hover:underline text-center "
                  type="button"
                >
                  Women
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdownHover_women"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 flex flex-row"
                >
                  <div className="flex flex-row justify-center items-center m-1 border-r-4 border-r-zinc-500 text-gray-800 text-xs px-2">
                    <p>women</p>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHoverButton_women"
                  >
                    {ctg &&
                      ctg.map((c, c_i) => {
                        return (
                          <li>
                            <Link
                              to={`/filterproducts?gender=women&category=${c.name}&sort=new&priceRange=100-300`}
                              className="block px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {c.name}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </li>
              {/* --- men dropdown start  */}
              <li>
                <button
                  id="dropdownHoverButton_men"
                  data-dropdown-toggle="dropdownHover_men"
                  data-dropdown-trigger="hover"
                  className="tracking-widest block   text-white bg-green-600  md:m-0 my-1     rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500  ps-2 hover:underline text-center "
                  type="button"
                >
                  Men
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdownHover_men"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 flex flex-row"
                >
                  <div className="flex flex-row justify-center items-center m-1 border-r-4 border-r-zinc-500 text-gray-800 text-xs px-2">
                    <p>men</p>
                  </div>
                  <ul
                    className=" py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHoverButton_men"
                  >
                    {ctg &&
                      ctg.map((c, c_i) => {
                        return (
                          <li>
                            <Link
                              to={`/filterproducts?gender=men&category=${c.name}&sort=new&priceRange=100-300`}
                              className="block px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {c.name}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </li>

              {/* --- dropdown end  */}

              {currentUser && (
                <>
                  <li>
                    <Link
                      to={`/myorders/${currentUser.username}`}
                      href="#"
                      className="tracking-widest block   text-white bg-green-600 md:m-0 my-1 rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500  ps-2 hover:underline text-center"
                      aria-current="page"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/myprofile"
                      href="#"
                      className="tracking-widest block   text-white bg-green-600 md:m-0 my-1 rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500  ps-2 hover:underline text-center"
                      aria-current="page"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              )}

              {currentUser && currentUser.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/createproduct "
                      href="#"
                      className="tracking-widest block   text-white bg-green-600 md:m-0 my-1 rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500  ps-2 hover:underline text-center"
                      aria-current="page"
                    >
                      CreateProduct
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard "
                      href="#"
                      className="tracking-widest block   text-white bg-green-600 md:m-0 my-1 rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500  ps-2 hover:underline text-center"
                      aria-current="page"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}

              {!currentUser && (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      SignIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
