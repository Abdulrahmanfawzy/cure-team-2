import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

const links = [
    { label: "Home", href: "/" },
    { label: "Bookings", href: "/bookings" },
    { label: "Chat", href: "/chat" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <header className="h-27 w-full border-b border-slate-100 bg-white">
            <div className="mx-auto h-full max-w-360 flex  items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <div className="flex shrink-0 items-center">
                    {/* <HeartPulse className="h-8 w-8 text-blue-600" /> */}
                    <img src="images/HeartPulse.svg" alt="HeartPulse" />
                </div>
                {/* Search */}
                <div className="mx-8 hidden w-full max-w-142 md:block">
                    <div className="relative">
                        <Search
                            className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500" />

                        <Input type="search" placeholder="Search about specialty, doctor"
                            className=" h-10 rounded-[10px] border-0 bg-[#F5F6F8] pl-14 pr-4 text-[15px] text-slate-700 shadow-none placeholder:text-[#A5ADBA] 
                            focus-visible:ring-1 focus-visible:ring-blue-500" />
                    </div>
                </div>
                {/* Actions */}
                <div className="flex shrink-0 items-center gap-4">
                    {/* Menu */}
                    <div className="flex">
                        {links.map((link) => (
                            <div key={link.href} className={`mt-2 mx-1 ${isOpen ? "max-w-100 opacity-100" : "pointer-events-none max-w-0 opacity-0"}`}>
                                <Link to={link.href} className="px-5 py-2 rounded-[10px] bg-[#F5F6F8] text-slate-700 hover:bg-slate-100">{link.label}</Link>
                            </div>
                        ))}
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen((open: boolean) => !open)}
                            className="h-10 w-10 cursor-pointer rounded-[10px] bg-[#F5F6F8] text-slate-700 hover:bg-slate-100 ms-2" >
                            {isOpen ? <img src="images/Close.svg" alt="Close" /> : <img src="images/menu.svg" alt="menu" />}
                        </Button>
                    </div>
                    {/* Notification */}
                    <Button variant="ghost"
                        size="icon" className="h-10 w-10 rounded-[10px] bg-[#F5F6F8] text-slate-700 hover:bg-slate-100">
                        <Bell className="h-4.5 w-4.5" />
                    </Button>
                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="images/avatar.png" alt="avatar" />
                    </Avatar>
                </div>
            </div>
        </header>
    );
}