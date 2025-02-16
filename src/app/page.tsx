'use client'
import AddData from '@/components/AddData';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
const page = () => {

  
  return (
    <div className=' h-screen'>
      <AddData/>
    </div>
  )
}

export default page;