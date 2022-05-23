import React, { createRef, useCallback, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import api from '../../../services/api';
import { ParsedUrlQuery } from 'querystring';

import styles from '../../../styles/ShowUserPage.module.css';
import Link from 'next/link';
import { Form } from '@unform/web';
import Input from '../../../components/Input';
import { FormHandles } from '@unform/core';
import { useRouter } from 'next/router';

interface IUpdateUserSubmit {
  name: string;
  email: string;
  country: string;
}

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

const UserUpdate: NextPage<Props> = ({ user }) => {
  const router = useRouter();
  const formRef = createRef<FormHandles>();

  useEffect(() => {
    formRef.current?.setData({
      name: user.name,
      email: user.email,
      country: user.country,
    });
  }, [formRef, user.country, user.email, user.name]);

  const handleUpdateUserSubmit = useCallback(
    async ({ name, email, country }: IUpdateUserSubmit) => {
      if (
        email === user.email &&
        name === user.name &&
        country === user.country
      )
        return;

      await api.put(`api/users/${user._id}`, { name, email, country });

      router.push('/users');
    },
    [router, user._id, user.country, user.email, user.name],
  );

  return (
    <div className={styles.container}>
      <h1>Update user</h1>
      <Form onSubmit={event => handleUpdateUserSubmit(event)} ref={formRef}>
        <Input type="text" placeholder="nome" name="name" />
        <Input type="text" placeholder="email" name="email" />
        <Input type="text" placeholder="estado" name="country" />
        <button type="submit" className={styles.button}>
          Atualizar
        </button>
      </Form>
      <Link href="/users">
        <a>Voltar para a tabela de usuáros</a>
      </Link>
    </div>
  );
};

export default UserUpdate;
