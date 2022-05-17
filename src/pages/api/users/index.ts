// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models/User';

interface IUser {
  name: string;
  email: string;
  country: string;
}

type DataResponseStore = {
  user: IUser;
  error: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request;
  const { name, email, country } = request.body;

  switch (method) {
    case 'POST':
      if (!name || !email || !country) {
        return response.status(400).json({ error: 'faltando dados.' });
      }
      try {
        const user = await User.create({ name, email, country });

        return response.status(201).json(user);
      } catch (err) {
        return response.status(400).json({ error: 'erro ao criar o usuário' });
      }
      break;

    default:
      break;
  }
}
