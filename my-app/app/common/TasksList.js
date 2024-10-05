'use client';

import { useEffect, useState } from "react"; 
import init from './init';  // Importation de l'initialisation Firebase ou autre
import Tache from './Tache';  // Importation du composant Tache
import {collection, getDocs, query, where} from "firebase/firestore";

export default function TasksList() {
    const { auth, db } = init();
    const user = auth?.currentUser;  // Vérification de l'utilisateur actuel
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            if (user && user.email) {
                try {
                    // Créer une requête pour récupérer les tâches en fonction de l'utilisateur
                    const q = query(collection(db, "Task"), where("userId", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    
                    // Map des tâches récupérées et mise à jour de l'état
                    const tasksData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setTasks(tasksData);
                } catch (error) {
                    console.error('Erreur lors de la récupération des tâches:', error);
                }
            }
        };

        // Fetch initial des tâches
        fetchTasks();

        // Set interval pour re-fetch les tâches toutes les secondes
        const intervalId = setInterval(fetchTasks, 1000);

        // Nettoyage de l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
    }, [user, db]);

 

    // Fonction pour mettre à jour le statut d'une tâche
    const handleTaskUpdate = (taskId, newStatus) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskId ? { ...task, statut: newStatus } : task
        ));
    };



    // Fonction pour supprimer une tâche

    // Fonction pour supprimer une tâche
    const handleTaskDelete = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return (
        <div className='containerTasks'>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Tache
                            key={task.id}
                            task={task}
                            onTaskUpdate={handleTaskUpdate}
                            onTaskDelete={handleTaskDelete}
                            db={db}
                        />
                    ))
                ) : (
                    <p className="noTask">Aucune tâche disponible🎉</p>
                )}
            </div>
    );
}