import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/Post';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      const { name, text } = req.body;
       if (!name || !text) {
      return res.status(400).json({ error: '名前と投稿内容は必須です' });
    }
      const newPost = new Post({ name, text });
      const savedPost = await newPost.save();
      return res.status(201).json(savedPost);
    }

    return res.status(405).end();
  } catch (err) {
    console.error('🔥 APIエラー:', err);
    return res.status(500).json({ error: 'サーバー内部エラー' });
  }
}
