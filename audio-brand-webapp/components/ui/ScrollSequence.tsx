"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLoading } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSequenceProps {
    folder: string;
    count: number;
    filenamePrefix: string;
    ext?: string;
    padStart?: number;
    className?: string;
    triggerId?: string;
}

const ScrollSequence: React.FC<ScrollSequenceProps> = ({
    folder,
    count,
    filenamePrefix,
    ext = "jpg",
    padStart = 3,
    className,
    triggerId,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    const { register, progress } = useLoading();
    // Use a ref to ensure we only register once per component mount
    const registeredRef = useRef(false);

    const formatIndex = (i: number) => i.toString().padStart(padStart, "0");

    useEffect(() => {
        if (!registeredRef.current) {
            register(count);
            registeredRef.current = true;
        }

        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        const onImageLoad = () => {
            loadedCount++;
            progress(1);
            if (loadedCount === count) {
                setLoaded(true);
                setImages(imgs);
            }
        };

        for (let i = 1; i <= count; i++) {
            const img = new Image();
            img.src = `/${folder}/${filenamePrefix}${formatIndex(i)}.${ext}`;
            img.onload = onImageLoad;
            img.onerror = onImageLoad;
            imgs.push(img);
        }
    }, [folder, count, filenamePrefix, ext, padStart, register, progress]);

    // Render logic extracted for reuse
    const renderFrame = (progress: number, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imgs: HTMLImageElement[]) => {
        const floatIndex = progress * (count - 1);
        const index1 = Math.floor(floatIndex);
        const index2 = Math.min(count - 1, index1 + 1);
        const blend = floatIndex - index1;

        const img1 = imgs[index1];
        const img2 = imgs[index2];

        if (!img1 || !img1.complete || img1.naturalWidth === 0) return;

        // Force high DPI
        const dpr = window.devicePixelRatio || 1;

        // Calculations for CONTAIN (Show full image, no cropping)
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const imgRatio = img1.width / img1.height;
        const winRatio = vw / vh;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (winRatio > imgRatio) {
            drawWidth = vw;
            drawHeight = vw / imgRatio;
            if (drawHeight < vh) {
                drawHeight = vh;
                drawWidth = vh * imgRatio;
            }
        } else {
            drawHeight = vh;
            drawWidth = vh * imgRatio;
            if (drawWidth < vw) {
                drawWidth = vw;
                drawHeight = vw / imgRatio;
            }
        }

        offsetX = (vw - drawWidth) / 2;
        offsetY = (vh - drawHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw first frame
        context.globalAlpha = 1;
        context.drawImage(img1, 0, 0, img1.width, img1.height, offsetX, offsetY, drawWidth, drawHeight);

        // Draw second frame with opacity if needed
        if (blend > 0 && img2 && img2.complete && img2.naturalWidth > 0 && index1 !== index2) {
            context.globalAlpha = blend;
            context.drawImage(img2, 0, 0, img2.width, img2.height, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    useEffect(() => {
        if (!loaded || !canvasRef.current || !containerRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Initial Sizing
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Force re-render if possible or wait for scroll update
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        // Initial render
        renderFrame(0, canvas, context, images);

        const triggerStrategy = {
            trigger: containerRef.current, // Use the container as trigger
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // Increase smooth scrubbing
        };

        const st = ScrollTrigger.create({
            ...triggerStrategy,
            onUpdate: (self) => {
                renderFrame(self.progress, canvas, context, images);
            },
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            st.kill();
        };
    }, [loaded, images, count]);

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            {/* The sticky container for the canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Global loading screen handles this now */}
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>
            {/* Child content (text overlays) will be rendered by parent by passing children, 
            but for this simpler architecture component, we assume parent overlays separate absolute divs 
            OR we assume this component is just the background.
        */}
        </div>
    );
};

export default ScrollSequence;
