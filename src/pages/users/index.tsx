import React, { useCallback, useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import api from '../../services/api';
import styles from '../../styles/UserIndexPage.module.css';
import containerStyle from '../../styles/Container.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IUser } from '../../interfaces/IUser';

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
  const [usersState, setUsersState] = useState(users);

  const redirectToViewUser = useCallback(
    (userId: string) => {
      router.push(`users/show/${userId}`);
    },
    [router],
  );

  const redirectToUpdateUser = useCallback(
    (userId: string) => {
      router.push(`users/update/${userId}`);
    },
    [router],
  );

  const handleDeleteUser = useCallback(
    async (userId: string) => {
      await api.delete(`api/users/${userId}`);

      setUsersState(usersState.filter(user => user._id !== userId));
    },
    [usersState],
  );

  return (
    <div className={containerStyle.container}>
      <h1>Index Users</h1>
      <Link href="/users/create">
        <a>Criar novo usuáro</a>
      </Link>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th_title}>Nome</th>
            <th className={styles.th_title}>Email</th>
            <th className={styles.th_title}>Estado</th>
            <th className={styles.th_title}>Vizualizar</th>
            <th className={styles.th_title}>Editar</th>
            <th className={styles.th_title}>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {usersState.map(user => {
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
                <th className={styles.th}>
                  <button
                    type="button"
                    onClick={() => redirectToUpdateUser(user._id)}
                  >
                    Editar
                  </button>
                </th>
                <th className={styles.th}>
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Excluir
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
