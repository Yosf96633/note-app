'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
const page = () => {
  const {data:session , status} = useSession();
  console.log(session?.user.image)
  if(status==="loading"){
    return <div className=' h-screen grid place-content-center'>
         <h1 className=' text-center text-3xl font-extralight'>Loading...</h1>
    </div>
  }
  return (
    <div className=' h-screen grid place-content-center'>
       {
         status==="authenticated" ? <div>
              <p>{session.user._id}</p>
                  <h1>
                    {session.user.name}
                  </h1>
                  <p>{session.user.email}</p>
                  <img className=' rounded-full h-[50vh]' src={session.user.image} alt="image" />
                  <button  onClick={()=>{
                    signOut();
                  }} className=' bg-lime-400 text-black px-4 py-2 rounded-lg border border-black'>Sign out</button>
         </div> : <div className=''>
            <p className=' text-6xl font-medium text-center'>You are un-authenticated.</p>
             <div className=' flex justify-center items-center '>
              <p className='text-xl'>Please again</p>
             <Link className=' text-blue-500 pl-2 text-xl' href={`/sign-in`}>Login</Link>
             </div>
         </div>
       }
    </div>
  )
}

export default page;