import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { PageProps } from '@inertiajs/react'

export interface Auth {
    user: User;
    company: Company;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Company {
    id: number;
    name: string;
    email: string;
    logo?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

declare module '@inertiajs/react' {
    interface PageProps {
      stats: {
        totalUsers: number
        newProjects: number
        completedProjects: number
        pendingTasks: number
        completedTasks: number
        overdueTasks: number
        userTrend: number
        projectTrend: number
        taskTrend: number
        lastUpdated: string
        taskTrends: Array<{
          date: string
          completed: number
          pending: number
        }>
      }
    }
  }
