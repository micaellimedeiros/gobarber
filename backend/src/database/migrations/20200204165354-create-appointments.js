'use strict';

module.exports = {
up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
        id: {
        type: Sequelize.INTEGER, // Tipo inteiro
        allowNull: false, // Não permite que o campo fique nulo
        autoIncrement: true, // Ser auto incremental
        primaryKey: true, // Chave primária da tabela
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        },
        provider_id: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        },
        canceled_at: {
            type: Sequelize.DATE,
            allowNull: true,
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
    return queryInterface.dropTable('appointments');
}
};
