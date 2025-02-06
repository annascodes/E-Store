import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const DashSidebar = () => {

  const [stats, setStats] = useState({})
  const getStats =async()=>{
    try {
        const res = await fetch(`/api/order/stats`)
        const data = await res.json()
        if(!res.ok){
          console.log(data.message)
        }
        else{
          console.log(data)
          setStats(data)
        }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    getStats()
  },[])
    const location = useLocation()
    const [tab, setTab]= useState('')
  const [x, setX]= useState(null)
    useEffect(()=>{
        const urlparams = new URLSearchParams(location.search)
        const tab_fromURL = urlparams.get('tab')
        if(tab_fromURL){
            setTab(tab_fromURL)
        }
    },[location.search])
    const customeCss = { backgroundColor: "rgb(17 24 39)", color: "white" };
  return (
    <div className=" z-10 flex flex-row md:flex-col  justify-around md:h-screen">
      {/* --overview  */}
      <div className="flex flex-row justify-center">
        <Link
          style={x === "overview" ? customeCss : {}}
          onClick={() => setX("overview")}
          to={"/dashboard?tab=overview"}
          className=" flex flex-row justify-center w-full text-center    border-black hover:bg-gray-700 hover:text-white duration-200 px-1 py-3 "
        >
          <i className="text-xl fa-solid fa-boxes-stacked"></i>
        </Link>
      </div>
      {/* --profile  */}
      <div className="flex flex-row justify-center">
        <Link
          style={x === "profile" ? customeCss : {}}
          onClick={() => setX("profile")}
          to={"/dashboard?tab=profile"}
          className=" flex flex-row justify-center w-full text-center    border-black hover:bg-gray-700 hover:text-white duration-200 px-1 py-3 "
        >
          <i className="text-xl fa-solid fa-user"></i>
        </Link>
      </div>

      {/* --products */}
      <div className="flex flex-row justify-center">
        <Link
          style={x === "products" ? customeCss : {}}
          onClick={() => setX("products")}
          to={"/dashboard?tab=products"}
          className=" flex flex-row justify-center w-full text-center    border-black hover:bg-gray-700 hover:text-white duration-200 px-1 py-3 "
        >
          <i className="text-xl fa-brands fa-product-hunt"></i>
        </Link>
      </div>

      {/* --users/customers  */}
      <div className="flex flex-row justify-center">
        <Link
          style={x === "users" ? customeCss : {}}
          onClick={() => setX("users")}
          className=" flex flex-row justify-center w-full text-center    border-black hover:bg-gray-700 hover:text-white duration-200 px-1 py-3 "
        >
          <i className="text-xl fa-solid fa-users-rectangle"></i>
        </Link>
      </div>

      {/* --orders  */}
      <div className="    border-black flex flex-row justify-center">
        <Link
          to={`/dashboard?tab=orders`}
          style={x === "orders" ? customeCss : {}}
          onClick={() => setX("orders")}
          className=" flex flex-row justify-center w-full text-center    border-black hover:bg-gray-700 hover:text-white duration-200 px-1 py-3 "
        >
          <i className="  mr-1 text-xl fa-solid fa-bag-shopping"></i>

          {stats.notSeenOrders && stats.notSeenOrders.length > 0 && (
            <div className="  px-1 text-sm rounded-xl max-h-5  bg-red-500 text-white">
              {/* <i className="mr-1 fa-regular fa-eye-slash"></i> */}
              {stats.notSeenOrders.length}
            </div>
          )}
        </Link>
      </div>

      {/* --dispatched orders  */}
      <div className="flex flex-row justify-center">
        <Link
          style={x === "finance" ? customeCss : {}}
          onClick={() => setX("finance")}
          className=" flex flex-row justify-center w-full text-center    border-black hover:bg-gray-700 hover:text-white duration-200 px-1 py-3 "
        >
          <i className="text-xl fa-solid fa-comments-dollar"></i>
        </Link>
      </div>
    </div>
  );
}

export default DashSidebar
