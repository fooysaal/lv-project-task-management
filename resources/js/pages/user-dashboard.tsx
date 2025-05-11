import { UserSidebar } from '@/components/user-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

type Stats = {
  assignedProjects: number;
  completedProjects: number;
  assignedTasks: number;
  completedTasks: number;
  lastUpdated: string;
};

type Task = {
  id: number;
  name: string;
  project_name: string;
  status: string;
  progress: number;
  start_date: string;
  end_date: string;
};

type Props = PageProps & {
  stats: Stats;
  tasks: Task[];
};

export default function UserDashboard() {
  const { stats, tasks = [] } = usePage<Props>().props;

  return (
    <SidebarProvider>
      <UserSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 px-4 py-4 lg:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {/* Stats Cards with Dark Mode */}
              <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="text-sm text-gray-500 dark:text-gray-400">Assigned Projects</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.assignedProjects}</div>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="text-sm text-gray-500 dark:text-gray-400">Completed Projects</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedProjects}</div>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="text-sm text-gray-500 dark:text-gray-400">Assigned Tasks</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.assignedTasks}</div>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="text-sm text-gray-500 dark:text-gray-400">Completed Tasks</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedTasks}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Tasks</h2>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Task</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Project</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Status</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Progress</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900">
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{task.name}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{task.project_name}</td>
                      <td className="px-4 py-2 capitalize text-gray-700 dark:text-gray-300">{task.status}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{task.progress}%</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        {task.due_date}
                      </td>
                    </tr>
                  ))}
                  {tasks.length === 0 && (
                    <tr>
                      <td className="px-4 py-2 text-center text-gray-500 dark:text-gray-400" colSpan={5}>
                        No tasks assigned.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
