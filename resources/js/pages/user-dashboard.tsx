import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
// import { DataTable } from "@/components/data-table"
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';

// app/(app)/dashboard/page.tsx
export default function ManagerDashboard() {
    const { stats } = usePage().props;

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards stats={stats} />
                            <div className="text-muted-foreground px-4 pb-2 text-xs">
                                Last updated: {new Date(stats.lastUpdated).toLocaleString()}
                            </div>
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive />
                            </div>
                            {/* <DataTable /> */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
