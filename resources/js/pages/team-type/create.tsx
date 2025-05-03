"use client";

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useForm, Head, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderPinwheel } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Team Types',
    href: '/teams/team-type',
  },
  {
    title: 'Create',
    href: '/teams/team-type/create',
  },
];

export default function CreateUserType() {
  const {
    data,
    setData,
    post,
    errors,
    reset,
    processing,
    recentlySuccessful,
  } = useForm({
    name: '',
    description: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('team-type.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Team Type" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <HeadingSmall title="Create Team Type" description="Define a new team type in your company" />
          <Link href="/teams/team-type">
            <Button variant="outline">Back to Team Types</Button>
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
              placeholder="e.g. Manager, Customer, Developer"
              autoComplete="off"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Optional description for this team type"
            />
            <InputError message={errors.description} className="mt-2" />
          </div>

          <div className="flex justify-start">
            <Button type="submit" disabled={processing}>
              {processing ? (
                <>
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                'Create Team Type'
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
              <p className="text-sm text-green-600 ml-4">User type created successfully</p>
            </Transition>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
