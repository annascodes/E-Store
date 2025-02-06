import React, { useEffect, useState } from 'react'

const ProdCategory = ({ handleProdCategory }) => {
  const [ctg, setCtg] = useState(null);
  const [allCtg, setAllCtg] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await fetch(`/api/category/getallcategories`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setAllCtg(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllCategories();
  }, []);

  const handleCategoryInput = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/category/addcategory`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: ctg.toUpperCase() }),
      });
      setCtg(""); // to clear in field of input
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data.name);
        setAllCtg([...allCtg, data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
//   console.log(selectedCatog);
  return (
    <div className="relative z-0 w-full mb-5 group border-2 border-green-700 rounded-xl p-2">
      {/* ------------- showing categories to select -------start------- */}

      <div className=" p-1 flex flex-row gap-2 flex-wrap justify-start">
        {allCtg.length !== 0 ? (
          allCtg.map((c) => {
            return (
              <div className="flex items-center text-xs   px-2 py-1 rounded-xl border border-black">
                <input
                  id="default-radio-1"
                  type="radio"
                  onClick={(e) => handleProdCategory(e.target.value)}
                  name="default-radio"
                  value={c.name}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
                >
                  {c.name}
                </label>
              </div>
            );
          })
        ) : (
          <div className="border-2 text-yellow-400 border-yellow-400 p-2 rounded-md">
            <i className="mr-1 fa-solid fa-circle-exclamation"></i>No Category
          </div>
        )}
        {/* <div className="flex items-center ">
    <input defaultChecked id="default-radio-2" type="radio" defaultValue name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
  </div> */}
      </div>

      {/* ------------- showing categories to select -------end------- */}

      <div>
        {/* -------add category----- */}
        <div className="mt-3 relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={(e) => setCtg(e.target.value)}
            name="name"
            id="name"
            value={ctg}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Type category name
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={handleCategoryInput}
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-0 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            <i className="text- mr-1 fa-solid fa-plus"></i>Add category
          </button>
        </div>

        {/* ----------- */}
      </div>
    </div>
  );
};

export default ProdCategory
