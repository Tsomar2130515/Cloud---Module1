'use client';

import { useEffect, useState } from "react"; 
import init from './init';  // Importation de l'initialisation Firebase ou autre
import Tache from './Tache';  // Importation du composant Tache

export default function TasksList() {
    const { auth } = init();
    const user = auth?.currentUser;  // Vérification de l'utilisateur actuel
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            if (user && user.email) {
                try {
                    const response = await fetch(`http://localhost:3000/Task?nomUser=${encodeURIComponent(user.email)}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setTasks(data);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            }
        };

        // Initial fetch
        fetchTasks();

        // Set interval to fetch tasks every second
        const intervalId = setInterval(fetchTasks, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [user]);

    // Fonction pour mettre à jour le statut d'une tâche
    const handleTaskUpdate = (taskId, newStatus) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskId ? { ...task, statut: newStatus } : task
        ));
    };

    // Fonction pour supprimer une tâche
    const handleTaskDelete = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return (
        <div>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <Tache
                        key={task.id}
                        task={task}
                        onTaskUpdate={handleTaskUpdate}
                        onTaskDelete={handleTaskDelete}
                    />
                ))
            ) : (
                <p className="noTask">Aucune tâche disponible🎉</p>
            )}
        </div>
    );
}
