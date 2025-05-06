"use client";

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash, CheckCircle, XCircle } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project Categories',
        href: '/project-categories',
    },
];

type Category = {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
};

export default function IndexProjectCategories() {
  const { categories } = usePage().props as {
    categories: Category[];
  };

function toggleStatus(id: number) {
    router.put(`/project-categories/${id}/toggle-status`, {}, {
      preserveScroll: true,
    });
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user type?")) {
      router.delete(route('user-type.destroy', id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All Project Categories</h1>
                    <Link href="/project-categories/create">
                        <Button variant="outline">Create Project Category</Button>
                    </Link>
                </div>
                <Table>
                    <TableCaption>A list of project category.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">SL</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-2/5">Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[100px] text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((type, index) => (
                            <TableRow key={type.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{type.name}</TableCell>
                                <TableCell className="whitespace-normal break-words w-2/5">
                                    {type.description || '—'}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleStatus(type.id)}
                                        title={type.is_active ? 'Deactivate' : 'Activate'}
                                    >
                                        {type.is_active ? (
                                        <CheckCircle className="text-green-600" size={20} />
                                        ) : (
                                        <XCircle className="text-red-500" size={20} />
                                        )}
                                    </Button>
                                </TableCell>
                                <TableCell className="flex gap-2 text-center">
                                    {/* <Link href={`/project-categories',/${type.id}`}>
                                        <Button variant="outline" size="icon">
                                            <Eye size={16} />
                                        </Button>
                                    </Link> */}
                                    <Link href={`/project-categories/${type.id}/edit`}>
                                        <Button variant="outline" size="icon">
                                            <Edit size={16} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(type.id)}
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
  );
}
