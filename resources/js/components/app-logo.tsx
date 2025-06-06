import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import type { Auth } from '@/types/index';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
    auth: Auth;
  }

export default function AppLogo() {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">
                    {auth?.company?.name ?? 'Project Task Manager'}
                </span>
            </div>
        </>
    );
}
