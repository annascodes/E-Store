import React, { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar'
import { useLocation } from 'react-router-dom'
import DashProducts from '../components/DashProducts'
import DashProfile from '../components/DashProfile'
import DashOverview from '../components/DashOverview'
import DashOrders from '../components/DashOrders'

const Dashboard = () => {
    const location = useLocation()
    const [tab, setTab]= useState('')
    
    useEffect(()=>{
        const urlparams= new URLSearchParams(location.search)
        const tab_fromURL = urlparams.get('tab')

        if(tab_fromURL){
            setTab(tab_fromURL)
        }
    },[location.search])
  return (
    <div className="  ms-1 flex flex-col  md:flex-row justify-between">
      <div className="     border-gray-900 w-full md:w-1/12 rounded-full">
        <div className="sticky top-0 bg-white  border-4 border-gray-900 rounded-full">
          <DashSidebar />
        </div>
      </div>
      <div className="  w-full md:w-11/12">
        {tab === "" && <DashOverview />}
        {tab === "overview" && <DashOverview />}
        {tab === "profile" && <DashProfile />}
        {tab === "products" && <DashProducts />}
        {tab === 'orders' && <DashOrders/> }
      </div>
    </div>
  );
}

export default Dashboard
