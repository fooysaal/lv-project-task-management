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

interface EditTeamTypeProps {
  teamType: {
    id: number;
    name: string;
    description: string | null;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Team Types', href: '/teams/team-type' },
  { title: 'Edit', href: '#' },
];

export default function EditTeamType({ teamType }: EditTeamTypeProps) {
  const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
    name: teamType.name ?? '',
    description: teamType.description ?? '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('team-type.update', teamType.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Team Type`} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <HeadingSmall title="Edit Team Type" description={`Update details for "${teamType.name}"`} />
          <Link href="/teams/team-type">
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
                'Update Team Type'
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
              <p className="text-sm text-green-600">Team type updated successfully.</p>
            </Transition>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
