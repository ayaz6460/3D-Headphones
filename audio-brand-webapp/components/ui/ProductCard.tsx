"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, image, className }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={cn(
                "group relative h-[500px] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 p-8 flex flex-col items-center justify-end hover:border-white/20 transition-all",
                className
            )}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />

            {/* Image placeholder or real image */}
            <div className="relative z-10 mb-8 w-full h-full flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="max-h-full object-contain drop-shadow-2xl" />
                ) : (
                    <span className="text-neutral-700 font-mono text-xs">PRODUCT IMAGE</span>
                )}
            </div>

            <div className="relative z-10 text-center">
                <h3 className="text-2xl font-semibold mb-2">{name}</h3>
                <p className="text-gray-400 mb-6">{description}</p>
                <Link href={`/product/${id}`}>
                    <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto">
                        View Product <ArrowRight size={16} />
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProductCard;
