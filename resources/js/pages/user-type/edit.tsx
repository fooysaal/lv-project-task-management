import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { LoaderPinwheel } from "lucide-react";
import type { BreadcrumbItem } from '@/types';

interface EditUserTypeProps {
  userType: {
    id: number;
    name: string;
    description: string | null;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'User Types', href: '/users/user-type' },
  { title: 'Edit', href: '#' },
];

export default function EditUserType({ userType }: EditUserTypeProps) {
  const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
    name: userType.name ?? '',
    description: userType.description ?? '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('user-type.update', userType.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit User Type`} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <HeadingSmall title="Edit User Type" description={`Update details for "${userType.name}"`} />
          <Link href="/users/user-type">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Name */}
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

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Optional description"
            />
            <InputError className="mt-2" message={errors.description} />
          </div>

          {/* Save */}
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={processing}>
              {processing ? (
                <>
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                'Update User Type'
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
              <p className="text-sm text-green-600">User type updated successfully.</p>
            </Transition>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
