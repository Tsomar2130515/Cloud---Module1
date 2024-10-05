"use client";

import React, { useState, useEffect } from 'react';
import init from '../common/init';
import HeaderButton from "./HeaderButton";
import SignupModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { signOut } from "firebase/auth";
import MyUserProfile from './MyUserProfile';
import MyUserProfileModal from './MyUserProfileModal';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

function Header() {
  const { auth, storage } = init();
  const [isInscriptionModalOpen, setIsInscriptionModalOpen] = useState(false);
  const [isConnexionModalOpen, setIsConnexionModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMyUserProfileModalOpen, setIsMyUserProfileModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleInscriptionButtonClick = () => {
    setIsInscriptionModalOpen(true);
  };

  const handleInscriptionCloseModal = () => {
    setIsInscriptionModalOpen(false);
  };

  const handleConnexionButtonClick = () => {
    setIsConnexionModalOpen(true);
  };

  const handleConnexionCloseModal = () => {
    setIsConnexionModalOpen(false);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleProfilePictureChange = async (e) => {
    if (!user) {
        setError("Utilisateur non connecté.");
        return;
    }

    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        setLoading(true);

        try {
            const profilePicRef = ref(storage, `profileImages/${user.uid}/${file.name}`);
            await uploadBytes(profilePicRef, file);
            const downloadURL = await getDownloadURL(profilePicRef);

            await updateProfile(user, { photoURL: downloadURL });
            setImageUrl(downloadURL);
        } catch (error) {
            setError(`Erreur lors de la mise à jour de la photo de profil : ${error.message}`);
            console.error("Erreur : ", error);
        } finally {
            setLoading(false);
        }
    }
};


  const handleProfilePictureClick = () => {
    setImageUrl(user.photoURL || "user.png");
    setIsMyUserProfileModalOpen(true);
  };

  const handleClick = () => {
    document.getElementById('profilePicInput').click();
  };

  return (
    <nav className="toDoList_HeaderFooter toDoList_Header">
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-list-task" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
        <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
      </svg>

      <h1>My To Do List App</h1>

      <div className="headerButtons_Section">
        {user ? (
          <>
            <HeaderButton nom="Se déconnecter" action={handleLogOut} />
            <MyUserProfile user={user} storage={storage} />
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePictureChange}
            />
            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading">Chargement...</div>}
          </>
        ) : (
          <>
            <HeaderButton nom="S'inscrire" action={handleInscriptionButtonClick} />
            <HeaderButton nom="Se connecter" action={handleConnexionButtonClick} />
          </>
        )}
      </div>

      <SignupModal isOpen={isInscriptionModalOpen} onClose={handleInscriptionCloseModal} />
      <LoginModal isOpen={isConnexionModalOpen} onClose={handleConnexionCloseModal} />
      <MyUserProfileModal 
        isOpen={isMyUserProfileModalOpen} 
        onClose={() => setIsMyUserProfileModalOpen(false)} 
        imageUrl={imageUrl} 
      />
    </nav>
  );
}

export default Header;
