import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UploadImgs from "../components/UploadImgs";
import NewPreviewProduct from "../components/NewPreviewProduct";

const EditProduct = () => {
    const navigate = useNavigate()
    const [ preview, setPreview] = useState(false)
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [aImgs, setAImgs] = useState([]);
  const [removedImgs, setRemovedImgs] = useState([]);
  const [aCategories, setACategories] = useState([]);
  const [aGender, setAGender] = useState(["men", "women", "universal"]);
  const [aSizes, setASizes] = useState([
    "large",
    "medium",
    "small",
    "extra large",
  ]);
  const [newColor, setNewColor] = useState(null);
  const [newCtg, setNewCtg] = useState(null);
  const [newImg, setNewImg] = useState(" ");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/product/getproduct/${id}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          //   console.log(data);
          setProduct(data);
          setAImgs(data.images);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getCtg = async () => {
      try {
        const res = await fetch(`/api/category/getallcategories`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          // console.log(data)
          setACategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
    getCtg();
  }, []);

 
  const handleNewCategory = async (e) => {
    e.preventDefault();
    console.log("adding new category:", newCtg);
    try {
      const res = await fetch(`/api/category/addcategory`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCtg }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data.name);
        setACategories([...aCategories, data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const addUplImgsToAImgs = (cloudImgUrl)=>{
    console.log('adding cloud imgs url to aImgs:')
    console.log(`download url :`, cloudImgUrl);
    setAImgs([...aImgs, cloudImgUrl])
  }
  

const handleSaveProduct = async()=>{
    console.log(product)
    console.log(aImgs)

    try {
        const res = await fetch(`/api/product/updateproduct/${id}`,
        {
            method:'put',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(
                {
                    name: product.name,
                    desc: product.desc,
                    price: product.price,
                    instock: product.instock,
                    images: [...aImgs],
                    gender: product.gender,
                    category: product.category,
                    size: product.size,
                    color: product.color, 
                }
            )
        })
        const data = await res.json()
        if(!res.ok){
            console.log(data.message)
        }else{
            console.log(data)
            navigate(`/showproduct/${data._id}`)
        }
    } catch (error) {
        console.log(error.message)
    }
}
  return (
    <div>
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center font-extrabold text-3xl mt-10 tracking-widest mx-1">
        Edit Product
      </h1>

      {preview ? (
        <>
          <NewPreviewProduct product={product} />
          <div className="flex flex-row justify-center">
            <button 
            onClick={handleSaveProduct}
            className="text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Upload Product
            </button>
            <button
              onClick={() => setPreview(false)}
              className="text-white m-2 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <form className="   flex flex-col md:flex-row flex-wrap ">
            {/* left side  */}
            <div className="w-full md:w-1/2   border-black p-5">
              {/* --name  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e) => { console.log("getting instock: ", e.target.value);
                    setProduct({ ...product, name: e.target.value });
                  }}
                  defaultValue={product.name}
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>

              {/* -- desc  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e) => {
                    console.log("getting instock: ", e.target.value);
                    setProduct({ ...product, desc: e.target.value });
                  }}
                  defaultValue={product.desc}
                  type="text"
                  name="desc"
                  id="desc"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="desc"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>

              {/* --- price and qty  */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    defaultValue={product.price}
                    type="number"
                    name="price"
                    id="price"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="price"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Price
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    onChange={(e) => {
                      console.log("getting instock: ", e.target.value);
                      setProduct({ ...product, instock: e.target.value });
                    }}
                    defaultValue={product.instock}
                    type="number"
                    name="qty"
                    id="qty"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="qty"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Instock
                  </label>
                </div>
              </div>

              {/* --- sizes and colors  */}
              <div className="flex flex-col border-dashed border-b-2 border-gray-500 p-2 ">
                {/* size  */}
                <p className="tracking-widest text-gray-600 text-xs mb-1">
                  Choose sizes
                </p>
                <div className="border-red-700   mb-5  flex flex-row flex-wrap justify-around">
                  {aSizes &&
                    aSizes.map((s, s_i) => {
                      return (
                        <>
                          <div className=" tracking-widest text-sm flex items-center mb-4">
                            {product.size && product.size.includes(s) ? (
                              <Link
                                onClick={() => {
                                  let temp = [...product.size];
                                  temp = temp.filter((f, f_i) => f !== s);
                                  // temp.pop(s) // it only removes the last
                                  setProduct({ ...product, size: [...temp] });
                                }}
                                className=" text-blue-600 hover:text-blue-400"
                              >
                                <i className="text-lg fa-regular fa-square-check"></i>
                              </Link>
                            ) : (
                              <Link
                                onClick={() => {
                                  let temp = [...product.size];
                                  temp.push(s);
                                  setProduct({ ...product, size: [...temp] });
                                }}
                                className=" text-red-600 hover:text-red-400"
                              >
                                <i className="text-lg fa-regular fa-square"></i>
                              </Link>
                            )}

                            <h1 className="border border-black p-1 m-1">{s}</h1>
                          </div>
                        </>
                      );
                    })}
                </div>
                {/* color  */}
                <p className="tracking-widest text-gray-600 text-xs mb-1">
                  Choose colors
                </p>
                <div className=" border-red-700   flex flex-row flex-wrap justify-around ">
                  {product.color &&
                    product.color.map((c, c_i) => {
                      return (
                        <>
                          <div className="mx-2 tracking-widest text-sm flex items-center ">
                            {product.color && product.color.includes(c) ? (
                              <Link
                                onClick={() => {
                                  let temp = [...product.color];
                                  temp = temp.filter((f, f_i) => f !== c);
                                  // temp.pop(s) // it only removes the last
                                  setProduct({ ...product, color: [...temp] });
                                }}
                                className=" text-blue-600 hover:text-blue-400"
                              >
                                <i className="text-lg fa-regular fa-square-check"></i>
                              </Link>
                            ) : (
                              <Link
                                onClick={() => {
                                  let temp = [...product.color];
                                  temp.push(c);
                                  setProduct({ ...product, color: [...temp] });
                                }}
                                className=" text-red-600 hover:text-red-400"
                              >
                                <i className="text-lg fa-regular fa-square"></i>
                              </Link>
                            )}

                            <h1
                              style={{ backgroundColor: `${c}` }}
                              className="border border-black p-1 m-1"
                            >
                              {c}
                            </h1>
                          </div>
                        </>
                      );
                    })}
                  {/* input color code  */}
                  <div className="mt-5">
                    <input
                      onChange={(e) => setNewColor(e.target.value)}
                      type="text"
                      className=" mb-2 mx-2 rounded-2xl h-9"
                      placeholder="enter color code"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        let temp = [...product.color];
                        temp.push(newColor);
                        setProduct({ ...product, color: [...temp] });
                      }}
                      className="bg-blue-600 hover:bg-blue-800 rounded-xl text-white px-2 py-1 text-xs"
                    >
                      add color
                    </button>
                  </div>
                </div>
              </div>

              {/* --- gender and category  */}
              <div className="flex flex-col  border-b-2 border-black p-2 mt-5">
                {/* gender  */}
                <p className="tracking-widest  text-gray-600 text-xs mb-1">
                  Choose gender
                </p>
                <div className="border-red-700  flex flex-row justify-around ">
                  {aGender &&
                    aGender.map((g, g_i) => {
                      return (
                        <>
                          <div className=" tracking-widest text-sm flex items-center mb-4">
                            <Link
                              onClick={() =>
                                setProduct({ ...product, gender: g })
                              }
                              className=" text-blue-600 hover:text-blue-400"
                            >
                              {product && product.gender == g ? (
                                <i className="text-lg fa-regular fa-square-check"></i>
                              ) : (
                                <i className="text-lg fa-regular fa-square"></i>
                              )}
                            </Link>
                            <h1 className="border border-black p-1 m-1">{g}</h1>
                          </div>
                        </>
                      );
                    })}
                </div>
                {/* category  */}
                <p className="tracking-widest text-gray-600 text-xs mb-5">
                  Choose category
                </p>
                <div className=" border-red-700   flex flex-row justify-around flex-wrap ">
                  {aCategories &&
                    aCategories.map((c, c_i) => {
                      return (
                        <>
                          <div className="mx-2 tracking-widest text-sm flex items-center ">
                            <Link
                              onClick={() =>
                                setProduct({ ...product, category: c.name })
                              }
                              className=" text-blue-600 hover:text-blue-400"
                            >
                              {product && product.category == c.name ? (
                                <i className="text-lg fa-regular fa-square-check"></i>
                              ) : (
                                <i className="text-lg fa-regular fa-square"></i>
                              )}
                            </Link>
                            <h1 className="border border-black p-1 m-1">
                              {c.name}
                            </h1>
                          </div>
                        </>
                      );
                    })}
                </div>
                {/* -- input ctg  */}
                <div className="mt-5">
                  <input
                    onChange={(e) => setNewCtg(e.target.value)}
                    type="text"
                    className="mx-2 mb-2 h-9 rounded-2xl"
                    placeholder="type..."
                  />
                  <button
                    onClick={handleNewCategory}
                    className="bg-blue-600 hover:bg-blue-800 rounded-xl text-white px-2 py-1 text-xs"
                  >
                    add category
                  </button>
                </div>
              </div>
            </div>
            {/* right side  */}
            <div className="w-full md:w-1/2   border-black p-2">
              {/* removed imgs */}
              <div className="flex flex-row flex-wrap justify-around border-2 border-black">
                {removedImgs &&
                  removedImgs.map((i, i_indx) => {
                    return (
                      <div className="">
                        <img src={i} className="w-16 m-1" alt="" />
                        <div className="text-center">
                          <Link
                            onClick={() => {
                              setAImgs([...aImgs, i]);
                              let temp = [...removedImgs];
                              temp = temp.filter((f, f_i) => f !== i);
                              setRemovedImgs([...temp]);
                            }}
                          >
                            <i className="text-blue-600 text-xl rounded-3xl hover:bg-blue-100 px-2 fa-solid fa-plus"></i>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* availabe imgs */}
              <div className="flex flex-row flex-wrap justify-around">
                {aImgs &&
                  aImgs.map((i, i_indx) => {
                    return (
                      <div className="my-2 border border-gray-200">
                        <img src={i} className="w-32 " alt="" />
                        <div className="text-center">
                          <Link
                            onClick={() => {
                              setRemovedImgs([...removedImgs, i]);
                              let temp = [...aImgs];

                              temp = temp.filter((f, f_i) => f !== i);
                              setAImgs([...temp]);
                              // setProduct({...product, images:[...temp]}) //dont,use temporary
                            }}
                          >
                            <i className="text-red-600 text-xl rounded-3xl hover:bg-red-100 px-2 fa-solid fa-xmark"></i>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* img by url  */}
              <div className="   border-black">
                <h1 className="text-center tracking-widest text-xs">
                  Img by url
                </h1>
                <input
                  onChange={(e) => setNewImg(e.target.value)}
                  type="text"
                  value={newImg}
                  className="w-4/5 md:w-11/12 m-2 rounded-3xl"
                  placeholder="img url..."
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setAImgs([...aImgs, newImg]);
                    setNewImg(" ");
                  }}
                  className="block mx-auto bg-blue-600 hover:bg-blue-800 rounded-xl text-white px-2 py-1 text-xs"
                >
                  add img url
                </button>
              </div>

              {/* browers img */}
              <UploadImgs addUplImgsToAImgs={addUplImgsToAImgs} />
            </div>
          </form>
          <div className=" text-center">
            
            {
                true ? <button
              onClick={() => setPreview(true)}
              className="w-44 text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Preview
            </button> :
            <span>Nothing is change</span>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default EditProduct;
