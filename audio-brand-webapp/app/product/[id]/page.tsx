import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { ShoppingBag, Star } from "lucide-react";

// Mock data if DB fails
const MOCK_PRODUCTS = [
    {
        id: "headphone-01",
        name: "Sonic One",
        description: "Wireless Noise Cancelling Headphones",
        price: 349,
        stock: 50,
        images: ["/headphones/ezgif-frame-050.jpg"], // Use a frame from the sequence as product image
        category: "headphone",
        specs: { driverSize: "40mm", battery: "30h" }
    },
    {
        id: "speaker-01",
        name: "Aura Home",
        description: "High-Fidelity Smart Speaker",
        price: 499,
        stock: 20,
        images: ["/speaker/ezgif-frame-050.jpg"],
        category: "speaker",
        specs: { driverSize: "Woofer + Tweeter", battery: "Wired" }
    }
];

export default async function ProductPage({ params }: { params: { id: string } }) {
    // Try to fetch from DB, fallback to mock
    let product;
    try {
        // product = await prisma.product.findUnique({ where: { id: params.id } });
        // Database not running locally, using mock for demo
        product = MOCK_PRODUCTS.find(p => p.id === params.id);
    } catch (e) {
        product = MOCK_PRODUCTS.find(p => p.id === params.id);
    }

    if (!product) {
        // If not in mock, try to find by partial match or just default specific IDs for demo
        return notFound();
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Product Image Gallery (Simple Main Image for now) */}
                <div className="relative aspect-square w-full bg-neutral-900 rounded-3xl overflow-hidden flex items-center justify-center p-10 border border-white/5">
                    <div className="absolute inset-0 bg-gradient-radial from-neutral-800 to-transparent opacity-40" />
                    {/* Using standard img tag if external or local public folder */}
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Details */}
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-medium uppercase tracking-wider text-gray-400">
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <span className="text-gray-400 ml-1">(12 Reviews)</span>
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
                        {product.description}. Engineered for perfection, delivering sound that moves you.
                    </p>

                    <div className="text-4xl font-light mb-8">${product.price}</div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <button className="flex-1 bg-white text-black h-14 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            Add to Cart <ShoppingBag size={18} />
                        </button>
                        <button className="flex-1 bg-transparent border border-white/20 text-white h-14 rounded-full font-semibold hover:bg-white/10 transition-colors">
                            Buy Now
                        </button>
                    </div>

                    {/* Specs Table */}
                    <div className="border-t border-white/10 pt-8">
                        <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="text-gray-500">Driver Size</div>
                            <div>{product.specs?.driverSize || "Custom"}</div>

                            <div className="text-gray-500">Connectivity</div>
                            <div>Bluetooth 5.3</div>

                            <div className="text-gray-500">Material</div>
                            <div>Aerospace-grade Aluminum</div>

                            <div className="text-gray-500">Battery</div>
                            <div>{product.specs?.battery || "24 Hours"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
