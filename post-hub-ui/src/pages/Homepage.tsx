import React, { useEffect, useState } from 'react';
import { UsersService } from '../services/users.service';
import UserTable from '../components/usersTable';
import { User } from '../models/users.interfaces';
import '../assets/css/users.css';

const Homepage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData: User[] = await UsersService.getUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <UserTable users={users} />
    </div>
  );
};

export default Homepage;
