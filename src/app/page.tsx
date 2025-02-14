'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
const page = () => {
  const {data:session , status} = useSession();
  if(status==="loading"){
    return <div className=' h-screen grid place-content-center'>
         <h1 className=' text-center text-3xl font-extralight'>Loading...</h1>
    </div>
  }
  return (
    <div className=' h-screen grid place-content-center'>
       {
         status==="authenticated" ? <div>
                  <h1>
                    {session.user.username}
                  </h1>
                  <p>{session.user.email}</p>
                  
                  <button  onClick={()=>{
                    signOut();
                  }} className=' bg-lime-400 text-black px-4 py-2 rounded-lg border border-black'>Sign out</button>
         </div> : <div className=''>
            <p className=' text-4xl font-light text-center'>You are un-authenticated.</p>
             <div className=' flex justify-center items-center space-y-1'>
              <span>Please again</span>
             <Link className=' text-blue-500' href={`/sign-in`}>Login</Link>
             </div>
         </div>
       }
    </div>
  )
}

export default page;