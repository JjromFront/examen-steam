import { DataTypes, Model, Optional } from 'sequelize';
import db from '../db/connection';
import User from './UserModel';

interface TaskAttributes {
    id: number;
    title: string;
    description: string;
    status: 'pendiente' | 'en curso' | 'finalizado';
    assignedTo: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> { }

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: 'pendiente' | 'en curso' | 'finalizado';
    public assignedTo!: number;

    public readonly createdAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pendiente', 'en curso', 'finalizado'),
            defaultValue: 'pendiente',
        },
        assignedTo: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        updatedAt: false,
    }
);

// Definir relación con el modelo User


// Exportar el modelo Task
export default Task;
