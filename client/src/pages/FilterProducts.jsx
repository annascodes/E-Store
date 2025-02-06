import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const FilterProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const customCss = { backgroundColor: "black", color: "white" };
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCtg, setSelectedCtg] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const [hideFilterBox, setHideFilterBox] = useState(false);

  const [result, setResult] = useState({});
  const [cardImages, setCardImages] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    try {
      const res = await fetch(`/api/category/getallcategories`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data);
        setCategories(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getReqProducts = async (sort, gender, category, priceRange) => {
    try {
      const res = await fetch(
        `/api/product/getallproducts?sort=${sort}&gender=${gender}&category=${category}&priceRange=${priceRange}`
      );

      const data = await res.json();
      console.log("res:", data);
      if (!res.ok) {
        console.log(data.message);
        setLoading(false);
      } else {
        // console.log(data)
        setResult(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    let temp = {};
    result.allProducts &&
      result.allProducts.map((p, i) => {
        temp[i] = p.images[0];
      });
    setCardImages(temp);
  }, [result]);

  useEffect(() => {
    setSelectedSort(searchParams.get("sort") == "old" ? "old" : "new"); // for here in UI
    setSelectedGender(searchParams.get("gender"));
    setSelectedCtg(searchParams.get("category") || "");
    setSelectedPriceRange(searchParams.get("priceRange"));

    getAllCategories();
    getReqProducts(
      searchParams.get("sort") == "old" ? "asc" : "desc", // cause we'r sending this to db
      searchParams.get("gender") || "",
      searchParams.get("category") || "",
      searchParams.get("priceRange")
    );
  }, [searchParams]);

  console.log("sort:", selectedSort);
  console.log("gender:", selectedGender);
  console.log("category:", selectedCtg);
  console.log("priceRange", selectedPriceRange);

  return (
    <div>
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center   text-3xl mt-2  tracking-widest mx-1">
        Filter Products
      </h1>
      {/* ---hide filter box */}
      <div className="mx-2 sticky top-0">
        <button
          onClick={() => {
            hideFilterBox ? setHideFilterBox(false) : setHideFilterBox(true);
          }}
          className="bg-red-700 text-gray-100 p-1 text-[8px] tracking-widest hover:underline underline-offset-4 rounded-lg  "
        >
          {hideFilterBox ? "Show filter" : "Hide filter"}
        </button>
      </div>
      <div className="  flex flex-col md:flex-row flex-wrap p-5">
        {/* --filter--  */}
        <div
          hidden={hideFilterBox}
          className="  border-black mx-auto w-full  sm:w-3/6 md:w-2/12 bg-slate-100 rounded-3xl"
        >
          {/* -- show or hide filter box  */}
          <div className="flex flex-row justify-end   border-black "></div>
          {/* -- filter box  */}
          <div className="sticky top-10">
            <h1 className="  px-3 text-xl font-bold my-5 tracking-widest ">
              Filter box
            </h1>

            <h1 className=" px-3 text-xs tracking-widest ">By new / old </h1>
            <div className="  border-black p-1 my-2 flex flex-row flex-wrap justify-around">
              <button
                style={selectedSort === "new" ? customCss : {}}
                onClick={() => {
                  setSelectedSort("new");
                  setSearchParams({
                    sort: "new",
                    gender: selectedGender,
                    category: selectedCtg,
                  });
                }}
                className="border border-black p-1 m-1 text-sm"
              >
                New
              </button>

              <button
                style={selectedSort === "old" ? customCss : {}}
                onClick={() => {
                  setSelectedSort("old");
                  setSearchParams({
                    sort: "old",
                    gender: selectedGender,
                    category: selectedCtg,
                  });
                }}
                className="border border-black p-1 m-1 text-sm"
              >
                Old
              </button>
            </div>
            <h1 className=" px-3 text-xs tracking-widest ">By gender </h1>
            <div className="  border-black p-1 my-2 flex flex-row flex-wrap justify-around">
              <button
                style={selectedGender === "women" ? customCss : {}}
                onClick={() => {
                  setSelectedGender("women");
                  setSearchParams({
                    sort: selectedSort,
                    gender: "women",
                    category: selectedCtg,
                  });
                }}
                className="border  border-black p-1 m-1 text-xs"
              >
                WOMEN
              </button>

              <button
                style={selectedGender === "men" ? customCss : {}}
                onClick={() => {
                  setSelectedGender("men");
                  setSearchParams({
                    sort: selectedSort,
                    gender: "men",
                    category: selectedCtg,
                  });
                }}
                className="border border-black p-1 m-1 text-xs"
              >
                MEN
              </button>
            </div>

            <h1 className=" px-3 text-xs tracking-widest ">By category </h1>
            <div className="  border-black p-1 mb-2 flex flex-row flex-wrap justify-around">
              {categories &&
                categories.map((c, c_i) => {
                  return (
                    <button
                      style={
                        selectedCtg.toUpperCase() === `${c.name}`
                          ? customCss
                          : {}
                      }
                      onClick={() => {
                        setSelectedCtg(c.name);
                        setSearchParams({
                          sort: selectedSort,
                          gender: selectedGender,
                          category: c.name,
                        });
                      }}
                      className="border text-xs border-black m-1 p-1"
                    >
                      {c.name}
                    </button>
                  );
                })}
            </div>

            {/* <h1 className=" px-3 text-xs tracking-widest ">By Price </h1>
            <div className="  border-black p-1 my-2 flex flexr-row flex-wrap justify-around">
              <Link
                style={selectedPriceRange === "1-100" ? customCss : {}}
                onClick={() => {
                  setSelectedPriceRange("1-100");
                }}
                className=" border text-sm border-black mb-1 p-1"
              >
                $ 1 - $ 100
              </Link>
              <Link
                style={selectedPriceRange === "100-300" ? customCss : {}}
                onClick={() => {
                  setSelectedPriceRange("100-300");
                }}
                className=" border text-sm border-black mb-1 p-1"
              >
                $ 100 - $ 300
              </Link>
              <Link
                style={selectedPriceRange === "300-600" ? customCss : {}}
                onClick={() => {
                  setSelectedPriceRange("300-600");
                }}
                className=" border text-sm border-black mb-1 p-1"
              >
                $ 300 - $ 600
              </Link>
              <Link
                style={selectedPriceRange === "600-1000" ? customCss : {}}
                onClick={() => {
                  setSelectedPriceRange("600-1000");
                }}
                className=" border text-sm border-black mb-1 p-1"
              >
                $600 - $1000
              </Link>
            </div> */}
          </div>

          {/* --------- */}
        </div>
        {/* -- filtered products --  */}
        <div className=" mx-auto  border-black w-full md:w-10/12 px-10">
          <h1 className="text-center tracking-widest  my-5">
            {" "}
            Results ({result.allProducts && result.allProducts.length})
          </h1>
          <h1 className="  border-black tracking-widest text-xs">
            {selectedGender} / {selectedCtg && selectedCtg.toLowerCase()} /{" "}
            {selectedSort == "old" ? "old" : "new"}{" "}
          </h1>
          {loading ? (
            <div className="text-center my-20 text-6xl font-extrabold">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
                <h1 className="tracking-widest">loading</h1>
              </div>
            </div>
          ) : (
            <div className="flex flex-row flex-wrap justify-around">
              {result.allProducts && result.allProducts.length == 0 && (
                <span className="text-5xl tracking-widest text-gray-600  my-10">
                  NO PRODUCTS
                </span>
              )}
              {result &&
                result.allProducts &&
                result.allProducts.map((p, p_indx) => {
                  return (
                    <div
                      key={p_indx}
                      className=" hover:border-gray-500 hover:scale-105 duration-500 shadow-lg my-5 mx-1 max-w-[250px]  bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
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
                      <div className="p-3">
                        <p className="border border-gray-400a p-1 rounded-full mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 flex flex-row flex-wrap justify-around">
                          {p.images &&
                            p.images.map((i, indx) => {
                              return (
                                <button
                                  key={indx}
                                  onClick={(e) => {
                                    // e.preventDefault()

                                    setCardImages({
                                      ...cardImages,
                                      [p_indx]: i,
                                    });
                                  }}
                                >
                                  <img
                                    src={i}
                                    className="opacity-25 hover:opacity-100 w-7 my-1"
                                  />
                                </button>
                              );
                            })}
                        </p>

                        <div className="flex flex-row justify-center my-1">
                          <h1 className="border border-black px-1 text-[9px] mx-1">
                            {p.gender}
                          </h1>
                        </div>

                        <Link to={`/showproduct/${p._id}`}>
                          <h5 className="hover:underline underline-offset-8 mb-2 text-sm leading-6 font-bold tracking-widest text-gray-700 dark:text-white">
                            {p.name}
                          </h5>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
