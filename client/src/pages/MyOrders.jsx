import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const MyOrders = () => {
    const {customerName} = useParams();
    const {currentUser} = useSelector(state=>state.user)
    const [orders, setOrders] = useState([])
    const [processingMoney, setProcessingMoney] = useState(null)
    const [collectedMoney, setCollectedMoney] = useState(null)
    let tempCount=0;
    let tempCount2=0;
    useEffect(()=>{
        
const getOrdersOfCustomer = async()=>{
    try {
        const res = await fetch(`/api/order/getcustomerorders/${customerName}`)
        const data = await res.json()
        if(!res.ok){
            console.log(data.message)
        }else{
            console.log(data)
            
            setOrders(data)

            data.map(o=>{
              // console.log(o.grandTotal)
              if(o.status ==='processing')
                tempCount =tempCount + o.grandTotal;
              if(o.status === 'delivered')
                tempCount2 +=o.grandTotal
            })
            setProcessingMoney(tempCount);
            setCollectedMoney(tempCount2)
            
        }
    } catch (error) {
        console.log(error.message)
    }
}
        getOrdersOfCustomer()
    },[])
  return (
    <div>
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center font-extrabold text-3xl mt-10  tracking-widest mx-1">
        Orders
      </h1>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Your Orders
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Below is the table having all orders placed under className
              <span className="font-bold"> " {customerName} "</span>
              {currentUser.isAdmin && (
                <div className="  border-black ">
                  Processing
                  <span className="font-bold text-lg"> $ {processingMoney}</span>
                  <br />
                 Collected
                  <span className="font-bold text-lg"> $ {collectedMoney}</span>
                </div>
              )}
            </p>
          </caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3">
                #inv
              </th>
              {/* <th scope="col" class="px-6 py-3">
                Customer
              </th> */}
              <th scope="col" class="px-6 py-3">
                Created on <br /> (d/m/y)
              </th>
              <th scope="col" class="px-6 py-3">
                Amount
              </th>
              <th scope="col" class="px-6 py-3">
                payment type
              </th>
              <th scope="col" class="px-6 py-3">
                status
              </th>
              {/* <th scope="col" class="px-6 py-3">
                seen / not-seen
              </th> */}
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((o, o_indx) => {
                return (
                  <tr
                    key={o_indx}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td class="text-gray-900 px-6 py-4">{o_indx + 1}</td>
                    <th
                      scope="row"
                      class=" px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Link
                        to={`/showorder/${o._id}`}
                        className="underline underline-offset-4 hover:bg-yellow-100 p-1 rounded-lg"
                      >
                        {o._id}
                      </Link>
                    </th>
                    {/* <td class="text-gray-900 px-6 py-4">{o.user_name}</td> */}
                    <td class="text-gray-900 px-6 py-4">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td class="text-gray-900 px-6 py-4">$ {o.grandTotal}</td>
                    <td class="text-gray-900 px-6 py-4"> {o.paymentType}</td>
                    <td class="text-gray-900 px-6 py-4">
                      {/* -- processing  */}
                      {o.status == "processing" && (
                        <span
                          className="bg-yellow-100
                    tracking-widest px-2 py-1 rounded-xl text-yellow-500"
                        >
                          processing
                        </span>
                      )}
                      {/* -- delivered  */}
                      {o.status == "delivered" && (
                        <span
                          className="bg-green-100
                    tracking-widest px-2 py-1 rounded-xl text-green-500"
                        >
                          delivered
                        </span>
                      )}

                      {/* -- dispatched  */}
                      {o.status == "dispatched" && (
                        <span
                          className="bg-blue-100
                    tracking-widest px-2 py-1 rounded-xl text-blue-500"
                        >
                          dispatched
                        </span>
                      )}

                      {/* -- cancelled  */}
                      {o.status == "cancelled" && (
                        <span
                          className="bg-red-100
                    tracking-widest px-2 py-1 rounded-xl text-red-500"
                        >
                          cancelled
                        </span>
                      )}
                    </td>
                    {/* <td class="text-center text-gray-900 px-6 py-4 ">
                      {o.isSeen ? (
                        <Link
                          href="#"
                          class=" font-medium text-blue-600 dark:text-blue-500 underline underline-offset-4 rounded-xl  hover:bg-blue-100 duration-300 p-2"
                        >
                          <i className="text-xl fa-regular fa-eye"></i>
                        </Link>
                      ) : (
                        <Link
                          href="#"
                          class=" font-medium text-red-600 dark:text-blue-500 underline underline-offset-4 rounded-xl  hover:bg-red-100 duration-300 p-2"
                        >
                          <i className="text-xl fa-regular fa-eye-slash"></i>
                        </Link>
                      )}
                    </td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders
