import React, { useCallback } from 'react';
import { NextPage, GetStaticProps } from 'next';
import api from '../../services/api';
import styles from '../../styles/UserIndexPage.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface IUser {
  _id: string;
  name: string;
  email: string;
  country: string;
}

type Props = {
  users: IUser[];
};

export const getStaticProps: GetStaticProps = async () => {
  const users = (await api.get<IUser[]>('api/users')).data;

  return {
    props: { users },
  };
};

const IndexUser: NextPage<Props> = ({ users }) => {
  const router = useRouter();

  const redirectToViewUser = useCallback(
    (userId: string) => {
      router.push(`users/${userId}`);
    },
    [router],
  );
  return (
    <div className={styles.container}>
      <h1>Index Users</h1>
      <Link href="/users/store">
        <a>Criar novo usuáro</a>
      </Link>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th_title}>Nome</th>
            <th className={styles.th_title}>Email</th>
            <th className={styles.th_title}>Estado</th>
            <th className={styles.th_title}>Vizualizar</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user._id} className={styles.tr}>
                <th className={styles.th}>{user.name}</th>
                <th className={styles.th}>{user.email}</th>
                <th className={styles.th}>{user.country}</th>
                <th className={styles.th}>
                  <button
                    type="button"
                    onClick={() => redirectToViewUser(user._id)}
                  >
                    Vizualizar
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IndexUser;
