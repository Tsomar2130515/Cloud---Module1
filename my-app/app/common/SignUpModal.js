"use client";
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import init from './init';

function SignupModal({ isOpen, onClose }) {
  const { auth } = init();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose(); 
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Oups, vous avez déjà un compte utilisateur avec cet e-mail.');
      } else {
        setError('Oups, quelque chose a mal tourné. Vérifiez vos informations et réessayez.');
      }
    } finally {
      setLoading(false);
    }

    /*createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        setError('Oups, vous avez déjà un compte utilisateur avec cet e-mail.');
      })
      .finally(() => {
        setLoading(false);
      });*/
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Inscription</h2>
        <form onSubmit={submitForm}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="password-container">
            <label htmlFor="password">Mot de passe</label>
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                required
              />
              <button
                type="button"
                className="password-visibility"
                onClick={handlePasswordVisibility}
              >
                {passwordVisible ? "👁️" : "🔒"}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Chargement...' : 'S\'inscrire'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </>
  );
}

export default SignupModal;
