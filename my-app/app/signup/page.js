'use client'
import init from '../common/init'
import {  createUserWithEmailAndPassword } from "firebase/auth"

export default function() {
  const {auth} = init()

  //Appelé lorsqu'on envoie le formulaire
  function submitForm(e){
    e.preventDefault()

    //Récupération des champs du formulaire
    const email = e.target.email.value
    const password = e.target.password.value

    //Ajout de l'utilisateur (courriel + mot de passe)
    createUserWithEmailAndPassword(auth, email, password)
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
