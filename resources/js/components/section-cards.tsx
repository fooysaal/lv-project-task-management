import { TrendingDownIcon, TrendingUpIcon, UsersIcon, FolderPlusIcon, FolderCheckIcon, ListTodoIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ stats }) {
  const {
    totalUsers,
    newProjects,
    completedProjects,
    pendingTasks,
    completedTasks,
    overdueTasks
  } = stats || {};

  // Calculate percentages for trends
  const userTrend = 5; // Example - you'd calculate this from your data
  const projectTrend = -10; // Example
  const taskTrend = 15; // Example
  const overdueTrend = 8; // Example

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* Card 1: Users */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            <UsersIcon className="size-4" /> Organization Users
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalUsers || 0}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {userTrend >= 0 ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {Math.abs(userTrend)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {userTrend >= 0 ? 'Growing team' : 'Reduced team'}
            {userTrend >= 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {userTrend >= 0 ? 'New hires this quarter' : 'Team changes'}
          </div>
        </CardFooter>
      </Card>

      {/* Card 2: Projects */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            <FolderPlusIcon className="size-4" /> Projects
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <span className="text-primary">{newProjects || 0}</span> / <span className="text-green-500">{completedProjects || 0}</span>
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {projectTrend >= 0 ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {Math.abs(projectTrend)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {projectTrend >= 0 ? 'More projects' : 'Fewer projects'}
            {projectTrend >= 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            New / Completed this month
          </div>
        </CardFooter>
      </Card>

      {/* Card 3: Tasks */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            <ListTodoIcon className="size-4" /> Tasks
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <span className="text-yellow-500">{pendingTasks || 0}</span> / <span className="text-green-500">{completedTasks || 0}</span>
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {taskTrend >= 0 ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {Math.abs(taskTrend)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {taskTrend >= 0 ? 'More activity' : 'Less activity'}
            {taskTrend >= 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Pending / Completed tasks
          </div>
        </CardFooter>
      </Card>

      {/* Card 4: Overdue Tasks (Suggested) */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            <AlertCircleIcon className="size-4 text-red-500" /> Overdue Tasks
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-red-500">
            {overdueTasks || 0}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {overdueTrend >= 0 ? (
                <TrendingUpIcon className="size-3 text-red-500" />
              ) : (
                <TrendingDownIcon className="size-3 text-green-500" />
              )}
              {Math.abs(overdueTrend)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {overdueTrend >= 0 ? 'More overdue' : 'Fewer overdue'}
            {overdueTrend >= 0 ? (
              <TrendingUpIcon className="size-4 text-red-500" />
            ) : (
              <TrendingDownIcon className="size-4 text-green-500" />
            )}
          </div>
          <div className="text-muted-foreground">
            Needs immediate attention
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
