import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
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
} from '@/components/ui/select';
import { Transition } from '@headlessui/react';
import type { PageProps, BreadcrumbItem } from '@/types';
import { LoaderPinwheel } from "lucide-react";

interface EditUserProps extends PageProps {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    user_type: string | number;
  };
  userTypes: {
    id: number;
    name: string;
  }[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Edit User',
    href: '/users',
  },
];

export default function EditUser({ user, userTypes }: EditUserProps) {
  const { data, setData, patch, processing, errors, reset, recentlySuccessful } = useForm({
    name: user.name || '',
    email: user.email || '',
    user_type: user.user_type || '',
    password: '', // optional on edit
    password_confirmation: '', // optional on edit
    phone: user.phone || '',
  });

  const submit: FormEventHandler = (e) => {
    console.log('Submitting form with data:', data);
    e.preventDefault();

    patch(route('users.update', user.id), {
      preserveScroll: true,
    //   forceFormData: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit User" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl px-14 py-6">
        <div className="flex items-center justify-between">
          <HeadingSmall title="Edit User" description={`Edit user #${user.id}`} />
          <Link href="/users">
            <Button variant="outline">Back to Users</Button>
          </Link>
        </div>

        <div className="space-y-6">
          <form onSubmit={submit} className="space-y-6">
            {/* User Type Select */}
            <div className="grid gap-2">
            <Label htmlFor="user-type">User Type</Label>
                <Select
                    id="user-type"
                    value={String(data.user_type)} // ensure it's a string
                    onValueChange={(value) => setData('user_type', value)}
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
                <InputError className="mt-2" message={errors.user_type} />
            </div>

            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              <InputError className="mt-2" message={errors.name} />
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
              />
              <InputError className="mt-2" message={errors.email} />
            </div>

            {/* Optional Fields */}

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type='tel'
                placeholder="Phone number"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
              />
              <InputError className="mt-2" message={errors.phone} />
            </div>

            {/* Optional Password Change */}
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Leave blank to keep current password"
              />
              <InputError className="mt-2" message={errors.password} />
            </div>
            {/* Optional Password Confirmation */}
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                placeholder="Leave blank to keep current password"
              />
              <InputError className="mt-2" message={errors.password_confirmation} />
            </div>
            {/* Optional Avatar Upload */}
            {/* <div className="grid gap-2">
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                    id="avatar"
                    type="file"
                    onChange={(e) =>
                        setData('avatar', e.target.files ? e.target.files[0] : null)
                    }
                />
                <InputError className="mt-2" message={errors.avatar} />
            </div> */}
            {/* Optional Avatar Preview */}
            {/* {data.avatar && (
                <div className="mt-4">
                    <img
                        src={URL.createObjectURL(data.avatar)}
                        alt="Avatar Preview"
                        className="h-32 w-32 rounded-full"
                    />
                </div>
            )} */}

            {/* Save Button */}
            <div className="flex items-center gap-4">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> Updating...
                        </>
                    ) : (
                        'Update User'
                    )}
                </Button>
              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">User updated successfully.</p>
              </Transition>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
