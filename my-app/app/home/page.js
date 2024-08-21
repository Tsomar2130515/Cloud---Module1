'use client'
import init from '../common/init'

export default function() {
  const {auth} = init()
  
  const user = auth.currentUser

  return (<>
    {user ? <p>Welcome {user.email}</p> : <p>Anonymous users can't access this page</p>}
  </>
    
  )
}
