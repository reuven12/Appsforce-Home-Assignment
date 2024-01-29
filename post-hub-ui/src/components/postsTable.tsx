import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Post } from '../models/posts.interfaces';
import '../assets/css/posts.css';
import CreatePostForm from './createPostForm';
interface UserPostsTableProps {
  posts: Post[];
  onDeletePost: (postId: number) => void;
  onCreatePost: (post: Partial<Post>) => void;
}

const UserPostsTable: React.FC<UserPostsTableProps> = ({
  posts,
  onDeletePost,
  onCreatePost,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [showCreatePostForm, setShowCreatePostForm] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText),
  );

  return (
    <div className="posts-page">
      <div className="actions">
        <div className="p-search-input">
          <InputText
            placeholder="Search posts..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <Button
            label="Search"
            icon="pi pi-search"
            onClick={() => {}}
          />
        </div>
        <div className="create-post">
          <Button
            label="Create New Post"
            icon="pi pi-plus"
            className="p-button-create-post"
            onClick={() => setShowCreatePostForm(true)}
          />
        </div>
      </div>
      <DataTable value={filteredPosts} paginator rows={5}>
        <Column field="title" header="Title" />
        <Column field="body" header="Body" />
        <Column
          body={(rowData: Post) => (
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger"
              onClick={() => onDeletePost(rowData.id)}
            />
          )}
        />
      </DataTable>
      {showCreatePostForm && (
         <CreatePostForm
           onCreatePost={onCreatePost}
           onClose={() => setShowCreatePostForm(false)}
         />
       )}
    </div>
  );
};

export default UserPostsTable;
