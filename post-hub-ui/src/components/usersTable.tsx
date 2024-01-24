import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SortOrder } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { User } from '../models/users.interfaces';
import '../assets/css/users.css';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }: UserTableProps) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>(1);
  const [first, setFirst] = useState<number>(0);

  const onSort = (e: any) => {
    setSortField(e.field);
    setSortOrder(e.order as SortOrder);
  };

  const handleUserClick = (userId: number) => {
    navigate(`/userPost/${userId}`);
  };

  return (
    <DataTable
      value={users}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={onSort}
      paginator
      rows={4}
      first={first}
      onPage={(e: any) => setFirst(e.first)}
    >
      <Column
        field="name"
        header="Full Name"
        body={(rowData: User) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => handleUserClick(rowData.id)}
          >
            {rowData.name}
          </div>
        )}
      />
      <Column field="email" header="Email" />
      <Column field="address" header="Address" />
    </DataTable>
  );
};

export default UserTable;
