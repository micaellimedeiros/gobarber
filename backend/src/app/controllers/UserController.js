import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const UserExists = await User.findOne({
            where: { email: req.body.email },
        }); // Verificar se já existe

        // Condição para caso exista
        if (UserExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        // Definir o que vai ser retornado para o usuário
        const { id, name, email, provider } = await User.create(req.body);

        // Definir o que vai ser retornado para o usuário
        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    // Bloquear acesso sem login & validação
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email && email !== user.email) {
            const UserExists = await User.findOne({ where: { email } });

            if (UserExists) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        }
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        await user.update(req.body);

        const { id, name, avatar } = await User.findByPk(req.userId, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        return res.json({
            id,
            name,
            email,
            avatar,
        });
    }
}

export default new UserController();
