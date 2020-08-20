import { DataTypes, Model, BuildOptions, Sequelize, ModelAttributes,  } from 'sequelize';
import { SequelizeConnection } from '../config/database';


interface User extends Model {
    id: number;
    name: string;
    foodId?: string | null;
}

type UserStatic = typeof Model &
    (new (values?: object, options?: BuildOptions) => User);

const attributes: ModelAttributes = {
    id: {
        allowNull: false,
        field: 'users_id',
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        allowNull: false,
        field: 'name',
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: 'Please enter your name'
            }
        }
    },
    foodId: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'food_id'
    }
}

const UserModel = SequelizeConnection.define('users', attributes) as UserStatic;

export {UserModel, attributes}

// type UserModel = typeof Model &
//     (new (values?: object, options?: BuildOptions) => User);

// const userFactory = (sequelize: Sequelize) => {
//     const User = (<UserModel>sequelize.define('User', {
//         id: {
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//             type: DataTypes.INTEGER,
//             field: 'users_id'
//         },
//         name: {
//             allowNull: false,
//             type: DataTypes.STRING,
//             field: 'name'
//         },
//         foodId: {
//             allowNull: true,
//             type: DataTypes.STRING,
//             field: 'food_id'
//         }
//     })) as UserModel;
// }

// export { UserModel, userFactory}