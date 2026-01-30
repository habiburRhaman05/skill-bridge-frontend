import { getProfile } from '@/features/auth/services'
import TutorProfilePage from '@/features/tutor/components/ProfileDetails';
import React from 'react'

const TutorDashboardProfile = async () => {
  const {user } = await getProfile();

  return (
    <div>
      <TutorProfilePage tutor={user.data}/>
    </div>
  )
}

export default TutorDashboardProfile