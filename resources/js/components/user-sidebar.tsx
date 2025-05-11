import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FileCode, Folder, LayoutGrid, Users, TableOfContents } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/user-dashboard',
      icon: LayoutGrid,
    },
    {
        title: 'Team Management',
        icon: Users,
        items: [
          {
            title: 'My Teams',
            href: '/teams',
            icon: Users,
          },
        ],
      },
    {
      title: 'Project Management',
      icon: FileCode,
      items: [
        {
          title: 'My Projects',
          href: '/projects',
          icon: Folder,
        },
      ],
    },
    {
      title: 'Task Management',
      icon: TableOfContents,
      items: [
        {
          title: 'My Tasks',
          href: '/projects/tasks',
          icon: Folder,
        },
      ],
    },
  ];

const footerNavItems: NavItem[] = [
    {
        title: 'Project Repositories',
        href: 'projects/repositories',
        icon: Folder,
    },
];

export function UserSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/user-dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
