import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { PlusIcon, PencilIcon, TrashIcon, Loader2 } from 'lucide-react'
import { Task } from '@/types'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const breadcrumbs = [
  { label: 'Dashboard', href: route('dashboard') },
  { label: 'Tasks', href: route('projects.tasks.index') }
]

export default function TaskIndex({ tasks = [] }: { tasks: Task[] }) {
    const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null)

    const handleStatusChange = (taskId: number, value: string) => {
      setUpdatingTaskId(taskId)
      router.put(route('projects.tasks.update', taskId), { status: value }, {
        preserveScroll: true,
        onFinish: () => setUpdatingTaskId(null)
      })
    }

    const handleProgressChange = (taskId: number, value: string) => {
      const progress = parseInt(value)
      if (isNaN(progress) || progress < 0 || progress > 100) return
      setUpdatingTaskId(taskId)
      router.put(route('projects.tasks.update', taskId), { progress }, {
        preserveScroll: true,
        onFinish: () => setUpdatingTaskId(null)
      })
    }

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="All Tasks" />

        <div className="space-y-6 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Tasks</h2>
            <Button asChild>
              <Link href={route('projects.tasks.create')}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Task
              </Link>
            </Button>
          </div>

          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Estimated Time(Hrs)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-4 text-center">
                      No tasks available.
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={task.status}
                          onValueChange={(value) => handleStatusChange(task.id, value)}
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
                      </TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="w-[80px]"
                          defaultValue={task.progress}
                          min={0}
                          max={100}
                          onBlur={(e) => handleProgressChange(task.id, e.target.value)}
                          disabled={updatingTaskId === task.id}
                        />
                      </TableCell>
                      <TableCell>{task.due_date}</TableCell>
                      <TableCell>{task.estimated_time}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={route('projects.tasks.edit', task.id)}>
                            <PencilIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={route('projects.tasks.destroy', task.id)}
                            method="delete"
                            as="button"
                            confirm="Are you sure you want to delete this task?"
                          >
                            <TrashIcon className="text-destructive h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </AppLayout>
    )
  }
