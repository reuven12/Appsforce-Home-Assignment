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
      <div className="p-field">
        <label className="field-header" htmlFor="title">
          Title:
        </label>
        <input
          name="title"
          style={{ marginBottom: '10px', height: '30px' }}
          type="text"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <label className="field-header" htmlFor="body">
          Body:
        </label>
        <textarea
          name="body"
          style={{ marginBottom: '10px', height: '70px' }}
          value={newPost.body}
          onChange={handleInputChange}
          rows={5}
        ></textarea>
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
