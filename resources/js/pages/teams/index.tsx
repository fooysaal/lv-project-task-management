'use client';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type User = {
  id: number;
  name: string;
  email: string;
};

type Team = {
  id: number;
  name: string;
  description: string;
  team_type: { name: string } | null;
  users: User[];
};

type AuthUser = {
  id: number;
  name: string;
  email: string;
  user_type_id: number;
};

type PageProps = {
  teams: Team[];
  auth: { user: AuthUser };
};

export default function TeamIndex() {
  const { props } = usePage<PageProps>();
  const { teams, auth } = props;
  const userType = auth.user.user_type_id;

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Teams', href: '/teams' }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Teams" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Teams</h2>

          {(userType === 1 || userType === 2) && (
            <Link href="/teams/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </Link>
          )}
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{team.team_type?.name ?? 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>{team.description}</TableCell>
                  <TableCell>{team.users.length}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {(userType === 1 || userType === 2) && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/teams/${team.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={route('teams.destroy', team.id)}
                                method="delete"
                                as="button"
                                className="w-full text-left"
                              >
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem onClick={() => setSelectedTeam(team)}>
                          View Members
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for Team Members */}
      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTeam?.name} Members</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {selectedTeam?.users.length ? (
              selectedTeam.users.map((user) => (
                <div key={user.id} className="border p-2 rounded">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              ))
            ) : (
              <p>No members in this team.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
