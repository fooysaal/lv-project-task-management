import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useForm, Head, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create User',
        href: '/users/create',
    },
];

export default function CreateUsers() {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            onSuccess: () => reset(), // optional: clear the form on success
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <HeadingSmall title="Create User" description="Create a new user" />
                    <Link href="/users">
                        <Button variant="outline">Back to Users</Button>
                    </Link>
                </div>

                <div className="space-y-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="user-type">User Type</Label>

                            {/* add a select field to choose between light, dark and system */}
                            <Select id="user-type" onValueChange={(value) => setData('user_type', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="User Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.user_type} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        {/* add a input field to update phone */}
                        {/* <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>

                            <Input
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', Number(e.target.value))}
                                required
                                autoComplete="phone"
                                placeholder="Phone number"
                            />

                            <InputError className="mt-2" message={errors.phone} />
                        </div> */}

                        {/* add a field to change the avatar */}
                        {/* <div className="grid gap-2">
                            <Label htmlFor="avatar">Avatar</Label>

                            <Input
                                id="avatar"
                                type="file"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                            />

                            <InputError className="mt-2" message={errors.avatar} />
                        </div> */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                className="mt-1 block w-full"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder="Password"
                            />

                            <InputError className="mt-2" message={errors.password} />
                        </div>

                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
