// Realizar a conexão com Banco de Dados e carregar os módulos

import Sequelize from 'sequelize'; // Responsável por fazer a conexão com o banco
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment]; // Array com todos models da aplicação

class Database {
    constructor(){
        this.init();
        this.mongo();

    }
    init(){
        this.connection = new Sequelize(databaseConfig); // Realizar conexão com a base de dados

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models)); // Percorrer todos modulos pegando os métodos
    }

    mongo(){
        this.mongoConnection = mongoose.connect(
            process.env.MONGO_URL,
            { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true}
        )
    }
}
export default new Database();
