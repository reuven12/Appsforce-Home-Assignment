import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Post } from '../models/posts.interfaces';
import '../assets/css/posts.css';

interface CreatePostFormProps {
  onCreatePost: (post: Partial<Post>) => void;
  onClose: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onCreatePost,
  onClose,
}) => {
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    body: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreatePost = () => {
    onCreatePost(newPost);
    onClose();
  };
  const headers: (keyof Post)[] = ['title', 'body'];
  return (
    <Dialog
      className="create-post-dialog"
      header={<div className="dialog-header">Create New Post</div>}
      visible
      onHide={onClose}
    >
      <div className="p-field">
        {headers.map((header) => (
          <>
            <label className="header-input" htmlFor={header}>{`${
              header[0].toUpperCase() + header.slice(1)
            }:`}</label>
            <InputText
              className={header === 'body' ? 'body-input' : 'field-value'}
              name={header}
              value={newPost[header] as string}
              onChange={handleInputChange}
            />
          </>
        ))}
      </div>
      <div className="p-dialog-footer">
        <Button
          style={{ borderRadius: '6px' }}
          label="Cancel"
          icon="pi pi-times"
          onClick={onClose}
        />
        <Button
          style={{ borderRadius: '6px' }}
          label="Create"
          icon="pi pi-check"
          onClick={handleCreatePost}
        />
      </div>
    </Dialog>
  );
};

export default CreatePostForm;
