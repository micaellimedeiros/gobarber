'use strict';

module.exports = {
up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
        id: {
            type: Sequelize.INTEGER, // Tipo inteiro
            allowNull: false, // Não permite que o campo fique nulo
            autoIncrement: true, // Ser auto incremental
            primaryKey: true, // Chave primária da tabela
        },
        name: {
            type: Sequelize.STRING, // Tipo String
            allowNull: false, // Não terá usuario sem nome
        },
        email: {
            type: Sequelize.STRING, // Tipo String
            allowNull: false, // Não terá usuário sem email
            unique: true, // Não terá email repetido
        },
        password_hash: {
            type: Sequelize.STRING, // Tipo String
            allowNull: false, // Não terá usuario sem senha
        },
        provider: {
            type: Sequelize.BOOLEAN,
            defaultValue: false, // É um cliente
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DATE, // Marcar a data da criação
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE, // Marcar a data da finalização
            allowNull: false,
        },
    });
},

down: (queryInterface) => {
    return queryInterface.dropTable('users');
}
};
