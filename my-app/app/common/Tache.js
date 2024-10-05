'use client';
import init from "./init";
import { useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {getStorage, ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage"

export default function Tache({ task, onTaskUpdate, onTaskDelete, db }) {
    const [isChecked, setIsChecked] = useState(task.statut);
    const [imageURL, setImageURL] = useState(null);  // État pour l'URL de l'image
    const storage = getStorage();

    // Fonction pour gérer le changement de statut (case cochée/décochée)
    const handleCheckboxChange = async () => {
        const newStatus = !isChecked;  // Bascule le statut
        setIsChecked(newStatus);  // Met à jour l'état local

        try {
            //reference du document a mettre à jour dans firebase
            const taskRef = doc(db, "Task", task.id);

            // met a jour le status dans firebase
            await updateDoc(taskRef, { statut: newStatus });

            // Appelle la fonction onTaskUpdate pour actualiser les données
            if (onTaskUpdate) {
                onTaskUpdate(task.id, newStatus);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche:", error);
        }
    };


    // Fonction pour gérer la suppression de la tâche
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "Task", task.id))
            console.log("Tâche supprimée")

            // Appelle la fonction onTaskDelete pour actualiser les données
            if (onTaskDelete) {
                onTaskDelete(task.id);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche:", error);
        }
    }

    // download image from firebase storage
    useEffect(() => {
        if (task.nomImage) {
            const imageRef = ref(storage, `images/${task.nomImage}`);
            getDownloadURL(imageRef)
                .then((url) => {
                    setImageURL(url);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération de l'image:", error);
                    setImageURL(null);
                });
        }
    }, [task.nomImage]);
   
    return (
            <div className="col-10 col-lg-3 bloc"> 
                <div className="card" >
                    {imageURL ? (
                        <img
                            className="card-img-top image"
                            src={imageURL}
                            alt={`Image de la tâche ${task.nomImage}`}
                            width={300}
                            height={300}
                            priority
                        />
                    ) : (
                        <div className="card-img-top image" style={{ padding: '10px', textAlign: 'center', }}>
                            <p>Aucune image disponible</p>
                        </div>
                    )}
            
                    <div className="fs-4 p-3 mb-2 text-white card-title ">{task.nom}</div>
                    
                    <div className="card-body">
                        <p className="card-text">
                            Statut: {isChecked ? "Complété" : "En cours"}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={isChecked}  // Détermine si la case est cochée ou non
                                    onChange={handleCheckboxChange}  // Appelle handleCheckboxChange lors du changement
                                />
                                <label className="form-check-label ms-2">
                                    Statut
                                </label>
                            </div>
                            
                            <button onClick={handleDelete} className="btn btn-danger ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    
    );
}
