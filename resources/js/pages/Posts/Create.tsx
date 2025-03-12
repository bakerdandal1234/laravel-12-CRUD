import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@headlessui/react';
import { FormEvent, FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'posts create',
        href: '/posts',
    },
];

export default function PostCreate() {
    const { data, setData, post, errors } = useForm({
        title: '',
        content: '',
    });
    
    const submit: FormEventHandler = (e: FormEvent<Element>): void => {
        e.preventDefault();
        post(route('posts.store'));
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="posts create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link className="text-sm font-medium text-white bg-black p-2 rounded" href={route('posts.index')}>back</Link>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">title</Label>

                        <Input
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoComplete="title"
                            placeholder="title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">body</Label>

                        <Textarea
                            id="content"
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-15 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " 
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="content"
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