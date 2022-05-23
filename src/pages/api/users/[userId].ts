import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';

interface IUser {
  name: string;
  email: string;
  country: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request;

  switch (method) {
    case 'GET':
      try {
        const { userId } = request.query;

        const user = await User.findOne({ _id: userId });

        return response.status(200).json(user);
      } catch (err) {
        return response
          .status(400)
          .json({ error: 'falha ao buscar o usuário.' });
      }
    case 'PUT':
      try {
        const { userId } = request.query;
        const { name, email, country } = request.body;

        const user = await User.findOneAndUpdate(
          { _id: userId },
          { name, email, country },
          { new: true },
        );

        return response.status(200).json(user);
      } catch (err) {
        return response
          .status(400)
          .json({ error: 'falha ao buscar o usuário.' });
      }
    case 'DELETE':
      try {
        const { userId } = request.query;

        const user = await User.deleteOne({ _id: userId });

        return response
          .status(200)
          .json({ message: 'usuário deletado com sucesso.' });
      } catch (err) {
        return response
          .status(400)
          .json({ error: 'falha ao buscar o usuário.' });
      }

    default:
      break;
  }
}
