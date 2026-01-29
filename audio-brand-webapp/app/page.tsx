"use client";

import React, { useRef, useLayoutEffect } from "react";
import Navbar from "@/components/Navbar";
import ScrollSequence from "@/components/ui/ScrollSequence";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight, Check, Star, Battery, Bluetooth, Music, Zap, ShieldCheck, Box } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- HEADPHONE TIMELINE ---
      const tlHeadphone = gsap.timeline({
        scrollTrigger: {
          trigger: "#scrolly-headphones",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

      // 0-15%: Hero
      tlHeadphone.to("#hero-text", { opacity: 0, y: -50, duration: 0.1 }, 0.12);

      // 15-40%: Engineering
      tlHeadphone.fromTo("#eng-text", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.1 }, 0.15);
      tlHeadphone.to("#eng-text", { opacity: 0, x: -50, duration: 0.1 }, 0.38);

      // 40-65%: ANC
      tlHeadphone.fromTo("#anc-text", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.1 }, 0.40);
      tlHeadphone.to("#anc-text", { opacity: 0, x: 50, duration: 0.1 }, 0.63);

      // 65-85%: Sound
      tlHeadphone.fromTo("#sound-text", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.1 }, 0.65);
      tlHeadphone.to("#sound-text", { opacity: 0, scale: 1.1, duration: 0.1 }, 0.83);

      // 85-100%: CTA
      tlHeadphone.fromTo("#cta-text", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.85);


      // --- SPEAKER TIMELINE ---
      // New timeline for the second pinned section
      const tlSpeaker = gsap.timeline({
        scrollTrigger: {
          trigger: "#scrolly-speakers",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

      // Intro (0-20%)
      tlSpeaker.to("#spk-intro", { opacity: 0, y: -30, duration: 0.1 }, 0.2);

      // Mid (30-60%)
      tlSpeaker.fromTo("#spk-mid", { opacity: 0, width: 0 }, { opacity: 1, width: "auto", duration: 0.1 }, 0.3);
      tlSpeaker.to("#spk-mid", { opacity: 0, duration: 0.1 }, 0.6);

      // End (70-100%)
      tlSpeaker.fromTo("#spk-end", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.1 }, 0.7);

    }, mainWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainWrapperRef} className="bg-[#050505] text-white selection:bg-[#0050FF] selection:text-white pb-32">
      <Navbar />

      {/* ===========================================
          SECTION 1: HEADPHONES SCROLLYTELLING 
          =========================================== */}
      <section id="scrolly-headphones" className="relative h-[500vh]">
        {/* Navigation Anchors */}
        <div id="overview" className="absolute top-0 w-full h-px pointer-events-none" />
        <div id="noise-cancelling" className="absolute top-[40%] w-full h-px pointer-events-none" />

        <ScrollSequence
          triggerId="headphones-seq"
          folder="headphones"
          count={200}
          filenamePrefix="ezgif-frame-"
          className="h-full"
        />
        <div className="absolute inset-0 pointer-events-none z-[60]">
          <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center relative">
            {/* BEATS 0-100% */}
            <div id="hero-text" className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
                Sony WH-1000XM6
              </h1>
              <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide mb-2">
                Silence, perfected.
              </p>
              <div className="absolute bottom-12 animate-bounce opacity-30">
                <ChevronRight className="rotate-90 w-6 h-6" />
              </div>
            </div>

            <div id="eng-text" className="absolute inset-0 flex items-center p-12 opacity-0 z-10">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Precision-engineered<br />
                  <span className="text-[#0050FF]">for silence.</span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Custom drivers. Sealed chambers. Optimized airflow.
                </p>
              </div>
            </div>

            <div id="anc-text" className="absolute inset-0 flex items-center justify-end p-12 opacity-0 text-right z-10">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Adaptive noise cancelling,<br />
                  <span className="text-[#00D6FF]">redefined.</span>
                </h2>
                <p className="text-lg text-white/70">Multi-mic array. Real-time analysis.</p>
              </div>
            </div>

            <div id="sound-text" className="absolute inset-0 flex flex-col items-center justify-end pb-32 p-6 text-center opacity-0 z-10">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Immersive, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0050FF] to-[#00D6FF]">lifelike sound.</span>
              </h2>
              <p className="max-w-2xl text-xl text-white/80 leading-relaxed">
                Detail, depth, texture.
              </p>
            </div>

            <div id="cta-text" className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 z-10">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                Hear everything.<br />Feel nothing else.
              </h2>
              <div className="flex flex-col md:flex-row gap-4 items-center pointer-events-auto">
                <button className="bg-[#0050FF] hover:bg-[#0040CC] px-10 py-4 rounded-full text-white font-semibold text-lg transition-all shadow-[0_0_40px_-10px_rgba(0,80,255,0.5)]">
                  Experience WH-1000XM6
                </button>
                <button className="px-10 py-4 rounded-full text-white/80 font-medium hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                  See full specs <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===========================================
          SECTION 3: FEATURE GRID 
          =========================================== */}
      <section id="technology" className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: "Active Noise Cancelling", desc: "Industry-leading isolation" },
            { icon: Music, title: "Spatial Audio", desc: "360° immersive soundstage" },
            { icon: Zap, title: "Fast Charging", desc: "3 min charge = 3 hours playback" },
            { icon: Bluetooth, title: "Hi-Res Wireless", desc: "LDAC optimized transmission" }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-[#0A0A0C] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2">
              <feature.icon className="w-10 h-10 text-[#00D6FF] mb-6" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/50">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ===========================================
          SECTION 4: SPECIFICATIONS 
          =========================================== */}
      <section id="specs" className="py-32 px-6 bg-[#0A0A0C]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl font-bold mb-16 tracking-tight">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-lg">
            <div className="space-y-8">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/50">Driver Unit</span>
                <span>30mm, Dome Type (CCAW Voice Coil)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/50">Frequency Response</span>
                <span>4Hz - 40,000Hz (JEITA)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/50">Battery Life</span>
                <span>Max. 30 hrs (NC ON), Max. 40 hrs (NC OFF)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/50">Bluetooth Version</span>
                <span>5.3</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/50">Noise Cancelling</span>
                <span>Auto NC Optimizer, Atmospheric Pressure Optimizing</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/50">Microphones</span>
                <span>8 Microphones (4 per ear cup)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/50">Supported Audio Formats</span>
                <span>SBC, AAC, LDAC</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/50">Weight</span>
                <span>Approx. 250g</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
          SECTION 4.5: SPEAKER SCROLLYTELLING (REMOVED FROM TOP)
          =========================================== */}
      <section id="scrolly-speakers" className="relative h-[300vh] bg-[#0A0A0C]">
        <ScrollSequence
          triggerId="speakers-seq"
          folder="speaker"
          count={124}
          filenamePrefix="ezgif-frame-"
          className="h-full"
        />
        <div className="absolute inset-0 pointer-events-none z-[60]">
          <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center relative">

            {/* INTRO */}
            <div id="spk-intro" className="absolute inset-0 flex items-center justify-center z-10">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Acoustic Perfection</h2>
            </div>

            {/* MID */}
            <div id="spk-mid" className="absolute inset-0 flex items-center justify-center opacity-0 z-10 w-full text-center">
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-xl md:text-3xl font-light text-white/80 items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[#00D6FF] font-bold">40mm</span>
                  <span>HD Driver</span>
                </div>
                <div className="w-px h-12 bg-white/20 hidden md:block"></div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[#0050FF] font-bold">Neodymium</span>
                  <span>Magnet</span>
                </div>
                <div className="w-px h-12 bg-white/20 hidden md:block"></div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-white font-bold">CCAW</span>
                  <span>Voice Coil</span>
                </div>
              </div>
            </div>

            {/* END */}
            <div id="spk-end" className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center leading-tight">
                High-Resolution Audio.<br /><span className="text-white/50">Uncompromised.</span>
              </h2>
              <div className="pointer-events-auto">
                <button className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-full text-white font-semibold text-lg hover:bg-white/20 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]">
                  Explore Components
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ===========================================
          SECTION 5: COMFORT & DESIGN 
          =========================================== */}
      <section className="relative h-screen flex items-end pb-32 px-6">
        <div className="absolute inset-0 bg-[#050505]">
          {/* Placeholder Hero Image */}
          <div className="w-full h-full bg-gradient-to-b from-[#0A0A0C] to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-end justify-between gap-12">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-2xl leading-[1.05]">
            All-day comfort with pressure-relieving ear cushions.
          </h2>
          <div className="max-w-md text-white/60 text-lg">
            <p>Soft-fit leather. Balanced weight distribution. The only thing you'll notice is the music.</p>
          </div>
        </div>
      </section>


      {/* ===========================================
          SECTION 6: TESTIMONIALS 
          =========================================== */}
      <section id="reviews" className="py-20 md:py-32 px-6 max-w-[1400px] mx-auto overflow-hidden">
        <div className="flex gap-6 animate-scroll mask-slide">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="min-w-[85vw] md:min-w-[400px] p-8 md:p-10 rounded-3xl bg-[#0A0A0C] border border-white/5 shadow-2xl relative">
              <div className="flex gap-1 text-[#0050FF] mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl md:text-2xl font-light italic mb-8">"Best noise cancelling I’ve ever experienced. It feels like silence wraps around you."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div>
                  <div className="font-bold">Alex Jameson</div>
                  <div className="text-xs text-white/40">Verified Buyer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ===========================================
          SECTION 7: COMPARISON 
          =========================================== */}
      <section className="py-20 md:py-32 px-6 bg-[#0A0A0C]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Compare Models</h2>

          <div className="overflow-x-auto">
            <div className="min-w-[600px]"> {/* Force min width for scrolling table */}
              <div className="grid grid-cols-3 gap-8 py-6 border-b border-white/10 text-sm">
                <div className="text-white/40">Feature</div>
                <div className="font-bold">WH-1000XM6</div>
                <div className="text-white/60">WH-1000XM5</div>
              </div>
              {[
                { label: "Battery", v1: "30 Hours", v2: "30 Hours" },
                { label: "Noise Cancelling", v1: "V2 Processor + QN2e", v2: "V1 Processor + QN1" },
                { label: "Driver", v1: "30mm Carbon", v2: "30mm" },
                { label: "Weight", v1: "250g", v2: "250g" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-8 py-6 border-b border-white/5 hover:bg-white/5 transition-colors px-4 rounded-lg">
                  <div className="text-white/50">{row.label}</div>
                  <div className="text-[#00D6FF] font-medium">{row.v1}</div>
                  <div className="text-white/50">{row.v2}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ===========================================
          SECTION 8: FINAL BUY 
          =========================================== */}
      <section id="buy" className="py-24 md:py-40 px-6 text-center">
        <h2 className="text-5xl md:text-6xl lg:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-white to-gray-600 bg-clip-text text-transparent">Own the silence.</h2>
        <div className="text-4xl font-light mb-12">$349.00</div>

        <div className="flex justify-center gap-4 mb-16">
          <div className="w-8 h-8 rounded-full bg-black border-2 border-white cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-white border border-white/20 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" />
          <div className="w-8 h-8 rounded-full bg-[#0050FF] border border-white/20 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button className="bg-white text-black px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-200 transition-colors shadow-2xl shadow-white/10">
            Pre-order Now
          </button>
          <button className="border border-white/20 bg-transparent text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-colors">
            Add to Cart
          </button>
        </div>
      </section>

    </main>
  );
}
