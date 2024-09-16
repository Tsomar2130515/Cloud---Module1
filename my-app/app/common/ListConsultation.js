'use client';
import { useState, useEffect } from "react";
import init from './init';  // Importation de l'initialisation Firebase
import TasksList from './TasksList';  // Importation du composant de la liste de tâches
import { collection, addDoc } from "firebase/firestore";

export default function TaskPage() {
    const { auth, db } = init();  // Initialisation de l'authentification Firebase
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Vérification de l'état de l'utilisateur au chargement
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);  // Stocke l'utilisateur s'il est connecté
            } else {
                setUser(null);  // Réinitialise l'utilisateur s'il n'est pas connecté
            }
            setLoading(false);  // Arrête l'indicateur de chargement une fois la vérification effectuée
        });

        // Nettoyage lors de la désinstallation du composant
        return () => unsubscribe();
    }, [auth]);


    //fonction pour ajouter une nouvelle tâche avec firebase
    const addNewTask = async () => {
        if (newTaskName.trim()) {
            const newTask = {
                nom: newTaskName,
                statut: false,
                userId: user?.uid // Utilisation de l'email de l'utilisateur 
            };

            try {
                const response = await addDoc(collection(db, "Task"), newTask);  // Ajoute la tâche à Firestore
                const createdTask = { id: response.id, ...newTask };  // Ajoute l'ID de la tâche créée
                setTasks([...tasks, createdTask]);  // Met à jour l'état avec la nouvelle tâche
                setNewTaskName("");  // Efface le champ de saisie
            } catch (error) {
                console.error("Erreur lors de l'ajout de la tâche :", error);
            }
        }
    };

    
    if (loading) {
        return <div>Chargement...</div>;
    }

    // Extrait la partie de l'email avant le caractère '@'
    const emailPrefix = user?.email.split('@')[0] || '';

    // Affichage de la liste des tâches si l'utilisateur est connecté
    return user ? (
        <div className="affichageTache">
            {/* Formulaire pour ajouter une nouvelle tâche */}
            <div className="mb-3 btnAjout">
                <input
                    type="text"
                    className="form-control"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Nouvelle tâche"
                />
                <button onClick={addNewTask} className="btn btn-primary mt-2">
                    Ajouter
                </button>
            </div>
            <h2 className="entete">Tâches à faire pour {emailPrefix}</h2>
            <TasksList user={user} /> {/* Passer l'utilisateur connecté à la liste des tâches */}
        </div>
    ) : (
        <div>Vous devez être connecté pour accéder à la liste de vos tâches.</div>
    );
}

// Fonction pour ajouter une nouvelle tâche
   /*  const addNewTask = async () => {
        if (newTaskName.trim()) {
            const newTask = { nom: newTaskName, statut: false, nomUser: user?.email || "unknown" };  // Utilisation de l'email de l'utilisateur ou d'une valeur par défaut
            const response = await fetch("http://localhost:3000/Task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });

            const createdTask = await response.json();
            setTasks([...tasks, createdTask]);  // Ajoute la nouvelle tâche à la liste
            setNewTaskName("");  // Efface le champ de saisie
        }
    }; */
