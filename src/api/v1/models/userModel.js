import { DataTypes } from 'sequelize';
import sequelize from '../../../db/connection.js';

const User = sequelize.define(
  'user',
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            isEmail: {
              args: true,
              msg: "Please enter a valid email address!",
            },
          },
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    paranoid: true
  }
);

export default User;