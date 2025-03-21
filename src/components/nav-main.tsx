"use client"

import {ChevronRight, type LucideIcon} from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
interface NavItem {
    title: string;
    url?: string;
    icon?: React.ComponentType;
    items?: NavItem[];
}
const useCurrentPath = () => {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState(pathname);

    useEffect(() => {
        setCurrentPath(pathname); // Update state when the pathname changes
    }, [pathname]);

    return currentPath;
};
export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url?: string
        icon?: LucideIcon
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const currentPath = useCurrentPath();

    const isActive = (item: NavItem): boolean => item.url === currentPath;

    const isParentActive = (item: NavItem): boolean => {
        if (item.url && item.url === currentPath) return true; // Parent is active only if it has a direct URL
        return item.items?.some((child) => child.url === currentPath) ?? false; // Otherwise, check child items
    };
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={isParentActive(item)}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild className={'cursor-pointer'} aria-expanded={isParentActive(item)}>
                                {item.items ?
                                    <SidebarMenuButton tooltip={item.title} className={'cursor-pointer'} isActive={isParentActive(item)}>
                                        {item.icon && <item.icon/>}
                                        <span>{item.title}</span>
                                        <ChevronRight
                                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                    </SidebarMenuButton>
                                    :
                                    <SidebarMenuButton tooltip={item.title} className={'cursor-pointer'} isActive={isActive(item)} asChild>
                                        <Link href={item.url || '#'}>
                                            {item.icon && <item.icon/>}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                }
                            </CollapsibleTrigger>
                            {item.items &&
                                <CollapsibleContent aria-expanded={isActive(item)} data-state={isActive(item) ? 'open' : 'closed'}>
                                    <SidebarMenuSub data-state={isActive(item) ? 'open' : 'closed'}>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild className={'cursor-pointer'}  isActive={isActive(subItem)}>
                                                    <Link href={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            }
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
