import { Head } from '@inertiajs/react';
import { type Post } from '@/types';

interface ShowProps {
  post: Post;
}

export default function Show({ post }: ShowProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className="text-3xl">{post.title}</h1>
      <p className="mt-4">{post.content}</p>
      <p className="mt-4 text-sm text-gray-600">
        Created at {new Date(post.created_at).toLocaleString()}
      </p>
    </>
  );
}
