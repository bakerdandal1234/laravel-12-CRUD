import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'posts',
        href: '/posts',
    },
];

interface Post {
    id: number;
    title: string;
    content: string;
}

export default function Index() {
    const { delete: destroy } = useForm();
    const { posts } = usePage<{ posts: Post[] }>().props;
    
    const handleDelete = (id: number) => {
        if (confirm('are you sure you want to delete ?')) {
            destroy(route('posts.destroy', id));
        }
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="posts" />
            <div className="flex items-center gap-2 mt-4 ml-4">
                <Link className="text-sm font-medium text-white bg-black p-2 rounded" href={route('posts.create')}>create posts</Link>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="px-4 py-2 text-left font-medium text-white">ID</th>
                                <th className="px-4 py-2 text-left font-medium text-white">Title</th>
                                <th className="px-4 py-2 text-left font-medium text-white">content</th>
                                <th className="px-4 py-2 text-left font-medium text-white">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700">
                                    <td className="px-4 py-2 text-white">{post.id}</td>
                                    <td className="px-4 py-2 text-white">{post.title}</td>
                                    <td className="px-4 py-2 text-white">{post.content}</td>
                                    <td className="px-4 py-2 text-white">
                                        <Link href={route('posts.edit', post.id)} className="rounded bg-blue-600 px-2 py-1 text-sm text-white hover:bg-blue-500">
                                            Edit
                                        </Link>
                                        <Link href={route('posts.show', post.id)} className="rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-500 ml-2">
                                            Show   
                                            </Link>                               
                                        <button 
                                            onClick={() => handleDelete(post.id)} 
                                            className="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-500 ml-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}