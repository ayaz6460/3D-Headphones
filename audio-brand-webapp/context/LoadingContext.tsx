"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
    register: (count: number) => void;
    progress: (count?: number) => void;
    isLoading: boolean;
    percentage: number;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [total, setTotal] = useState(0);
    const [loaded, setLoaded] = useState(0);
    // Optional: Safety timeout state
    const [isTimedOut, setIsTimedOut] = useState(false);

    // Consider loading complete when we have registered items and all are loaded
    // OR if we have no registered items (initial state) - but usually we want to wait for at least mounting.
    // Actually, we should start as "not loading" until someone registers? 
    // Or start as "loading" and wait for a brief moment?
    // Use a small buffer to allow components to register.
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Give components a tick to register their assets
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const isLoading = (total > 0 && loaded < total) || !isReady;
    const percentage = total > 0 ? Math.round((loaded / total) * 100) : 0;

    const register = React.useCallback((count: number) => {
        setTotal((prev) => prev + count);
    }, []);

    const progress = React.useCallback((count = 1) => {
        setLoaded((prev) => prev + count);
    }, []);

    const value = React.useMemo(() => ({
        register,
        progress,
        isLoading,
        percentage
    }), [register, progress, isLoading, percentage]);

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
}
