'use client';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transition } from '@headlessui/react';
import { LoaderPinwheel } from 'lucide-react';

export default function EditTeam() {
  const { team, teamTypes, users } = usePage().props as {
    team: {
      id: number;
      name: string;
      description: string;
      team_type_id: number;
      users: { id: number }[];
    };
    teamTypes: { id: number; name: string }[];
    users: { id: number; name: string; email: string }[];
  };

  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    name: team.name,
    description: team.description || '',
    team_type_id: String(team.team_type_id),
    user_ids: team.users.map((user) => user.id),
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('teams.update', team.id));
  };

  const handleUserToggle = (userId: number, isChecked: boolean) => {
    setData('user_ids', isChecked
      ? [...data.user_ids, userId]
      : data.user_ids.filter((id) => id !== userId)
    );
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Teams', href: '/teams' },
    { title: 'Edit Team', href: `/teams/${team.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${team.name}`} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <HeadingSmall title={`Edit ${team.name}`} description="Update team details" />
          <Link href="/teams">
            <Button variant="outline">Back to Teams</Button>
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Team Type */}
          <div className="grid gap-2">
            <Label htmlFor="team_type_id">Team Type</Label>
            <Select
              value={data.team_type_id}
              onValueChange={(value) => setData('team_type_id', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select team type" />
              </SelectTrigger>
              <SelectContent>
                {teamTypes.map((type) => (
                  <SelectItem key={type.id} value={String(type.id)}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputError message={errors.team_type_id} className="mt-2" />
          </div>

          {/* Team Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Team Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
              placeholder="Team name"
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
              placeholder="Team description"
            />
            <InputError message={errors.description} className="mt-2" />
          </div>

          {/* Team Members */}
          <div className="grid gap-2">
            <Label>Team Members</Label>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={data.user_ids.includes(user.id)}
                    onCheckedChange={(checked) =>
                      handleUserToggle(user.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`user-${user.id}`} className="font-normal">
                    {user.name} ({user.email})
                  </Label>
                </div>
              ))}
            </div>
            <InputError message={errors.user_ids} className="mt-2" />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-start gap-4">
            <Button type="submit" disabled={processing}>
              {processing ? (
                <>
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Update Team'
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
              <p className="text-sm text-green-600">Team updated successfully</p>
            </Transition>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
