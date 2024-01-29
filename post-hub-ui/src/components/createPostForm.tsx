import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Post } from '../models/posts.interfaces';

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

  return (
    <Dialog
      className="create-post-dialog"
      header={<div className="dialog-header">Create New Post</div>}
      visible
      onHide={onClose}
    >
      <div className="p-fluid">
        <div className="p-field">
          <label className="field-header" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label className="field-header" htmlFor="body">
            Body:
          </label>
          <textarea
            id="body"
            name="body"
            value={newPost.body}
            onChange={handleInputChange}
            rows={5}
          ></textarea>
        </div>
      </div>
      <div className="p-dialog-footer">
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={onClose}
          className="p-button-text"
        />
        <Button
          label="Create"
          icon="pi pi-check"
          onClick={handleCreatePost}
          autoFocus
        />
      </div>
    </Dialog>
  );
};

export default CreatePostForm;
