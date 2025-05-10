// resources/js/Pages/Projects/Repositories/Index.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project Repositories',
        href: '/projects/repositories',
    },
];

export default function RepositoryIndex({ projects = [], repositoryTypes = {} }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Project Repositories" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Project Repositories</h2>
                    <Button asChild>
                        <Link href={route('projects.repositories.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Repository
                        </Link>
                    </Button>
                </div>

                <div className="overflow-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-4 text-center">
                                        No projects available.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.map((project) => {
                                    const repositories = project.repositories || [];

                                    if (repositories.length === 0) {
                                        return (
                                            <TableRow key={`project-${project.id}`}>
                                                <TableCell>{project.name}</TableCell>
                                                <TableCell colSpan={4} className="text-muted-foreground">
                                                    No repository added
                                                </TableCell>
                                                <TableCell>
                                                    <Button size="sm" asChild>
                                                        <Link href={route('projects.repositories.create', project.id)}>Add Repository</Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }

                                    return repositories.map((repo) => (
                                        <TableRow key={`repo-${repo.id}`}>
                                            <TableCell>{project.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{repositoryTypes[repo.type] || repo.type}</Badge>
                                            </TableCell>
                                            <TableCell>{repo.display_name || '-'}</TableCell>
                                            <TableCell>
                                                {repo.url ? (
                                                    <a
                                                        href={repo.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        {new URL(repo.url).hostname}
                                                    </a>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{repo.description || '-'}</TableCell>
                                            <TableCell className="space-x-2">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={route('projects.repositories.edit', [project.id, repo.id])}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link
                                                        href={route('projects.repositories.destroy', [project.id, repo.id])}
                                                        method="delete"
                                                        as="button"
                                                        confirm="Are you sure you want to remove this repository?"
                                                    >
                                                        <TrashIcon className="text-destructive h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ));
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
