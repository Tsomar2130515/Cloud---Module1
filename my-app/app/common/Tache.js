'use client';
import init from "./init";
import { useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {getStorage, ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage"

export default function Tache({ task, onTaskUpdate, onTaskDelete, db }) {
    const [isChecked, setIsChecked] = useState(task.statut);
    const [imageURL, setImageURL] = useState(null);  // État pour l'URL de l'image
    const storage = getStorage();
    const refStorage = ref(storage);

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



    function submit(e){
        e.preventDefault()
     
        const file = e.target.file.files[0]
        const refFile = ref(refStorage, `files/${file.name}`)
        uploadBytes(refFile, file).then((snapshot) => {
          console.log('Uploaded a file!');
        });

    }


    useEffect(() => {
        if (task.nomImage) {
            const imageRef = ref(storage, `files/${task.nomImage}`);
            getDownloadURL(imageRef)
                .then((url) => {
                    setImageURL(url);  // Met à jour l'état avec l'URL de l'image
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération de l'image:", error);
                });
        }
    }, [task.nomImage, storage]);
   
    return (
        <div className="tache" >
            {imageURL && (
                <div className="imageTask">
                    <img src={imageURL} alt={`Image de la tâche ${task.nom}`} />
                </div>
            )}

            <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}  // Détermine si la case est cochée ou non
                onChange={handleCheckboxChange}  // Appelle handleCheckboxChange lors du changement
            />
            <div className="nomTache" >{task.nom}</div>
            <button onClick={handleDelete} className="deleteButton"  >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
            </button>

            <form onSubmit={submit}>
                <input type="file" name="file" />
                <input type="submit" value="Envoyer" />
            </form>





        </div>
    );
}

  // Fonction pour gérer le changement de statut (case cochée/décochée)
   /*  const handleCheckboxChange = async () => {
        const newStatus = !isChecked;  // Bascule le statut
        setIsChecked(newStatus);  // Met à jour l'état local
    
        try {
            // Met à jour le statut dans db.json via une requête PATCH
            const response = await fetch(`http://localhost:3000/Task/${task.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ statut: newStatus })
            });
    
            if (!response.ok) {
                throw new Error("Failed to update task status");
            }
    
            // Appelle la fonction onTaskUpdate pour actualiser les données
            if (onTaskUpdate) {
                onTaskUpdate(task.id, newStatus);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche:", error);
        }
    }; */


     // Fonction pour gérer la suppression de la tâche
/*     const handleDelete = async () => {
        await fetch(`http://localhost:3000/Task/${task.id}`, {
            method: "DELETE"
        });

        // Appelle la fonction onTaskDelete pour supprimer la tâche localement
        if (onTaskDelete) {
            onTaskDelete(task.id);
        }
    }; */
