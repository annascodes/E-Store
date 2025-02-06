import React, { useState } from 'react'

const PreviewProduct = ({productProfile, handleErr}) => {
    const [ err, setErr] = useState(null)

    const handleUploadProduct = async()=>{
        console.log(productProfile)
        try {
            const res = await fetch(`/api/product/createproduct`,
            {
                method:'post',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(productProfile)
            })
            const data = await res.json()
            if(!res.ok){
                console.log(data.message)
                handleErr(data.message)
            }else{
                console.log(data)
            }
        } catch (error) {
            console.log(error.message)
            handleErr(error.message)
        }
    }

 
  return (
    <div className="">
      {/* <h1 className="text-3xl font-bold text-center">Preview Look</h1> */}

  
      {/* {productProfile && (
        <div className="border   ">
          <div className="flex flex-row justify-between w-1/4 ">
            <div className=" ">Name</div>
            {productProfile.name ? (
              <div className=" ">
                {" "}
                <i className=" text-blue-600 fa-solid fa-check"></i>
              </div>
            ) : (
              <div>
                {" "}
                <i className="text-red-600 fa-solid fa-xmark"></i>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between w-1/4">
            <div className="  ">Description</div>
            {productProfile.desc ? (
              <div>
                <i className="text-blue-600 fa-solid fa-check"></i>
              </div>
            ) : (
              <div className=" ">
                {" "}
                <i className="text-red-600 fa-solid fa-xmark"></i>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between w-1/4">
            <div className="  ">price</div>
            {productProfile.price ? (
              <div>
                <i className="text-blue-600 fa-solid fa-check"></i>
              </div>
            ) : (
              <div className=" ">
                {" "}
                <i className="text-red-600 fa-solid fa-xmark"></i>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between w-1/4">
            <div className="  ">instock</div>
            {productProfile.instock ? (
              <div>
                <i className="text-blue-600 fa-solid fa-check"></i>
              </div>
            ) : (
              <div className=" ">
                {" "}
                <i className="text-red-600 fa-solid fa-xmark"></i>
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between w-1/4">
            <div className="  ">images</div>
            {productProfile.images.length !== 0 ? (
              <div>
                <i className="text-blue-600 fa-solid fa-check"></i>
              </div>
            ) : (
              <div className=" ">
                {" "}
                <i className="text-red-600 fa-solid fa-xmark"></i>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between w-1/4">
            <div className="  ">gender</div>
            {productProfile.gender ? (
              <div>
                <i className="text-blue-600 fa-solid fa-check"></i>
              </div>
            ) : (
              <div className=" ">
                {" "}
                <i className="text-red-600 fa-solid fa-xmark"></i>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between w-1/4">
            <div className="  ">category</div>
            {productProfile.category ? (
              <div>
                <i className="text-blue-600 fa-solid fa-check"></i>
              </div>
            ) : (
              <div className=" ">
                {" "}
                <i className="text-red-600 fa-solid fa-xmark"></i>
              </div>
            )}
          </div>
        </div>
      )} */}

    
      

      <div className="mt-1 flex flex-row justify-center">
        <button
          type="submit"
          onClick={handleUploadProduct}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <i className="text-xl mr-1 fa-solid fa-upload"></i> Upload Product
        </button>
      </div>
    </div>
  );
}

export default PreviewProduct
