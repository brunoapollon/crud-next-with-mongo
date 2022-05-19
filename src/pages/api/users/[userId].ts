// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models/User';

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
    default:
      break;
  }
}
