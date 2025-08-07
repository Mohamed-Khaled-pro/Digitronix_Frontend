import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axiosClient from '../api/axiosClient'
import SyncLoader from 'react-spinners/SyncLoader'
export default function UserCount() {
 const [userCount , setUserCount ] = useState(0)
    const [loading , setLoading ] = useState(true) 

    useEffect(() => {
    axiosClient
    .get("users/get/count")
    .then((res) => {
      setUserCount(res.data.userCount);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err?.response?.data?.message || "Error fetching product count");
      setLoading(false);
    });
    }, []);
  return (
    <div className="flex justify-center">
  <div className="flex justify-center">
   {loading ? ( 
           <div className="text-center mt-20">
            <SyncLoader  color="#00FF7F" size={10} />
          </div> 

     ) : (
    <div className="w-32 h-32 rounded-full bg-black dark:bg-white text-white dark:text-black flex flex-col items-center justify-center shadow-lg ">
    <span className="text-3xl font-bold">{userCount}</span>
    <span className="text-md mt-1">users</span>
    </div>
     )}
</div>
</div>
  )
}
