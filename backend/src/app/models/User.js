// Arquivo que vai realizar conexão com o Banco de Dados

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs'; // Extensão do password

class User extends Model {
    static init (sequelize) { // Método que será chamado automaticamente
        super.init({ // Chamando método init da classe Model
            //Colunas dentro da base de dados:
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
        }
    );
        // Trechos de códigos exec. automaticamente baseado em ações do model

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar'})
    }


    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}
export default User;
