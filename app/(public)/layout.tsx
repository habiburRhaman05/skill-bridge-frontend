import Header from '@/components/layout/Header'
import React from 'react'

const HomeLayout = ({children}:{
    children:React.ReactNode
}) => {
  return (
    <main className='w-full'>
<Header/>
{children}
    </main>
  )
}

export default HomeLayout