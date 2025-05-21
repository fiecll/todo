export default function PostList({ posts, onDelete }) {
  const myName =
    typeof window !== 'undefined'
      ? localStorage.getItem('bbs-user-name')
      : null;

  return (
    <ul className="space-y-4">
      {posts.map((post) => {
        const isMyPost = post.name === myName;
        return (
          <li
            key={post._id}
            className={`p-4 border rounded shadow-sm relative ${
              isMyPost
                ? 'bg-yellow-100 border-yellow-300'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-blue-700">{post.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mb-2">{post.text}</p>
            {onDelete && (
              <button
                className="text-sm text-red-500 hover:text-red-700 ml-auto block"
                onClick={() => onDelete(post._id)}
              >
                🗑
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
