import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { putInBag, emptyBag } from "../redux/product/productSlice";
import ShowCase from "../components/ShowCase";

const ShowProduct = () => {
    const {bag}= useSelector(state=>state.product)
    const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [imgOnDisplay, setImgOnDisplay] = useState("");
 
    const [qty, setQty] = useState(0);
    const [placingProducts, setPlacingProducts] = useState([])

    const [bagData, setBagData] = useState({})

const navigate = useNavigate()
//   console.log(product);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/product/getproduct/${productId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          // console.log(data)
          setProduct(data);
          setImgOnDisplay(data.images[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
    // dispatch(putInBag([]))
  }, []);

  const handleAddToBag = async()=>{
    if(bag ===null){
        dispatch(putInBag([{ product, ...bagData, qty:1 ,subTotal:product.price   }]));
    }else{
    dispatch(
      putInBag([
        ...bag,
        { product, ...bagData, qty: 1, subTotal: product.price  },
      ])
    );
    }
    navigate('/bag')
  }
   
  return (
    <div className=" ">
      {currentUser && currentUser.isAdmin && (
        <Link to={"/createproduct"} className=" sticky top-5 left-5">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Create Product
          </button>
        </Link>
      )}

      <div className="    flex flex-col flex-wrap md:flex-row ">
        {/* --- images ---  */}
        <div className="  border-black w-full md:w-2/3">
          {/* --------small pics--------- */}
          <div className="flex flex-row flex-wrap justify-around border-2 border-gray-500 rounded-3xl mx-1">
            {product.images &&
              product.images.map((i, indexing) => {
                return (
                  <button
                    key={indexing}
                    className="my-1 opacity-45 hover:opacity-100"
                    onClick={() => setImgOnDisplay(i)}
                  >
                    <img src={i} className="w-10" />
                  </button>
                );
              })}
          </div>
          {/* ---------image on display ----------- */}
          <div className="p-3">
            <img
              src={imgOnDisplay}
              className="hover:cursor-zoom-in max-w-full mx-auto"
              alt=""
            />
          </div>
        </div>
        {/* ---  details ---  */}
        <div className="  rounded-3xl border-gray-500 text-gray-500   w-full md:w-1/3 py-10">
          <h1 className="text-xl md:text-4xl text-center font-extrabold tracking-tighter ">
            {product && product.name}
          </h1>
          <h1 className="text-center tracking-widest underline ">
            <Link className="hover:text-black">
              {product && product.gender}
            </Link>
          </h1>

          <h1 className="text-center tracking-widest underline ">
            <Link className="hover:text-black">
              {product && product.category}
            </Link>
          </h1>
          {/* --card--- */}

          <div className="mx-auto  my-5 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              {/* ------ rating stars ------- */}
              <div className="flex items-center mb-2">
                <svg
                  className="w-4 h-4 text-green-500 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4  text-green-500 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4  text-green-500 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4  text-green-500 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.95
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  out of
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5
                </p>
              </div>
            </h5>
            {/* ------- description -------- */}
            {product && (
              <span className="text-sm text-justify">{product.desc}</span>
            )}
            <div className="flex items-baseline text-gray-500 dark:text-white">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">
                {product && product.price}
              </span>
              <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                /piece
              </span>
            </div>
            <hr />
            <span> {product && product.instock} left in stock</span>
            <ul role="list" className="space-y-5 my-7">
              <li className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Free Shipping
                </span>
              </li>
              <li className="flex">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  On demand customization
                </span>
              </li>
              <li className="flex">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  100% environment friendly
                </span>
              </li>
            </ul>

            {/* --- qty div ---  */}
            {/* <div className="  border-black my-5 p-2">
              <div className="  flex flex-row justify-between   ">
                <Link onClick={()=>{
                    if(  qty < product.instock ){
                        setQty(qty + 1);
                        setPlacingProducts([...placingProducts,{product:product,color:[],size:[]}])
                    }
                }} className="border px-5  mr-5 text-black">
                  <div>
                    <i className="text-lg hover:text-blue-800 fa-solid fa-plus"></i>
                  </div>
                </Link>

                <span className="text-lg ">{qty}</span>
                <Link onClick={()=>{
                    if(qty>0){
                        setQty(qty-1)
                        setPlacingProducts([...placingProducts.slice(0,placingProducts.length-1)])
                        
                    }
                }} className=" border px-5 ms-5  text-black">
                  <div className="">
                    <i className="text-lg hover:text-blue-800 fa-solid fa-minus"></i>
                  </div>
                </Link>
              </div>
              <Link onClick={()=>{
                setQty(0);
                setPlacingProducts([])
              }}>reset</Link>

            </div> */}
            <hr />
            <p>Select Size</p>
            <div className="m-1 flex flex-row flex-wrap justify-around   border-gray-500 p-2">
              {product.size &&
                product.size.map((s, a_index) => {
                  return (
                    <div
                      key={a_index}
                      className="border border-black flex text-xs  m-1 p-2 my-1 text-gray-900   flex-row justify-center items-center"
                    >
                      <input
                        onClick={(e) =>
                          setBagData({ ...bagData, size: e.target.value })
                        }
                        type="radio"
                        name="size"
                        value={s}
                        required
                      />
                      <p className="ms-2">{s.toUpperCase()}</p>
                      {/* <Link className="border  hover:border-black hover:bg-slate-200 rounded-xl border-gray-600 p-1 ">
                        {s.toUpperCase()}
                      </Link> */}
                    </div>
                  );
                })}
            </div>
            <hr />
            <p>Choose Color</p>
            <div className="m-1 flex flex-row flex-wrap justify-around   border-gray-500 p-2">
              {product.color &&
                product.color.map((c, c_index_) => {
                  return (
                    <div
                      key={c_index_}
                      style={{ backgroundColor: `${c}` }}
                      className="my-1  border border-black  ring-offset-0 flex flex-row justify-center items-center p-2 "
                    >
                      <input
                        onClick={(e) =>
                          setBagData({ ...bagData, color: e.target.value })
                        }
                        type="radio"
                        name="color"
                        value={c}
                      />
                      <p className="ms-1 text-xs w-10"></p>
                      {/* <Link className="border  hover:border-black hover:bg-slate-200 rounded-xl border-gray-600 p-1 ">
                        {s.toUpperCase()}
                      </Link> */}
                    </div>
                  );
                })}
            </div>

            <button
              type="button"
              onClick={handleAddToBag}
              className="  mt-5 text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium    px-5 py-2.5 inline-flex justify-center w-full text-center text-sm"
            >
              <i className=" text-xl border-white  mr-2 fa-solid fa-bag-shopping"></i>
              <span className="mt-1">ADD TO BAG</span>
            </button>
            <button
              type="button"
              //   onClick={handleAddToBag}
              className="my-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 font-medium  text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              view bag
            </button>
            
            {currentUser.isAdmin && (
              <Link className="border border-black px-1 text-gray-950 hover:underline py-0.5" onClick={() => dispatch(emptyBag())}>emptyBag</Link>
            )}
          </div>

          {/* ----- */}
        </div>
      </div>

      <ShowCase />
    </div>
  );
};

export default ShowProduct;

 
