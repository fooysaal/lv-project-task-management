import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Task } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/projects/tasks',
    },
];

export default function TaskIndex({ tasks = [] }: { tasks: Task[] }) {
    const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);
    const [openModalId, setOpenModalId] = useState<number | null>(null);
    const [formState, setFormState] = useState({
        status: '',
        progress: 0,
        spent_time: 0,
    });

    const { auth } = usePage().props as any;
    const isSuperUser = [1, 2].includes(auth?.user?.user_type_id);

    const canEditTask = (task: Task) => {
        return task.status !== 'Completed';
    };

    const handleStatusUpdate = (taskId: number, updatedValues: Partial<Task>) => {
        setUpdatingTaskId(taskId);
        router.put(route('projects.tasks.updateStatus', taskId), updatedValues, {
            preserveScroll: true,
            onFinish: () => {
                setUpdatingTaskId(null);
                setOpenModalId(null);
            },
        });
    };

    const openModal = (task: Task) => {
        setFormState({
            status: task.status ?? '',
            progress: task.progress ?? 0,
            spent_time: task.spent_time ?? 0,
        });
        setOpenModalId(task.id);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Tasks" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Tasks</h2>
                    {isSuperUser && (
                        <Button asChild>
                            <Link href={route('projects.tasks.create')}>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add Task
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="overflow-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                {isSuperUser && <TableHead>Assigned To</TableHead>}
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Estimated Time (Hrs)</TableHead>
                                <TableHead>Time Spent (Hrs)</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="py-4 text-center">
                                        No tasks available.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tasks.map((task) => {
                                    const editable = canEditTask(task);

                                    return (
                                        <TableRow key={task.id}>
                                            <TableCell>{task.name}</TableCell>
                                            {isSuperUser && (
                                                <TableCell>{task.assigned_to?.name || '-'}</TableCell>
                                            )}

                                            <TableCell>
                                                {editable ? (
                                                    <Select
                                                        defaultValue={task.status}
                                                        onValueChange={(value) =>
                                                            handleStatusUpdate(task.id, { status: value })
                                                        }
                                                        disabled={updatingTaskId === task.id}
                                                    >
                                                        <SelectTrigger className="w-[120px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Pending">Pending</SelectItem>
                                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                                            <SelectItem value="Completed">Completed</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    task.status
                                                )}
                                            </TableCell>

                                            <TableCell>{task.priority}</TableCell>

                                            <TableCell>
                                                {editable ? (
                                                    <Input
                                                        type="number"
                                                        className="w-[80px]"
                                                        defaultValue={task.progress}
                                                        min={0}
                                                        max={100}
                                                        onBlur={(e) =>
                                                            handleStatusUpdate(task.id, {
                                                                progress: parseInt(e.target.value) || 0,
                                                            })
                                                        }
                                                        disabled={updatingTaskId === task.id}
                                                    />
                                                ) : (
                                                    `${task.progress}%`
                                                )}
                                            </TableCell>

                                            <TableCell>{task.due_date}</TableCell>
                                            <TableCell>{task.estimated_time} hrs</TableCell>

                                            <TableCell>
                                                {editable ? (
                                                    <Input
                                                        type="number"
                                                        className="w-[80px]"
                                                        defaultValue={task.spent_time}
                                                        min={0}
                                                        max={100}
                                                        onBlur={(e) =>
                                                            handleStatusUpdate(task.id, {
                                                                spent_time: parseInt(e.target.value) || 0,
                                                            })
                                                        }
                                                        disabled={updatingTaskId === task.id}
                                                    />
                                                ) : (
                                                    `${task.spent_time ?? 0} hrs`
                                                )}
                                            </TableCell>

                                            <TableCell className="space-x-2">
                                                {isSuperUser ? (
                                                    <>
                                                        {/* <Button variant="ghost" size="sm" asChild>
                                                            <Link href={route('projects.tasks.edit', task.id)}>
                                                                <PencilIcon className="h-4 w-4" />
                                                            </Link>
                                                        </Button> */}
                                                        <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        if (confirm('Are you sure you want to delete this project?')) {
                                                                            router.delete(route('projects.tasks.destroy', task.id), {
                                                                                preserveScroll: true,
                                                                            });
                                                                        }
                                                                    }}
                                                                >
                                                                    <TrashIcon className="text-destructive h-4 w-4" />
                                                                </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleStatusUpdate(task.id, {
                                                                    status: task.status,
                                                                    progress: task.progress,
                                                                    spent_time: task.spent_time,
                                                                })
                                                            }
                                                            disabled={updatingTaskId === task.id}
                                                        >
                                                            Save
                                                        </Button>
                                                    </>
                                                ) : (
                                                    editable && (
                                                        <Button
                                                            variant="link"
                                                            size="sm"
                                                            onClick={() => openModal(task)}
                                                        >
                                                            Update
                                                        </Button>
                                                    )
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Modal */}
                <Dialog open={!!openModalId} onOpenChange={() => setOpenModalId(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Task</DialogTitle>
                            <DialogDescription>
                                Update the task details below and click "Save Changes".
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium">Status</label>
                                <Select
                                    value={formState.status}
                                    onValueChange={(value) =>
                                        setFormState((prev) => ({ ...prev, status: value }))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">Progress (%)</label>
                                <Input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={formState.progress}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            progress: +e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">Time Spent (hrs)</label>
                                <Input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={formState.spent_time}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            spent_time: +e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <DialogFooter className="pt-4">
                            <Button
                                variant="secondary"
                                onClick={() => setOpenModalId(null)}
                                disabled={updatingTaskId === openModalId}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() =>
                                    openModalId &&
                                    handleStatusUpdate(openModalId, formState)
                                }
                                disabled={updatingTaskId === openModalId}
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
