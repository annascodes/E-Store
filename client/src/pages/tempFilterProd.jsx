import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

const TempFilterProd = () => {

        const [searchParams, setSearchParams] = useSearchParams(); 
        const [count, setCount] = useState(0)
        // console.log(searchParams.get('q'))

        useEffect(()=>{
            const getRelatedProds = async()=>{
                try {
                    console.log('getting for :', searchParams.get('gender'), searchParams.get('category'))
                  const res = await fetch(
                    `/api/product/getallproducts?gender=${searchParams.get('gender')}&category=${searchParams.get('category')}`
                  );

                  const data = await res.json();
                  console.log("res:", data);
                  if (!res.ok) {
                    console.log(data.message);
                  } else {
                    console.log(data)
                  
                  }
                } catch (error) {
                    console.log(error.message)
                }
            }
            getRelatedProds()
        },[searchParams])
  return (
    <div> 
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center   text-3xl mt-2  tracking-widest mx-1">
        temp...
      </h1> 

      <div className="m-2">

       
        <button 
        type='button' 
        className='border border-black p-2 m-1 hover:underline'
        onClick={()=>setSearchParams({gender:'men', category:'jacket'})}>
            men/jacket
        </button>
        <br />
        <button 
        type='button' 
        className='border border-black p-2 m-1 hover:underline'
        onClick={()=>setSearchParams({...searchParams, acc:'ring'})}>
            men/ring
        </button>
        <br />
        
         
        {
            count && <span>{count} </span>
        }
        <br />
         <button onClick={()=>setCount(count+1)}>
            increment
         </button>
         
        
      </div>
    </div>
  );
}

export default TempFilterProd
