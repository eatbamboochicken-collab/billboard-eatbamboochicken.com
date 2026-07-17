import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Scene {
  id: number;
  type: "opening" | "product" | "final";
  duration: number;
  name?: string;
  price?: string;
  image?: string;
}

const SCENES: Scene[] = [
  {
    id: 0,
    type: "opening",
    duration: 5000, // 5 seconds opening sequence
  },
  {
    id: 1,
    type: "product",
    duration: 8000, // 8 seconds per product slide
    name: "Bamboo Chicken",
    price: "$1.50 per stick",
    image: "https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/website/bamboo_chicken_3_sticks.webp",
  },
  {
    id: 2,
    type: "product",
    duration: 8000,
    name: "Bamboo Pie",
    price: "$1.50",
    image: "https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/website/bamboo_pie_3.webp",
  },
  {
    id: 3,
    type: "product",
    duration: 8000,
    name: "Bamboo Chicken Wrap",
    price: "$3.00",
    image: "https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/website/bamboo_chicken_wrap.webp",
  },
  {
    id: 4,
    type: "product",
    duration: 8000,
    name: "Sadza & Chicken",
    price: "$3.00",
    image: "https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/menu/bamboo_sadza_chicken.webp",
  },
  {
    id: 5,
    type: "product",
    duration: 8000,
    name: "Sadza & Beef",
    price: "$3.00",
    image: "https://pub-1d12d1bcd0c54b5282f7b9e9eec3ba59.r2.dev/assets/images/menu/bamboo_sadza_beef.webp",
  },
  {
    id: 6,
    type: "final",
    duration: 10000, // 10 seconds final social screen
  },
];

export default function App() {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [taglineToggle, setTaglineToggle] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const currentScene = SCENES[currentSceneIdx];

  // Detect touch device capabilities
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches || 
                       ("ontouchstart" in window) || 
                       (navigator.maxTouchPoints > 0);
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
  }, []);

  // Preload all images silently before they are shown to guarantee butter-smooth transitions
  useEffect(() => {
    SCENES.forEach((scene) => {
      if (scene.image) {
        const img = new Image();
        img.src = scene.image;
      }
    });
  }, []);

  // Handle automatic infinite scene progression and loop
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentSceneIdx((prev) => (prev + 1) % SCENES.length);
    }, currentScene.duration);

    return () => clearTimeout(timeout);
  }, [currentSceneIdx, currentScene.duration]);

  // Handle permanent header tagline continuous alternation every 3 seconds
  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setTaglineToggle((prev) => !prev);
    }, 3000);
    return () => clearInterval(taglineInterval);
  }, []);

  return (
    <div className="w-full h-screen bg-[#111111] flex items-center justify-center overflow-hidden select-none touch-none">
      {/* 9:16 Portrait Canvas (Immersive on mobile, centered frame on desktop) */}
      <div 
        id="billboard-canvas"
        className="relative w-full h-full max-w-[450px] aspect-[9/16] bg-white text-black overflow-hidden md:rounded-3xl md:shadow-[0_0_80px_rgba(0,0,0,0.85)] md:border-8 md:border-neutral-800 flex flex-col"
      >
        {/* Permanent Branded Header: stays fixed at the top throughout the entire experience */}
        <div 
          id="permanent-header" 
          className="w-full bg-white py-5 px-6 border-b border-neutral-100 flex flex-col items-center justify-center z-30 select-none shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
        >
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight uppercase leading-none text-center">
            <span className="text-neutral-950">BAMBOO</span> <span className="text-orange-600">CHICKEN</span>
          </h1>
          
          <div className="relative h-6 w-full mt-2 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {taglineToggle ? (
                <motion.p
                  key="permanent-tagline-crispy"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute font-sans font-extrabold text-xs sm:text-sm tracking-wider text-orange-600 uppercase"
                >
                  "Crispy & Juicy."
                </motion.p>
              ) : (
                <motion.p
                  key="permanent-tagline-magic"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute font-sans font-extrabold text-xs sm:text-sm tracking-wider text-amber-500 uppercase"
                >
                  "Taste the Bamboo Magic!"
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Viewport beneath the header */}
        <div className="relative flex-1 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSceneIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden"
            >
              {/* --- OPENING SCENE (5 Seconds) --- */}
              {currentScene.type === "opening" && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white px-8 text-center">
                  {/* Brand Header Container */}
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center select-none">
                      {/* BAMBOO: Fades In, Color shifting gently */}
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          color: ["#111111", "#FFB81C", "#FF5F1F", "#111111"]
                        }}
                        transition={{ 
                          opacity: { duration: 0.8 },
                          color: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="font-display font-black text-5xl sm:text-6xl tracking-tight uppercase leading-none"
                      >
                        BAMBOO
                      </motion.span>

                      {/* CHICKEN: Slides In from the right, Color shifting gently */}
                      <motion.span
                        initial={{ x: 60, opacity: 0 }}
                        animate={{ 
                          x: 0, 
                          opacity: 1,
                          color: ["#111111", "#FF5F1F", "#FFB81C", "#111111"]
                        }}
                        transition={{ 
                          x: { delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 },
                          opacity: { delay: 0.3, duration: 0.8 },
                          color: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="font-display font-black text-5xl sm:text-6xl tracking-tight uppercase leading-none"
                      >
                        CHICKEN
                      </motion.span>
                    </div>

                    {/* Subtitle / Country Accent */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="mt-3 flex items-center gap-1.5"
                    >
                      <span className="h-1 w-6 bg-amber-500 rounded-full"></span>
                      <p className="font-sans font-extrabold text-xs tracking-[0.3em] text-neutral-500 uppercase">
                        ZIMBABWE
                      </p>
                      <span className="h-1 w-6 bg-amber-500 rounded-full"></span>
                    </motion.div>
                  </div>

                  {/* Tagline Container - Elegantly transitions from "Crispy & Juicy." to "Taste the Bamboo Magic!" */}
                  <div className="relative mt-16 h-20 w-full flex items-center justify-center">
                    <AnimatePresence>
                      {/* Tagline Part 1: "Crispy & Juicy." (0.8s to 2.8s) */}
                      <motion.p
                        key="tagline-crispy"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ 
                          times: [0, 0.15, 0.85, 1],
                          duration: 2.2, 
                          delay: 0.8,
                          ease: "easeInOut" 
                        }}
                        className="absolute font-display font-black text-2xl sm:text-3xl text-orange-600 leading-tight tracking-tight max-w-[280px]"
                      >
                        "Crispy & Juicy."
                      </motion.p>

                      {/* Tagline Part 2: "Taste the Bamboo Magic!" (3.0s onwards) */}
                      <motion.p
                        key="tagline-magic"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ 
                          times: [0, 0.15, 0.8, 1],
                          duration: 1.8, 
                          delay: 3.0,
                          ease: "easeInOut" 
                        }}
                        className="absolute font-display font-black text-2xl sm:text-3xl text-amber-500 leading-tight tracking-tight max-w-[280px]"
                      >
                        "Taste the Bamboo Magic!"
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* --- PRODUCT SCENE (8 Seconds) --- */}
              {currentScene.type === "product" && (
                <div className="relative w-full h-full bg-[#FCFAF5] flex flex-col justify-between overflow-hidden">
                  {/* 90% Display Food Image Container */}
                  <div className="absolute inset-x-0 top-0 bottom-[130px] flex items-center justify-center px-4 overflow-hidden">
                    {/* Luxury dynamic spotlight glow behind food */}
                    <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-amber-200/40 to-orange-200/40 blur-3xl opacity-70" />
                    
                    {/* Subtle Ken Burns Slow Zoom */}
                    <motion.img
                      src={currentScene.image}
                      alt={currentScene.name}
                      initial={{ scale: 0.98 }}
                      animate={{ scale: 1.12 }}
                      transition={{ duration: 8.0, ease: "linear" }}
                      className="w-full h-full max-h-[75vh] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.12)] z-10"
                    />
                  </div>

                  {/* Bottom Overlay displaying ONLY: Product Name & Price */}
                  <div className="absolute bottom-0 inset-x-0 pb-10 px-6 z-20">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                      className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-neutral-100/80 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col gap-1"
                    >
                      <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight leading-tight">
                        {currentScene.name}
                      </h2>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                        <span className="font-sans font-semibold text-xs tracking-wider text-neutral-400 uppercase">
                          Price
                        </span>
                        <span className="font-display font-black text-3xl sm:text-4xl text-orange-600">
                          {currentScene.price}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* --- FINAL SCENE (10 Seconds) --- */}
              {currentScene.type === "final" && (
                <div className="w-full h-full bg-[#FCFAF5] flex flex-col justify-between px-6 py-8 text-center overflow-hidden">
                  {/* Subtle decorative glowing background accent */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-amber-100/40 to-orange-100/40 blur-3xl opacity-60 pointer-events-none" />

                  {/* Top Text Header */}
                  <div className="relative z-10">
                    <span className="font-sans text-[10px] sm:text-xs tracking-[0.25em] text-neutral-400 uppercase font-black">
                      Follow The Journey
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight leading-tight mt-1">
                      Join the Family!
                    </h2>
                  </div>

                  {/* Responsive Content based on device capability */}
                  <div className="flex-1 flex flex-col justify-center items-center relative z-10 py-4 w-full">
                    {isTouchDevice ? (
                      /* TOUCH INTERFACE (Mobile/Tablet): 4 Large Tappable Icons with no handles */
                      <div className="grid grid-cols-2 gap-6 max-w-[280px]">
                        {/* Facebook */}
                        <motion.a
                          href="https://www.facebook.com/profile.php?id=61592053377758"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-24 h-24 rounded-2xl bg-neutral-900 shadow-md hover:shadow-lg flex items-center justify-center text-white transition-all border border-neutral-800"
                        >
                          <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                          </svg>
                        </motion.a>

                        {/* Instagram */}
                        <motion.a
                          href="https://www.instagram.com/bamboochicken.zw"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-red-600 shadow-md hover:shadow-lg flex items-center justify-center text-white transition-all"
                        >
                          <svg className="h-10 w-10 stroke-current fill-none stroke-[2.2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </motion.a>

                        {/* TikTok */}
                        <motion.a
                          href="https://www.tiktok.com/@bamboo.chicken.zw"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-24 h-24 rounded-2xl bg-black shadow-md hover:shadow-lg flex items-center justify-center text-white transition-all border border-neutral-800"
                        >
                          <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.15 1.02 1.11 2.45 1.77 3.93 1.83v3.82c-1.78-.02-3.51-.55-4.97-1.57-.2-.14-.38-.29-.56-.44V14.5c.03 2.11-.6 4.23-1.89 5.86-1.51 1.95-4.04 3.14-6.52 3.12-2.84.05-5.69-1.42-7.1-3.9-1.59-2.73-1.57-6.28.05-8.99C4.42 8.24 7.37 6.8 10.4 7.1c.36.03.71.1 1.06.2V11.2c-.78-.26-1.66-.23-2.4.11-1.12.5-1.83 1.67-1.79 2.9.04 1.53 1.25 2.82 2.78 2.89 1.48.06 2.89-.96 3.12-2.42.06-.3.08-.61.08-.91V.02h-.725z" />
                          </svg>
                        </motion.a>

                        {/* WhatsApp */}
                        <motion.a
                          href="https://whatsapp.com/channel/0029VbCrLUNKQuJPLqLnZI0n"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-24 h-24 rounded-2xl bg-emerald-600 shadow-md hover:shadow-lg flex items-center justify-center text-white transition-all"
                        >
                          <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.18 1.452 4.825 1.453 5.46-.001 9.902-4.441 9.905-9.905.002-2.647-1.025-5.133-2.893-7.004C16.618 1.828 14.137.8 11.5.8 6.047.8 1.606 5.237 1.603 10.693c-.001 1.684.444 3.328 1.29 4.767l-.963 3.517 3.612-.947c1.4.766 2.89 1.124 4.105 1.124zM18.06 14.74c-.33-.165-1.955-.963-2.254-1.073-.3-.108-.518-.165-.736.165-.218.33-.84.11-1.026.33-.186.22-.373.248-.702.083-.33-.165-1.39-.512-2.648-1.633-.98-.874-1.64-1.953-1.832-2.28-.193-.33-.02-.507.144-.67.147-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.577-.083-.165-.736-1.774-1.008-2.434-.265-.636-.53-.55-.736-.56-.19-.01-.41-.01-.63-.01s-.577.083-.88.412c-.302.33-1.154 1.128-1.154 2.75 0 1.622 1.18 3.19 1.344 3.41.165.22 2.324 3.55 5.63 4.98.786.34 1.4.544 1.88.702.79.25 1.513.215 2.083.13.635-.094 1.955-.8 2.234-1.568.28-.77.28-1.43.196-1.568-.084-.14-.3-.22-.63-.385z" />
                          </svg>
                        </motion.a>
                      </div>
                    ) : (
                      /* NON-TOUCH / LARGE DISPLAY (TV, Kiosk, Desktop): Beautiful list with icons & official handles */
                      <div className="w-full max-w-[340px] flex flex-col gap-3.5 px-2">
                        {/* Instagram Row */}
                        <a
                          href="https://www.instagram.com/bamboochicken.zw"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-white p-3 rounded-xl border border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-200 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 via-orange-600 to-red-600 flex items-center justify-center text-white shrink-0">
                            <svg className="h-5 w-5 stroke-current fill-none stroke-[2.2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="font-sans font-bold text-xs text-neutral-400 uppercase tracking-wider leading-none">Instagram</p>
                            <p className="font-sans font-extrabold text-sm text-neutral-800 tracking-tight mt-0.5">@bamboochicken.zw</p>
                          </div>
                        </a>

                        {/* TikTok Row */}
                        <a
                          href="https://www.tiktok.com/@bamboo.chicken.zw"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-white p-3 rounded-xl border border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-200 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white shrink-0">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.15 1.02 1.11 2.45 1.77 3.93 1.83v3.82c-1.78-.02-3.51-.55-4.97-1.57-.2-.14-.38-.29-.56-.44V14.5c.03 2.11-.6 4.23-1.89 5.86-1.51 1.95-4.04 3.14-6.52 3.12-2.84.05-5.69-1.42-7.1-3.9-1.59-2.73-1.57-6.28.05-8.99C4.42 8.24 7.37 6.8 10.4 7.1c.36.03.71.1 1.06.2V11.2c-.78-.26-1.66-.23-2.4.11-1.12.5-1.83 1.67-1.79 2.9.04 1.53 1.25 2.82 2.78 2.89 1.48.06 2.89-.96 3.12-2.42.06-.3.08-.61.08-.91V.02h-.725z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="font-sans font-bold text-xs text-neutral-400 uppercase tracking-wider leading-none">TikTok</p>
                            <p className="font-sans font-extrabold text-sm text-neutral-800 tracking-tight mt-0.5">@bamboo.chicken.zw</p>
                          </div>
                        </a>

                        {/* Facebook Row */}
                        <a
                          href="https://www.facebook.com/profile.php?id=61592053377758"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-white p-3 rounded-xl border border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-200 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-white shrink-0">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="font-sans font-bold text-xs text-neutral-400 uppercase tracking-wider leading-none">Facebook</p>
                            <p className="font-sans font-extrabold text-sm text-neutral-800 tracking-tight mt-0.5">Bamboo Chicken Zimbabwe</p>
                          </div>
                        </a>

                        {/* WhatsApp Row */}
                        <a
                          href="https://whatsapp.com/channel/0029VbCrLUNKQuJPLqLnZI0n"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-white p-3 rounded-xl border border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-200 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.18 1.452 4.825 1.453 5.46-.001 9.902-4.441 9.905-9.905.002-2.647-1.025-5.133-2.893-7.004C16.618 1.828 14.137.8 11.5.8 6.047.8 1.606 5.237 1.603 10.693c-.001 1.684.444 3.328 1.29 4.767l-.963 3.517 3.612-.947c1.4.766 2.89 1.124 4.105 1.124zM18.06 14.74c-.33-.165-1.955-.963-2.254-1.073-.3-.108-.518-.165-.736.165-.218.33-.84.11-1.026.33-.186.22-.373.248-.702.083-.33-.165-1.39-.512-2.648-1.633-.98-.874-1.64-1.953-1.832-2.28-.193-.33-.02-.507.144-.67.147-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.577-.083-.165-.736-1.774-1.008-2.434-.265-.636-.53-.55-.736-.56-.19-.01-.41-.01-.63-.01s-.577.083-.88.412c-.302.33-1.154 1.128-1.154 2.75 0 1.622 1.18 3.19 1.344 3.41.165.22 2.324 3.55 5.63 4.98.786.34 1.4.544 1.88.702.79.25 1.513.215 2.083.13.635-.094 1.955-.8 2.234-1.568.28-.77.28-1.43.196-1.568-.084-.14-.3-.22-.63-.385z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="font-sans font-bold text-xs text-neutral-400 uppercase tracking-wider leading-none">WhatsApp Channel</p>
                            <p className="font-sans font-extrabold text-sm text-neutral-800 tracking-tight mt-0.5">Follow our WhatsApp Channel</p>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Prominent Website Link at the bottom */}
                  <div className="relative z-10 pt-4 border-t border-neutral-100/60 pb-2">
                    <span className="font-sans text-[10px] sm:text-xs tracking-widest text-neutral-400 uppercase font-bold block mb-0.5">
                      Order Online
                    </span>
                    <a
                      href="https://eatbamboochicken.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight relative inline-block group"
                    >
                      eatbamboochicken.com
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

