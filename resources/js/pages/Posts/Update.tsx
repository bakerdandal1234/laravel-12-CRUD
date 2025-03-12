import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@headlessui/react';
import { FormEvent, FormEventHandler } from 'react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

// تعريف واجهة البيانات للمنشور
interface Post {
  id: number;
  title: string;
  content: string;
}

// تعريف واجهة البيانات للصفحة
interface CustomPageProps {
  post: Post;
}

// Extend Inertia's PageProps
type PageProps = InertiaPageProps & CustomPageProps;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'posts update',
        href: '/posts',
    },
];

export default function PostUpdate() {
    // استخدام usePage للوصول إلى البيانات المرسلة من الكنترولر
    const { post } = usePage<{post:Post}>().props;
    
    // تعريف نموذج البيانات مع القيم الأولية من المنشور الحالي
    const { data, setData, put, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
    });
    
    // إرسال طلب تحديث بدلاً من إنشاء جديد
    const submit: FormEventHandler = (e: FormEvent<Element>): void => {
        e.preventDefault();
        put(route('posts.update', post.id));
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="update post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link className="text-sm font-medium text-white bg-black p-2 rounded" href={route('posts.index')}>back</Link>
                </div>
                <form onSubmit={submit} className="space-y-6" >
                    <div className="grid gap-2">
                        <Label htmlFor="title">title</Label>

                        <Input
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoComplete="title"
                            placeholder="أدخل العنوان"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">content</Label>

                        <Textarea
                            id="content"
                            className="mt-1 block w-full"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="أدخل المحتوى"
                        ></Textarea>

                        <InputError className="mt-2" message={errors.content} />
                    </div>
                    <div>
                        <Button>save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}