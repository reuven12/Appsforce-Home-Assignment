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
        <InputText
          style={{ width: '25%' }}
          placeholder="Search posts..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <Button style={{"marginRight":"20px"}} label="Search" icon="pi pi-search" onClick={() => {}} />
        <Button
          className="p-button-create-post"
          label="Create New Post"
          icon="pi pi-plus"
          onClick={() => setShowCreatePostForm(true)}
        />
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
