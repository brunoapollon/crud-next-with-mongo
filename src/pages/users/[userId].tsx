import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import api from '../../services/api';
import { ParsedUrlQuery } from 'querystring';

interface IUser {
  _id: string;
  name: string;
  email: string;
  country: string;
}

interface IUserProps {
  user: IUser;
}

interface Params extends ParsedUrlQuery {
  userId: string;
}

type Props = {
  user: IUser;
};

export const getStaticProps: GetStaticProps<
  IUserProps,
  Params
> = async context => {
  const { userId } = context.params!;
  const user = (await api.get<IUser>(`api/users/${userId}`)).data;

  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = (await api.get<IUser[]>('api/users')).data;

  const paths = users.map(user => {
    return {
      params: {
        userId: `${user._id}`,
      },
    };
  });

  return { paths, fallback: false };
};

const UserView: NextPage<Props> = ({ user }) => {
  return (
    <div>
      <h1>Nome: {user.name}</h1>
      <h3>Email: {user.email}</h3>
      <h3>Estado: {user.country}</h3>
    </div>
  );
};

export default UserView;
