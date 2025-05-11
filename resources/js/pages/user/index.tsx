import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle, Edit, Eye, Trash, XCircle } from 'lucide-react';

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
    is_active: boolean;
    user_type: {
        id: number;
        name: string;
    };
}

interface UsersProps extends PageProps {
    users: User[];
}

export default function Users({ users }: UsersProps) {
    function toggleStatus(id: number) {
        router.put(
            `/users/${id}/toggle-status`,
            {},
            {
                preserveScroll: true,
            },
        );
    }
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
                            <TableHead>Status</TableHead>
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
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleStatus(user.id)}
                                        title={user.is_active ? 'Deactivate' : 'Activate'}
                                    >
                                        {user.is_active ? (
                                            <CheckCircle className="text-green-600" size={20} />
                                        ) : (
                                            <XCircle className="text-red-500" size={20} />
                                        )}
                                    </Button>
                                </TableCell>
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
