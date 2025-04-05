"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProfile } from "@/store/useProfile";

const DashboardHeader = () => {
  // const [isDark, setIsDark] = useState(false);

  const profile = useProfile((state) => state.profile);
  const isLoading = useProfile((state) => state.isLoading);
  const error = useProfile((state) => state.error);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 py-4">
        <SidebarTrigger />

        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isDark ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </motion.button> */}

          {/* Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    You have 3 unread messages
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {[1, 2, 3].map((_, i) => (
                  <DropdownMenuItem
                    key={i}
                    className="flex items-center gap-4 p-4"
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500" />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">
                        New message from John Doe
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 minutes ago
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Info and Avatar Dropdown */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              {isLoading ? (
                <>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded mb-1"></div>
                  <div className="h-3 w-20 bg-muted animate-pulse rounded"></div>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">{profile?.username}</p>
                  <p className="text-xs text-muted-foreground">Premium Farmer</p>
                </>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                  {isLoading ? (
                    <AvatarFallback className="bg-muted animate-pulse" />
                  ) : (
                    <>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-primary/5">JD</AvatarFallback>
                    </>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    {isLoading ? (
                      <>
                        <div className="h-4 w-32 bg-muted animate-pulse rounded mb-1"></div>
                        <div className="h-3 w-28 bg-muted animate-pulse rounded"></div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium">johndoe@example.com</p>
                        <p className="text-xs text-muted-foreground">
                          Manage your account
                        </p>
                      </>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-3">
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3">
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-3 text-red-500">
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;