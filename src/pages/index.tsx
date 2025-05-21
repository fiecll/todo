import { useEffect, useState } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

export default function Home() {
  type Post = {
    _id: number;
    title: string;
    content: string;
    // 他に必要なフィールドがあればここに追加
  };

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = async (id: number) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-red-500">
          Next.js 掲示板アプリ
        </h1>
        <PostForm onAddPost={handleAddPost} />
        <hr className="my-6" />
        <PostList posts={posts} onDelete={handleDeletePost} />
      </div>
    </div>
  );
}
