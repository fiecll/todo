import { useState, useEffect } from 'react';

export default function PostForm({ onAddPost }) {
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('bbs-user-name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) {
      alert('名前と投稿内容は必須です。');
      return;
    }
    localStorage.setItem('bbs-user-name', name);

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, name }),
    });
    const newPost = await res.json();
    onAddPost(newPost);
    setText('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block mb-1 font-medium text-gray-700">お名前</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="あなたの名前"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">投稿内容</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded resize-none"
          placeholder="投稿内容を入力してください"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
      >
        投稿
      </button>
    </form>
  );
}
