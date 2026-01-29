"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-transparent",
                    scrolled
                        ? "bg-[rgba(5,5,5,0.75)] backdrop-blur-md border-white/5 py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                    {/* Logo / Product Name */}
                    <Link
                        href="/"
                        className="text-xl font-semibold tracking-tight text-white/90 hover:text-white transition-colors z-[100] relative"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        WH-1000XM6
                    </Link>

                    {/* Center Links - Desktop */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
                        <Link href="#overview" className="hover:text-white transition-colors">Overview</Link>
                        <Link href="#technology" className="hover:text-white transition-colors">Technology</Link>
                        <Link href="#noise-cancelling" className="hover:text-white transition-colors">Noise Cancelling</Link>
                        <Link href="#specs" className="hover:text-white transition-colors">Specs</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2 z-[100] relative"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            // Close Icon
                            <div className="w-6 h-6 flex items-center justify-center">
                                <span className="absolute w-6 h-0.5 bg-white rotate-45"></span>
                                <span className="absolute w-6 h-0.5 bg-white -rotate-45"></span>
                            </div>
                        ) : (
                            // Hamburger
                            <>
                                <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                                <div className="w-6 h-0.5 bg-white"></div>
                            </>
                        )}
                    </button>

                    {/* Right CTA */}
                    <button className="hidden md:block group relative px-5 py-2 rounded-full overflow-hidden bg-white/10 hover:bg-white/20 transition-all duration-300">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-[--color-sony-blue] to-[--color-sony-cyan] transition-opacity duration-300" />
                        <span className="relative text-sm font-medium text-white">Pre-order</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-[#050505] z-[90] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <Link href="#overview" className="text-2xl font-light text-white" onClick={() => setIsMobileMenuOpen(false)}>Overview</Link>
                <Link href="#technology" className="text-2xl font-light text-white" onClick={() => setIsMobileMenuOpen(false)}>Technology</Link>
                <Link href="#noise-cancelling" className="text-2xl font-light text-white" onClick={() => setIsMobileMenuOpen(false)}>Noise Cancelling</Link>
                <Link href="#specs" className="text-2xl font-light text-white" onClick={() => setIsMobileMenuOpen(false)}>Specs</Link>
                <button className="mt-8 px-8 py-4 rounded-full bg-[#0050FF] text-white font-medium text-lg">
                    Pre-order Now
                </button>
            </div>
        </>
    );
};

export default Navbar;
