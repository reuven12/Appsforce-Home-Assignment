import React, { useEffect, useState } from 'react';
import { PostsService } from '../services/posts.service';
import PostsTable from '../components/postsTable';
import { useParams } from 'react-router-dom';
import { Post } from '../models/posts.interfaces';
import '../assets/css/posts.css';

const PostsUser: React.FC = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [deletePost, setDeletePost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostsByUser = async () => {
      setPosts(await PostsService.getUserPosts(Number(userId)));
    };
    fetchPostsByUser();
  }, [userId]);

  useEffect(() => {
    const deletePostById = async () => {
      if (deletePost) {
        await PostsService.deletePostById(deletePost.id);
        setPosts(posts.filter((post) => post.id !== deletePost.id));
      }
    };
    deletePostById();
  }, [deletePost]);

  return (
    <div>
      <PostsTable posts={posts} setDeletePost={setDeletePost} />
    </div>
  );
};

export default PostsUser;
