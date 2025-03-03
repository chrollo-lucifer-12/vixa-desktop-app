import { useMediaSources } from '@/hooks/useMediaSources';
import { fetchUserProfile } from '@/lib/utils';
import { ClerkLoading, SignedIn, useUser } from '@clerk/clerk-react'
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MediaConfiguration } from '../MediaConfiguration';
const Widget = () => {

    const [profile, setProfile] = useState<any>(null)

    const {user} = useUser();
    const {state, fetchMediaResources} = useMediaSources()

    useEffect(() => {
        if (user && user.id) {
            fetchUserProfile(user.id).then((p) => setProfile(p))
            fetchMediaResources();
        }   
    }, [user])
    

  return (  
    <div className='p-5'>
      <ClerkLoading>
        <div className='h-full flex justify-center items-center'>
            <Loader/>
        </div>
      </ClerkLoading>
      <SignedIn>
        {profile ? <MediaConfiguration user={profile} state={state} /> : <div className='w-full h-full flex justify-center items-center'></div>}
      </SignedIn> 
          </div>
  )
}

export default Widget
