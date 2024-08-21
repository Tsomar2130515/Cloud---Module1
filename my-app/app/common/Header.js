"use client";
import React, { useState } from 'react';
import HeaderButton from "./HeaderButton";
import SignupModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import AddTaskButton from './AddTaskButton';

function Header() {
  const [isInscriptionModalOpen, setIsInscriptionModalOpen] = useState(false);
  const [isConnexionModalOpen,   setIsConnexionModalOpen] = useState(false);

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

  return (
    <nav className="toDoList_HeaderFooter toDoList_Header">
        
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-list-task" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"/>
        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"/>
        <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"/>
      </svg>

      <h1>My To Do List App</h1>

      <div className="headerButtons_Section">
        <HeaderButton nom="S'inscrire" action={handleInscriptionButtonClick} />
        <HeaderButton nom="Se connecter" action={handleConnexionButtonClick} />
      </div>

      <SignupModal isOpen={isInscriptionModalOpen} onClose={handleInscriptionCloseModal} />
      <LoginModal isOpen={isConnexionModalOpen} onClose={handleConnexionCloseModal} />

    </nav>
  );
}

export default Header;
