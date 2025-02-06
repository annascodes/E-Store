import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const ProductFiltering = () => {
// ---
const [t_gender, setT_gender] = useState('')
const [t_ctg, setT_ctg] = useState('')
  const location = useLocation()


  useEffect(()=>{
    const urlparams = new URLSearchParams(location.search)
    const gender = urlparams.get('gender')
    const category = urlparams.get('category')
    if(gender || category) {
      console.log(gender)
      console.log(category)

    }

  },[location.search])

// --- 


  let { arg } = useParams(); 
  const customCss =  {backgroundColor:'black', color:'white'} 
  const [result, setResult] = useState({});
  const [filterGender, setFilterGender] = useState(arg)
  const [cardImages, setCardImages] = useState({});
  const getArgProducts = async (x) => {
    try {
      const res = await fetch(`/api/product/getallproducts?gender=${x}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        // console.log(data)
        setResult(data);
      }
    } catch (error) {
      console.log(error.message);
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
    getArgProducts(arg);
  }, []);

  console.log(result);
  return (
    <div>
      <div className="  flex flex-col md:flex-row flex-wrap p-5">
        {/* --filter--  */}
        <div className="  border-black  w-full md:w-3/12 bg-slate-100 rounded-3xl">
          <div className="sticky top-0">
            <h1 className="  text-center tracking-widest  my-5">Filter box</h1>

            <div className="  border-black p-1 my-2 flex flex-row justify-around">
              <Link
                style={filterGender === "women" ? customCss : {}}
                onClick={() => {
                  setFilterGender("women");
                  getArgProducts("women");
                }}
                className="border border-black p-2"
              >
                women
              </Link>

              <Link
                style={filterGender === "men" ? customCss : {}}
                onClick={() => {
                  setFilterGender("men");
                  getArgProducts("men");
                }}
                className="border border-black p-2"
              >
                men
              </Link>
            </div>
          </div>
        </div>
        {/* -- filtered products --  */}
        <div className="  border-black w-full md:w-9/12 px-10">
          <h1 className="text-center tracking-widest  my-5"> Results  ({result.allProducts && result.allProducts.length})</h1>
          <div className="flex flex-row flex-wrap justify-around">
            {result &&
              result.allProducts &&
              result.allProducts.map((p, p_indx) => {
                return (
                  <div
                    key={p_indx}
                    className=" hover:border-gray-500 hover:scale-105 duration-500 shadow-lg my-5 max-w-[250px]  bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
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
                    <div className="p-5">
                      <p className="border border-gray-400a p-1 rounded-full mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 flex flex-row flex-wrap justify-around">
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
        </div>
      </div>
    </div>
  );
};

export default ProductFiltering;
