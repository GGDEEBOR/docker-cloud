import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar tareas al iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      alert('Por favor, escribe una tarea');
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        title: newTask
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error al agregar la tarea');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Lista de Tareas</h1>
        <p>Gestiona tus actividades diarias</p>
      </div>

      <div className="task-form">
        <input
          type="text"
          className="task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe una nueva tarea..."
        />
        <button className="add-button" onClick={addTask}>
          Agregar
        </button>
      </div>

      <div className="tasks-container">
        {loading ? (
          <div className="empty-state">
            <p>Cargando tareas...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <p>No hay tareas pendientes</p>
            <p>¡Agrega tu primera tarea!</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                <span className="task-text">{task.title}</span>
                <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
                  {task.completed ? 'Completada' : 'Pendiente'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;