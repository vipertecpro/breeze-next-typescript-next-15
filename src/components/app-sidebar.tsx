"use client"

import * as React from "react"
import {
    Command, HomeIcon, MapPinIcon, ShieldPlusIcon, Users2Icon
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {useAuth} from "@/hooks/auth";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: HomeIcon
        },
        {
            title: "Roles & Permissions",
            icon: ShieldPlusIcon,
            items: [
                {
                    title: "List",
                    url: "/dashboard/roles/list",
                },
                {
                    title: "Create New",
                    url: "/dashboard/roles/create",
                },
                {
                    title: "Permissions",
                    url: "/dashboard/roles/permissions",
                },
            ],
        },
        {
            title: "Users",
            icon: Users2Icon,
            items: [
                {
                    title: "List",
                    url: "/dashboard/users/list",
                },
                {
                    title: "Create New",
                    url: "/dashboard/users/createNew",
                },
            ],
        },
        {
            title: "Geo Locations",
            icon: MapPinIcon,
            items: [
                {
                    title: "List",
                    url: "/dashboard/geoLocation/list",
                },
                {
                    title: "Create New",
                    url: "/dashboard/geoLocation/createNew",
                },
            ],
        },
    ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {user} = useAuth({middleware: 'auth'});
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={'/dashboard'}>
                                <div
                                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4"/>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span
                                        className="truncate font-semibold">{process.env['NEXT_PUBLIC_APP_NAME']}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
