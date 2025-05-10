import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { PencilIcon, PlusIcon, SaveIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

const statuses = ['Pending', 'Ongoing', 'Completed'];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Projects',
        href: '/projects',
    },
];

export default function ProjectIndex({ projects = [] }: { projects: any[] }) {
    const [editedProjects, setEditedProjects] = useState(() =>
        projects.map((project) => ({
            id: project.id,
            status: project.status,
            progress: project.progress,
        })),
    );

    const { data, setData, put, processing } = useForm({
        status: '',
        progress: 0,
    });


    const handleChange = (id: number, key: 'status' | 'progress', value: string | number) => {
        setEditedProjects((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
    };

    const handleSave = (id: number) => {
        const project = editedProjects.find((p) => p.id === id);
        if (!project) return;

        put(route('projects.updateStatus', id), {
            preserveScroll: true,
            data: {
                status: project.status,
                progress: project.progress,
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Projects" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Projects</h2>
                    <Button asChild>
                        <Link href={route('projects.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Project
                        </Link>
                    </Button>
                </div>

                <div className="overflow-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>Name</TableHead>
                                <TableHead className='text-center'>Team</TableHead>
                                <TableHead className='text-center'>Category</TableHead>
                                <TableHead className='text-center'>Status</TableHead>
                                <TableHead className='text-center'>Priority</TableHead>
                                <TableHead className='text-center'>Progress</TableHead>
                                <TableHead className='text-center'>Dates</TableHead>
                                <TableHead className='text-center'>Budget</TableHead>
                                <TableHead className='text-center'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="py-4 text-center">
                                        No projects available.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.map((project) => {
                                    const edited = editedProjects.find((p) => p.id === project.id);
                                    return (
                                        <TableRow key={project.id} className={project.deleted_at ? 'bg-red-500' : ''}>
                                            <TableCell>{project.name}</TableCell>
                                            <TableCell>{project.team?.name || '-'}</TableCell>
                                            <TableCell>{project.category?.name || '-'}</TableCell>
                                            <TableCell>
                                                {project.deleted_at ? (
                                                    project.status
                                                ) : (
                                                    <Select
                                                        defaultValue={edited?.status || project.status}
                                                        onValueChange={(value) => handleChange(project.id, 'status', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {statuses.map((status) => (
                                                                <SelectItem key={status} value={status}>
                                                                    {status}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </TableCell>
                                            <TableCell>{project.priority}</TableCell>
                                            <TableCell>
                                                {project.deleted_at ? (
                                                    `${project.progress}%`
                                                ) : (
                                                    <>
                                                        <Input
                                                            type="number"
                                                            value={edited?.progress || project.progress}
                                                            onChange={(e) => handleChange(project.id, 'progress', e.target.value)}
                                                            className="w-16"
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                        />
                                                        %
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {project.start_date} → {project.end_date}
                                            </TableCell>
                                            <TableCell>
                                                {project.budget} {project.currency}
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                {project.deleted_at ? (
                                                    <>
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={route('projects.restore', project.id)} method="post" as="button">
                                                                Restore
                                                            </Link>
                                                        </Button>
                                                        <Button variant="destructive" size="sm" asChild>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to permanently delete this project?')) {
                                                                        router.delete(route('projects.forceDelete', project.id), {
                                                                            preserveScroll: true,
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                Delete Forever
                                                            </Button>
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link href={route('projects.edit', project.id)}>
                                                                <PencilIcon className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to delete this project?')) {
                                                                        router.delete(route('projects.destroy', project.id), {
                                                                            preserveScroll: true,
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <TrashIcon className="text-destructive h-4 w-4" />
                                                            </Button>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleSave(project.id)}
                                                            disabled={processing}
                                                        >
                                                            <SaveIcon className="mr-1 h-4 w-4" />
                                                            Save
                                                        </Button>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
