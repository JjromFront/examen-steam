import { DataTypes, Model, Optional } from 'sequelize';
import db from '../db/connection';
import Task from './TaskModel';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    profileImage?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public profileImage?: string;

    public readonly createdAt!: Date;
    
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profileImage: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: db,
        updatedAt: false,
    }
);

User.belongsTo(Task, { foreignKey: 'assignedTo', as: 'tasks' });
export default User;
