import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, FileCode, Folder, LayoutGrid, UserCircle, Users, Shield, Activity, Tag, Copy } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutGrid,
    },
    {
      title: 'User Management',
      icon: UserCircle,
      items: [
        {
          title: 'All Users',
          href: '/users',
          icon: Users, // You can use different icons for subitems
        },
        {
          title: 'User Types',
          href: '/users/user-type',
          icon: Shield,
        },
        {
          title: 'Activity Log',
          href: '/users/activity',
          icon: Activity,
        },
      ],
    },
    {
      title: 'Project Management',
      icon: FileCode,
      items: [
        {
          title: 'All Projects',
          href: '/projects',
          icon: Folder,
        },
        {
          title: 'Categories',
          href: '/projects/categories',
          icon: Tag,
        },
        {
          title: 'Templates',
          href: '/projects/templates',
          icon: Copy,
        },
      ],
    },
    {
      title: 'Team Management',
      icon: Users,
      items: [
        {
          title: 'All Teams',
          href: '/teams',
          icon: Users,
        },
        {
          title: 'Team Types',
          href: '/teams/team-type',
          icon: Shield,
        },
      ],
    },
  ];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
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
