import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectToDatabase();
    const {id} = req.query;

    if(req.method === "DELETE") {
        try{
            await Post.findByIdAndDelete(id);
            return res.status(200).json({ message: "削除成功" });
        }catch(err){
            console.error("🔥 APIエラー:", err);
            return res.status(500).json({ error: "サーバー内部エラー" });
        }
    }
    res.status(405).end();
}