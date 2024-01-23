import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Post } from '../models/posts.interfaces';

interface UserPostsTableProps {
  posts: Post[];
//   onDeletePost: (postId: number) => void;
}

const UserPostsTable: React.FC<UserPostsTableProps> = ({ posts }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleDeletePost = (postId: number) => {
    // onDeletePost(postId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText)
  );

  return (
    <>
      <div className="p-inputgroup">
        <InputText
          placeholder="Search posts..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <Button label="Search" icon="pi pi-search" onClick={() => {}} />
      </div>
      <DataTable value={filteredPosts} paginator rows={5}>
        <Column field="title" header="Title" />
        <Column field="body" header="Body" />
        <Column
          body={(rowData: Post) => (
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger"
              onClick={() => handleDeletePost(rowData.id)}
            />
          )}
        />
      </DataTable>
    </>
  );
};

export default UserPostsTable;
