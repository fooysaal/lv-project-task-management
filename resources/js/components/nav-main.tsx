import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
  import { type NavItem } from "@/types";
  import { Link, usePage } from "@inertiajs/react";
  import { Fragment } from "react";

  export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
      <SidebarGroup className="px-2 py-0">
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <Fragment key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={item.href === page.url}
                  tooltip={{ children: item.title }}
                >
                  <Link href={item.href} prefetch>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Render sub-items if they exist */}
              {item.items?.length > 0 &&
                item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title} className="pl-8">
                    <SidebarMenuButton
                      asChild
                      isActive={subItem.href === page.url}
                      tooltip={{ children: subItem.title }}
                    >
                      <Link href={subItem.href} prefetch>
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }
