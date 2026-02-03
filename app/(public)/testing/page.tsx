import { getCookies } from '@/features/auth/services'
import React from 'react'

const page = async() => {
    const cookies = await getCookies()
  return (
    <div>
        hi this is testing LandingPage

 cookies:{cookies}
        
    </div>
  )
}

export default page