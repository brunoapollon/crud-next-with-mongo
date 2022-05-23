import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';

import api from '../../../services/api';
import { IUser } from '../../../interfaces/IUser';
import containerStyle from '../../../styles/Container.module.css';

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

const ShowUser: NextPage<Props> = ({ user }) => {
  return (
    <div className={containerStyle.container}>
      <h1>Nome: {user.name}</h1>
      <h3>Email: {user.email}</h3>
      <h3>Estado: {user.country}</h3>
      <Link href="/users">
        <a>Voltar para a tabela de usuáros</a>
      </Link>
    </div>
  );
};

export default ShowUser;
