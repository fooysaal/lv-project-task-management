"use client";

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useForm, Head, Link, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoaderPinwheel } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Create User',
    href: '/users/create',
  },
];

export default function CreateUsers() {
  const { userTypes } = usePage().props as {
    userTypes: { id: number; name: string }[];
  };

  const { data, setData, post, errors, reset, processing, recentlySuccessful } = useForm({
    user_type_id: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('users.store'), {
      onSuccess: () => reset(),
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

        <form onSubmit={submit} className="space-y-6">
          {/* User Type Select */}
          <div className="grid gap-2">
            <Label htmlFor="user_type_id">User Type</Label>
            <Select
              onValueChange={(value) => setData('user_type_id', value)}
              defaultValue={data.user_type_id}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((type) => (
                  <SelectItem key={type.id} value={String(type.id)}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputError message={errors.user_type_id} className="mt-2" />
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
              placeholder="Full name"
              autoComplete="name"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
              placeholder="Email address"
              autoComplete="email"
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          {/* phone */}
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                required
                placeholder="Phone number"
                autoComplete="phone"
                />
                <InputError message={errors.phone} className="mt-2" />
            </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              required
              placeholder="Password"
              autoComplete="new-password"
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          {/* confirm password */}
            <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                }
                required
                placeholder="Confirm Password"
                autoComplete="new-password"
                />
                <InputError
                message={errors.password_confirmation}
                className="mt-2"
                />
            </div>

          <div className="flex justify-start">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> Saving...
                        </>
                    ) : (
                        'Create User'
                    )}
                </Button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-green-600">User created successfully</p>
                </Transition>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
