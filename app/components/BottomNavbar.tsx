"use client";

import { Heart, Home, HomeIcon, LayoutGrid, MessageCircle, PlusCircle, User } from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
    {
        id: 0,
        name: "Home",
        href: "/",
        icon: HomeIcon

    },
    {
        id: 1,
        name: "Feed",
        href: "/feed",
        icon: LayoutGrid
    },
    {
        id: 2,
        name: "Messages",
        href: "/messages",
        icon: MessageCircle
    },
    {
        id: 3,
        name: "Sell",
        href: "/sell",
        icon: PlusCircle
    },
    {
        id: 4,
        name: "Profile",
        href: "/profile",
        icon: User
    }
];

export default function BottomNavbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[75%] max-w-xl">
        <div className="flex items-center justify-between gap-6 px-6 py-3 bg-background/80 backdrop-blur-lg
            border shadow-lg rounded-2xl">
                {navbarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    
                    return (
                        <Link
                            key={link.id}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 px-2 py-1 transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            >
                            <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
                            <span className="text-xs font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </div>
    </nav>
    )
}