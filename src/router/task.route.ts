// task.routes.ts
import { Router } from 'express';
import { TaskService } from '../services';
import ValidarJWT from '../middlewares/ValidateJwt';


const router = Router();

const {getAllTasks, createTask, deleteTask, getTaskById, updateTask, updateTaskStatus} = TaskService
// Obtener todas las tareas
router.get('/get-tasks', ValidarJWT, getAllTasks);

// Obtener una tarea por su id
router.get('/get-task', ValidarJWT, getTaskById);

// Crear una nueva tarea
router.post('/create-task', ValidarJWT, createTask);

// Actualizar una tarea
router.put('/update-task', ValidarJWT, updateTask);

// Actualizar el estado de una tarea
router.patch('/update-task-status', ValidarJWT, updateTaskStatus);

// Eliminar una tarea
router.delete('/delete-task', ValidarJWT, deleteTask);

module.exports = router;