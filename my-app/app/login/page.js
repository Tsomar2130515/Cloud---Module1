'use client'
import init from '../common/init'
import { signInWithEmailAndPassword } from "firebase/auth"

export default function() {
  const {auth} = init()
  
  //Appelé lorsqu'on envoie le formulaire
  function submitForm(e){
    e.preventDefault()

    //Récupération des champs du formulaire
    const email = e.target.email.value
    const password = e.target.password.value

    //Connexion (courriel + mot de passe)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(userCred.user)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <form onSubmit={submitForm}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <input type="submit" />
    </form>
  )
}
