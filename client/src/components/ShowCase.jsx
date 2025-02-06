import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ShowCase = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
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
  return (
    <div>
      {/* --- show case ---  */}
      <div className="border-8 border-black">
        <h1 className="text-center  tracking-widest text-[12px] border-black">
          swipe...
        </h1>
        <div className="relative overflow-x-auto  no-scrollbar ">
          <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <h1 className="bg-gray-900 text-xs text-gray-100 px-6 py-1 mx-1 mt-2">
                  swipe<i className="fa-solid fa-arrow-right"></i>
                </h1>
                {products.allProducts &&
                  products.allProducts.map((p, p_indx) => {
                    return (
                      <th
                        scope="row"
                        className="  px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link to={`/showproduct/${p._id}`}>
                          <div className=" border-0 border-black p-2 ">
                            <img
                              src={p.images[0]}
                              className=" w-12 h-12   border border-black  rounded-full"
                              alt=""
                            />
                            <div className="     border-black p-1 hover:underline underline-offset-8 text-xs leading-6  tracking-widest text-grau-800 dark:text-white">
                              {p.name}
                            </div>
                            <span className="text-[9px] text-center tracking-widest border border-black mx-auto px-1 ">
                              {p.category}
                            </span>
                          </div>
                        </Link>
                      </th>
                    );
                  })}
                <h1 className="bg-gray-900 text-gray-100 px-6 py-1 mx-1 mt-2">
                  <i className="fa-solid fa-arrow-left"></i>swipe
                </h1>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShowCase
