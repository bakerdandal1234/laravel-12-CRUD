import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface ShowProps {
  post: {
    title: string;
    content: string;
    created_at: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'posts shows',
    href: '/posts',
  },
];

export default function Show({ post }: ShowProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={post.title} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div>
          <Link className="text-sm font-medium text-white bg-black p-2 rounded" href={route('posts.index')}>
            back
          </Link>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="text-center max-w-2xl mx-auto px-4 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-black text-xl font-semibold">{post.title}</h1>
            <p className="mt-4 text-black text-base">{post.content}</p>
            <p className="mt-4 text-sm text-gray-600">
              Created at {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
