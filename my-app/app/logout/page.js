'use client'
import init from '../common/init'
import { signOut } from "firebase/auth"

export default function() {
  const {auth} = init()

  //Appelé lorsqu'on envoie le formulaire
  function logOut(e){
    e.preventDefault()

    //Déconnexion
    signOut(auth)
      .then(() => {
        console.log("Logged out")
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (<>
    <button onClick={logOut}>Logout</button>
  </>
    
  )
}
