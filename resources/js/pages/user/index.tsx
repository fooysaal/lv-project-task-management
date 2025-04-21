import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash } from 'lucide-react';
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

export default function Users() {
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
                        <TableRow>
                        <TableCell className="font-medium"> 1</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 2</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 3</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 4</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 5</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 6</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 7</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 8</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 9</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium"> 10</TableCell>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                            <a href="mailto:john@mail.com">john@mail.com</a>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Eye size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="icon">
                                <Trash size={16} />
                            </Button>
                        </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
