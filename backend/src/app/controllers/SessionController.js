import jwt from 'jsonwebtoken'; // Módulo para validação
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';
import File from '../models/File';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, password } = req.body;

        // Validar se o email existe
        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        // Retorno de mensagem caso não exista
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Verificar se a senha está correta
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        // Retornar ao fazer login:

        const { id, name, avatar, provider } = user;
        return res.json({
            user: {
                id,
                name,
                email,
                provider,
                avatar,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}
export default new SessionController();
