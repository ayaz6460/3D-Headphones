"use client";

import React from "react";
import { useLoading } from "@/context/LoadingContext";
import { cn } from "@/lib/utils";

export default function LoadingScreen() {
    const { isLoading, percentage } = useLoading();
    const [visible, setVisible] = React.useState(true);

    // Handle exit animation
    React.useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setVisible(false), 500); // Wait for fade out
            return () => clearTimeout(timer);
        } else {
            setVisible(true);
        }
    }, [isLoading]);

    if (!visible) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white transition-opacity duration-500",
                isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Logo or Brand Element */}
                <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-[#0050FF] animate-spin" />

                <div className="text-3xl font-bold tracking-tighter">
                    {percentage}%
                </div>

                <div className="text-white/40 text-sm tracking-widest uppercase">
                    Loading Experience
                </div>
            </div>
        </div>
    );
}
