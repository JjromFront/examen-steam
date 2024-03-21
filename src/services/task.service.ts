import { Request, Response } from 'express';
import { TaskModel } from '../models/index';

const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.findAll();
        res.json(tasks);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getTaskById = async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.query.id as string);
        const task = await TaskModel.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error al obtener tarea por id:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, assignedTo, status } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!title || !description || !assignedTo || !status) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Validar que el estado sea uno de los valores permitidos
        if (status !== 'pendiente' && status !== 'en curso' && status !== 'finalizado') {
            return res.status(400).json({ message: 'El estado debe ser pendiente, en curso o finalizado' });
        }

        const newTask = await TaskModel.create({ title, description, assignedTo, status });
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.query.id as string);
        const { title, description, status } = req.body;
        const task = await TaskModel.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // Validar que el estado sea uno de los valores permitidos
        if (status !== 'pendiente' && status !== 'en curso' && status !== 'finalizado') {
            return res.status(400).json({ message: 'El estado debe ser pendiente, en curso o finalizado' });
        }

        // Verificar que al menos uno de los campos esté presente en la solicitud
        if (!title && !description && !status) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
        }

        await task.update({ title, description, status });
        res.json({ message: 'Tarea actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.query.id as string);
        const { status } = req.body;
        const task = await TaskModel.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // Validar que el estado sea uno de los valores permitidos
        if (status !== 'pendiente' && status !== 'en curso' && status !== 'finalizado') {
            return res.status(400).json({ message: 'El estado debe ser pendiente, en curso o finalizado' });
        }

        await task.update({ status });
        res.json({ message: 'Estado de tarea actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar estado de tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.query.id as string);
        const task = await TaskModel.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        await task.destroy();
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default { getAllTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask };
