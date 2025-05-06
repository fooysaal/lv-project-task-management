"use client";

import AppLayout from '@/layouts/app-layout';
import { useForm, Head, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import HeadingSmall from '@/components/heading-small';

type Category = {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
};

export default function EditProjectCategory({ category }: { category: Category }) {
  const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
    name: category.name,
    description: category.description || '',
    is_active: category.is_active,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('project-categories.update', category.id));
  };

  return (
    <AppLayout>
      <Head title="Edit Project Category" />

      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between">
          <HeadingSmall title="Edit Project Category" description="Modify the category" />
          <Link href={route('project-categories.index')}>
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
            <InputError message={errors.name} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            <InputError message={errors.description} className="mt-1" />
          </div>

          <div className="flex gap-4 items-center">
            <Button type="submit" disabled={processing}>Update</Button>

            <Transition
              show={recentlySuccessful}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-green-600">Updated successfully</p>
            </Transition>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
