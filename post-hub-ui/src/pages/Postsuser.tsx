import React, { useEffect, useState } from 'react';
import { PostsService } from '../services/posts.service';
import PostsTable from '../components/postsTable';
import { useParams } from 'react-router-dom';
import { Post } from '../models/posts.interfaces';
import { io, Socket } from 'socket.io-client';
import '../assets/css/posts.css';

const PostsUser: React.FC = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const socket: Socket = io('http://localhost:8001');
    socket.on('postDeleted', checkForPostDeleted);
    socket.on('postCreated', checkForNewPosts);
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const fetchPostsByUser = async () => {
      setPosts(await PostsService.getUserPosts(Number(userId)));
    };
    fetchPostsByUser();
  }, [userId]);

  const handleDeletePost = async (postId: number) => {
    await PostsService.deletePostById(postId);
  };

  const handlePostCreated = async (post: Partial<Post>) => {
    const newPost: Post = {
      ...post,
      userId: Number(userId),
      id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    } as Post;

    await PostsService.createPost(newPost);
  };

  const checkForNewPosts = async (post: Post) => {
    console.log('checkForNewPosts', post);

    setPosts((prevPosts) => prevPosts.concat(post));
  };

  const checkForPostDeleted = async (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== Number(postId)),
    );
  };

  return (
    <div>
      <PostsTable
        posts={posts}
        onDeletePost={handleDeletePost}
        onCreatePost={handlePostCreated}
      />
    </div>
  );
};

export default PostsUser;
