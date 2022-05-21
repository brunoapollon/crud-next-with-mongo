import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import api from '../../services/api';
import styles from '../../styles/UserIndexPage.module.css';

interface IUser {
  _id: string;
  name: string;
  email: string;
  country: string;
}

interface IDataResponse {
  data: IUser[];
}

type Props = {
  users: IUser[];
};

export const getStaticProps: GetStaticProps = async () => {
  const users = (await api.get<IDataResponse>('api/users')).data;

  return {
    props: { users },
  };
};

const IndexUser: NextPage<Props> = ({ users }) => {
  return (
    <div className={styles.container}>
      <h1>Index Users</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th_title}>Nome</th>
            <th className={styles.th_title}>Email</th>
            <th className={styles.th_title}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user._id} className={styles.tr}>
                <th className={styles.th}>{user.name}</th>
                <th className={styles.th}>{user.email}</th>
                <th className={styles.th}>{user.country}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IndexUser;
