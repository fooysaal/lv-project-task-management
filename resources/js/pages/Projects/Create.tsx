"use client"

import AppLayout from '@/layouts/app-layout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import InputError from '@/components/input-error'
import HeadingSmall from '@/components/heading-small'
import { LoaderPinwheel } from 'lucide-react'
import { type BreadcrumbItem } from '@/types'
import { Transition } from '@headlessui/react'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Projects', href: '/projects' },
  { title: 'Create', href: '/projects/create' },
]

export default function CreateProject() {
  const { teams, categories, currencies } = usePage().props as {
    teams: { id: number; name: string }[]
    categories: { id: number; name: string }[]
    currencies: string[]
  }

  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    name: '',
    description: '',
    team_id: '',
    project_category_id: '',
    status: 'Pending',
    priority: 'Normal',
    start_date: '',
    end_date: '',
    progress: 0,
    budget: '',
    currency: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('projects.store'), {
      onSuccess: () => reset(),
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Project" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <HeadingSmall title="Create Project" description="Add a new project under your company" />
          <Link href="/projects">
            <Button variant="outline">Back to Projects</Button>
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Select */}
            <div className="grid gap-2">
              <Label htmlFor="team_id">Team</Label>
              <Select onValueChange={(val) => setData('team_id', val)} defaultValue={data.team_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={String(team.id)}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.team_id} className="mt-2" />
            </div>

            {/* Category Select */}
            <div className="grid gap-2">
              <Label htmlFor="project_category_id">Category</Label>
              <Select onValueChange={(val) => setData('project_category_id', val)} defaultValue={data.project_category_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.project_category_id} className="mt-2" />
            </div>

            {/* Status Select */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(val) => setData('status', val)} defaultValue={data.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.status} className="mt-2" />
            </div>

            {/* Priority Select */}
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(val) => setData('priority', val)} defaultValue={data.priority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.priority} className="mt-2" />
            </div>

            {/* Currency Select */}
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select onValueChange={(val) => setData('currency', val)} defaultValue={data.currency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((cur) => (
                    <SelectItem key={cur} value={cur}>
                      {cur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.currency} className="mt-2" />
            </div>

            {/* Budget Input */}
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                type="number"
                value={data.budget}
                onChange={(e) => setData('budget', e.target.value)}
                placeholder="e.g. 50000"
              />
              <InputError message={errors.budget} className="mt-2" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="grid gap-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={data.start_date}
                onChange={(e) => setData('start_date', e.target.value)}
              />
              <InputError message={errors.start_date} className="mt-2" />
            </div>

            {/* End Date */}
            <div className="grid gap-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={data.end_date}
                onChange={(e) => setData('end_date', e.target.value)}
              />
              <InputError message={errors.end_date} className="mt-2" />
            </div>
          </div>

          {/* Project Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
              placeholder="Project Name"
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
              placeholder="A short project description"
            />
            <InputError message={errors.description} className="mt-2" />
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={processing}>
              {processing ? (
                <>
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                'Create Project'
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
              <p className="text-sm text-green-600">Project created successfully</p>
            </Transition>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
