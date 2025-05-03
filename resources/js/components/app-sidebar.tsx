"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  UsersRound,
  SearchIcon,
  Folder,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Users",
      href: "/users",
      icon: UsersIcon,
      items: [
        {
          title: "User Types",
          href: "/users/user-type",
        },
      ],
    },
    {
      title: "Analytics",
      href: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      href: "#",
      icon: FolderIcon,
    },
    {
      title: "Teams",
      href: '/teams',
      icon: UsersRound,
      items: [
        {
          title: "Team Types",
          href: "/teams/team-type",
        },
    ],
    },
  ],

  navSecondary: [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
      title: "Get Help",
      href: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      href: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      href: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      href: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      href: "#",
      icon: FileIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/update-company-info">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
