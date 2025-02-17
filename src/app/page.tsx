'use client'
import AddData from '@/components/AddData';
import ShowData from '@/components/ShowData';
import React from 'react'
const page = () => {

  
  return (
    <div className=' h-screen relative'>
      <AddData/>
      <ShowData/>
    </div>
  )
}

export default page;