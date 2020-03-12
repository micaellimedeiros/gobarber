import Sequelize, { Model } from 'sequelize';

class File extends Model {
    static init (sequelize) { // Método que será chamado automaticamente
        super.init({ // Chamando método init da classe Model
            //Colunas dentro da base de dados:
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `${process.env.APP_URL}/files/${this.path}`;
                }
            }
        },
        {
            sequelize,
        }
    );
        return this;
    }
}
export default File;
