import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash, CheckCircle, XCircle } from 'lucide-react';
import { router } from '@inertiajs/react'; // Inertia router
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
        title: 'User Types',
        href: '/users/user-type',
    },
];

interface UserType {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
}

interface UserTypePageProps extends PageProps {
    userTypes: UserType[];
}

function toggleStatus(id: number) {
    router.put(`/users/user-type/${id}/toggle-status`, {}, {
      preserveScroll: true,
    });
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user type?")) {
      router.delete(route('user-type.destroy', id));
    }
  };

export default function UserTypeIndex({ userTypes }: UserTypePageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Types" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All User Types</h1>
                    <Link href="/users/user-type/create">
                        <Button variant="outline">Create User Type</Button>
                    </Link>
                </div>
                <Table>
                    <TableCaption>A list of user types.</TableCaption>
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
                        {userTypes.map((type, index) => (
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
                                    {/* <Link href={`/users/user-type/${type.id}`}>
                                        <Button variant="outline" size="icon">
                                            <Eye size={16} />
                                        </Button>
                                    </Link> */}
                                    <Link href={`/users/user-type/${type.id}/edit`}>
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
