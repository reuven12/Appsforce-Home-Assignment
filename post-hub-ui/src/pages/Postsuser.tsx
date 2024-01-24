import React, { useEffect, useState } from 'react';
import { PostsService } from '../services/posts.service';
import PostsTable from '../components/postsTable';
import { useParams } from 'react-router-dom';
import { Post } from '../models/posts.interfaces';

const PostsUser: React.FC = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostsByUser = async () => {
      const postsData: Post[] = await PostsService.getUserPosts(Number(userId));
      setPosts(postsData);
    };

    fetchPostsByUser();
  }, [userId]);
  return (
    <div>
      <PostsTable posts={posts} />
    </div>
  );
};

export default PostsUser;
