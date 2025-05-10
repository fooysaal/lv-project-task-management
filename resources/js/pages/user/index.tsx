import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash } from 'lucide-react';
import type { PageProps } from '@/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface User {
  id: number;
  name: string;
  email: string;
  user_type: {
    id: number;
    name: string;
  };
}

interface UsersProps extends PageProps {
  users: User[];
}

export default function Users({ users }: UsersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All Users</h1>
                    <Link href="/users/create">
                        <Button variant="outline">Create User</Button>
                    </Link>
                </div>
                <Table>
                    <TableCaption>A list of users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">SL</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>User Type</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </TableCell>
                            
                            <TableCell>{user.user_type?.name ?? 'N/A'}</TableCell>
                            <TableCell className="flex gap-2">
                                <Link href={`/users/${user.id}`}>
                                <Button variant="outline" size="icon">
                                    <Eye size={16} />
                                </Button>
                                </Link>
                                <Link href={`/users/${user.id}/edit`}>
                                <Button variant="outline" size="icon">
                                    <Edit size={16} />
                                </Button>
                                </Link>
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)}>
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
