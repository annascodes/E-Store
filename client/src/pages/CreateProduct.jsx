import React, { useState } from "react";
import "flowbite"; 
import ImgToFirebase from "../components/ImagToFirebaseStorage";
import ProdCategory from "../components/ProdCategory";
import PreviewProduct from "../components/PreviewProduct"; 
import { useDispatch, useSelector } from "react-redux";
import { emptyKeepImgs } from "../redux/product/productSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const CreateProduct = () => { 
 
const {productImages} = useSelector(state=>state.product)
const dispatch = useDispatch()
const navigate = useNavigate()
  const [formData, setFormData] = useState({}); 
  const [prodImgs, setProdImgs] = useState([]);
  const [err, setErr] = useState(null);

  const [productSize, setProductSize] = useState([])
  const [productColors, setProductColors] = useState([])
  const [customColors, setCustomColors] = useState([])
  const [tempColor, setTempColor] = useState('')

  const handleFormData = (e) => {
    e.preventDefault();
    setErr(null)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   const handleProdCategory = (ctg) => {
     console.log(`this is product category: ${ctg}`);
     setFormData({ ...formData, category: ctg });
   };

 const handlePImgs = async (p_imgs) => {
   setProdImgs(p_imgs);
 }; 
   const handleUploadProduct = async () => { 

     try {
       const res = await fetch(`/api/product/createproduct`, {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            name: formData.name,
            price: formData.price,
            instock: formData.instock,
            gender: formData.gender,
            category: formData.category,
            desc: formData.desc,
            images:productImages,
            color:productColors,
            size: productSize,
         }),
       });
       const data = await res.json();
       if (!res.ok) {
         console.log(data.message);
        //  handleErr(data.message);
       } else {
         console.log(data);
         setFormData({})
         dispatch(emptyKeepImgs())
         navigate(`/showproduct/${data._id}`) 

       }
     } catch (error) {
       console.log(error.message);
    //    handleErr(error.message);
     }
   };
console.log(productSize)
console.log(productColors)
console.log(customColors)
  return (
    <div>
      <form className="max-w-md mx-auto p-2">
        <h1 className=" text-blue-400  text-center font-extrabold text-3xl my-5 tracking-tighter ">
          Create Product
        </h1>
        {err && (
          <div
            className="border-4 border-dashed border-red-700 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-extrabold block text-3xl">Danger alert!</span>
            {err}
          </div>
        )}
        {/* --- name --- */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={handleFormData}
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
            Product Name
          </label>
        </div>
        {/* --description--  */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={handleFormData}
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
        {/* ----- price & instock -----  */}
        <div className="grid md:grid-cols-2 md:gap-6">
          {/* --product price--  */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              onChange={handleFormData}
              name="price"
              id="price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Price
            </label>
          </div>
          {/* --product instock--  */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              onChange={handleFormData}
              name="instock"
              id="instock"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="instock"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              In-Stock
            </label>
          </div>
        </div>
        {/* ---image files upload --- */} {/* --images by urls--  */}
        <ImgToFirebase handlePImgs={handlePImgs} />
        {/* ----- gender & category -----  */}
        <div className="grid md:grid-cols-2 md:gap-6">
          {/* --gender--  */}
          <div className="relative z-0 w-full mb-5 group border-2 border-green-700 rounded-xl p-2">
            <div>
              <h1 className="mb-3 text-gray-500 text-sm">Product Gender</h1>
              <label
                htmlFor="gender"
                className="block text-gray-500 mb-2 text-sm   dark:text-white"
              ></label>
              <select
                id="gender"
                name="gender"
                onChange={handleFormData}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a Gender</option>
                <option value="men">MEN</option>
                <option value="women">WOMEN</option>
                <option value="universal">UNIVERSAL</option>
              </select>
            </div>
          </div>
          {/* --category--  */}
          <ProdCategory handleProdCategory={handleProdCategory} />
        </div>
        {/* --- size ---  */}
        Sizes
        <div className="border-2 border-green-700 rounded-xl p-2 relative z-0 w-full mb-5 group flex flex-row flex-wrap justify-around">
          {/* --- large size --- */}
          <div className="flex items-center text-xs   px-2 py-1 rounded-xl border border-black">
            <input
              id="large"
              type="radio"
              onClick={(e) => setProductSize([...productSize, e.target.value])}
              name="large"
              value="large"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="large"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              Large (L)
            </label>
          </div>
          {/* --- medium size ---  */}
          <div className="flex items-center text-xs   px-2 py-1 rounded-xl border border-black">
            <input
              id="medium"
              type="radio"
              //   onClick={(e) => handleProdCategory(e.target.value)}
              onClick={(e) => setProductSize([...productSize, e.target.value])}
              name="medium"
              value="medium"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="medium"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              Medium (M)
            </label>
          </div>
          {/* --- small size --- */}
          <div className="flex items-center text-xs   px-2 py-1 rounded-xl border border-black">
            <input
              id="small"
              type="radio"
              onClick={(e) => setProductSize([...productSize, e.target.value])}
              name="small"
              value="small"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="small"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              Small (S)
            </label>
          </div>
        </div>
        colors
        <div className="border-2 border-green-700 rounded-xl p-2 relative z-0 w-full mb-5 group flex flex-row flex-wrap justify-around">
          {/* --- white color --- */}
          <div className="flex items-center text-xs   px-2 py-1 rounded-xl border border-black">
            <input
              id="white"
              type="radio"
              onClick={(e) =>
                setProductColors([...productColors, e.target.value])
              }
              name="white"
              value="white"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="white"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              <div className="w-10 h-10 rounded-md bg-white border border-black"></div>
            </label>
          </div>
          {/* --- black color ---  */}
          <div className="flex items-center text-xs   px-2 py-1 rounded-xl border border-black">
            <input
              id="black"
              type="radio"
              onClick={(e) =>
                setProductColors([...productColors, e.target.value])
              }
              name="black"
              value="black"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="black"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              <div className="w-10 h-10 rounded-md bg-black border border-black"></div>
            </label>
          </div>
          {/* --- brown color --- */}
          <div className="flex items-center text-xs   px-2 py-1 rounded-xl border border-black">
            <input
              id="brown"
              type="radio"
              onClick={(e) =>
                setProductColors([...productColors, e.target.value])
              }
              name="brown"
              value="brown"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="brown"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
            >
              <div className="w-10 h-10 rounded-md bg-orange-700 border border-black"></div>
            </label>
          </div>
          {/* --- showing entered custom colors ---  */}
          {
            customColors && customColors.map(c=>{
                return (
                  <div className="m-1 flex items-center text-xs   px-2 py-1 rounded-xl border border-black">
                    <input
                      id={c}
                      type="radio"
                      onClick={(e) =>
                        setProductColors([...productColors, e.target.value])
                      }
                      name={c}
                      value={c}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="brown"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
                    >
                      <div
                        style={{ backgroundColor: `${c}` }}
                        className="w-10 h-10 rounded-md border border-black"
                      ></div>
                    </label>
                  </div>
                );
            })
          }
          {/* --- custom color --- */}
          <div className="my-3 relative z-0 w-full mb-5 group">
            <input
              type="text"
              //   onChange={handleFormData}
              // onChange={(e)= setTempColor(e.target.value)}
              onChange={(e) => setTempColor(e.target.value)}
              name="customColors"
              id="customColors"
              value={tempColor}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="customColors"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter custom Color
            </label>
            <div className="mt-5">
              <Link onClick={(e)=>{
                setCustomColors([...customColors, tempColor])
                setTempColor('')
              }} className="border border-black rounded-lg px-2">+ Add color</Link>
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleUploadProduct}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <i className="mr-1 fa-solid fa-eye"></i>Save Product
        </button>
        {/* <PreviewProduct productProfile={formData} handleErr={handleErr} /> */}
      </form>
    </div>
  );
};

export default CreateProduct;
