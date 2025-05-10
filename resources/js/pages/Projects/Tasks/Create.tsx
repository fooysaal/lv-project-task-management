'use client';

import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoaderPinwheel } from 'lucide-react';

export default function CreateTask({ projects }: { projects: any[] }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        project_id: '',
        assigned_to: '',
        name: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        due_date: '',
        estimated_time: '',
        attachments: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('projects.tasks.store'), {
            onSuccess: () => reset(),
        });
    };

    const selectedProject = useMemo(() => projects.find((project) => String(project.id) === data.project_id), [data.project_id, projects]);

    return (
        <AppLayout breadcrumbs={[{ title: 'Create Task', href: '/tasks/create' }]}>
            <Head title="Tasks" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <HeadingSmall title="Create Task" description="Assign a task to a team member" />
                    <Link href="/tasks">
                        <Button variant="outline">Back to Tasks</Button>
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Project */}
                    <div className="grid gap-2">
                        <Label htmlFor="project_id">Project</Label>
                        <Select value={data.project_id} onValueChange={(val) => setData('project_id', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((project) => (
                                    <SelectItem key={project.id} value={String(project.id)}>
                                        {project.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.project_id} className="mt-2" />
                    </div>

                    {/* Assigned To */}
                    <div className="grid gap-2">
                        <Label htmlFor="assigned_to">Assign To</Label>
                        <Select value={data.assigned_to} onValueChange={(val) => setData('assigned_to', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectedProject?.team?.users?.map((user) => (
                                    <SelectItem key={user.id} value={String(user.id)}>
                                        {user.name} ({user.email})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.assigned_to} className="mt-2" />
                    </div>

                    {/* Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Task Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required placeholder="Task title" />
                        <InputError message={errors.name} className="mt-2" />
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
                    </div>

                    {/* Status */}
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={data.status} onValueChange={(val) => setData('status', val)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {['Pending', 'Ongoing', 'Completed'].map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Priority */}
                    <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={data.priority} onValueChange={(val) => setData('priority', val)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {['Low', 'Medium', 'High'].map((priority) => (
                                    <SelectItem key={priority} value={priority}>
                                        {priority}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Due Date */}
                    <div className="grid gap-2">
                        <Label htmlFor="due_date">Due Date</Label>
                        <Input type="date" id="due_date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)} />
                    </div>

                    {/* Estimated Time */}
                    <div className="grid gap-2">
                        <Label htmlFor="estimated_time">Estimated Time (hrs)</Label>
                        <Input
                            type="number"
                            id="estimated_time"
                            min={0}
                            value={data.estimated_time}
                            onChange={(e) => setData('estimated_time', e.target.value)}
                            placeholder="e.g., 5"
                        />
                    </div>

                    {/* Attachments */}
                    <div className="grid gap-2">
                        <Label htmlFor="attachments">Attachments</Label>
                        <Input type="file" id="attachments" onChange={(e) => setData('attachments', e.target.files?.[0] ?? null)} />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-start gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                </>
                            ) : (
                                'Create Task'
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
                            <p className="text-sm text-green-600">Task created successfully</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
