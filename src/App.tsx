import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

const MEME_TEMPLATES = [
  { id: 1, name: 'Pump It', url: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&h=600&fit=crop', category: 'classic' },
  { id: 2, name: 'Oil Rig', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop', category: 'classic' },
  { id: 3, name: 'Black Gold', url: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=600&h=600&fit=crop', category: 'classic' },
  { id: 4, name: 'To The Moon', url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=600&fit=crop', category: 'crypto' },
  { id: 5, name: 'Diamond Hands', url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop', category: 'crypto' },
  { id: 6, name: 'Drilling Deep', url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=600&fit=crop', category: 'classic' },
];

const PRESET_CAPTIONS = [
  "WHEN $OIL PUMPS",
  "DRILL BABY DRILL",
  "BLACK GOLD ENERGY",
  "CRUDE GAINS ONLY",
  "NGMI WITHOUT $OIL",
  "WAGMI TO THE REFINERY",
  "PUMPING SINCE DAY 1",
  "LIQUID GOLD MENTALITY",
];

function OilDrip({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-2 md:w-3 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 rounded-full"
      style={{ top: 0 }}
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: [0, 40, 60, 80, 60],
        opacity: [0, 1, 1, 1, 0],
        y: [0, 20, 60, 120, 200]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeIn"
      }}
    />
  );
}

function OilSlickBg() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(234, 179, 8, 0.08) 0%, transparent 60%)
          `
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
    </div>
  );
}

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(MEME_TEMPLATES[0]);
  const [fontSize, setFontSize] = useState(32);
  const [isExporting, setIsExporting] = useState(false);
  const memeRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(async () => {
    if (!memeRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(memeRef.current, {
        backgroundColor: '#000',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `oil-meme-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }

    setIsExporting(false);
  }, []);

  const applyPreset = (caption: string) => {
    setTopText(caption);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <OilSlickBg />

      {/* Oil Drips Header Decoration */}
      <div className="absolute top-0 left-0 right-0 h-32 flex justify-around pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="relative" style={{ left: `${Math.random() * 20 - 10}px` }}>
            <OilDrip delay={i * 0.4} />
          </div>
        ))}
      </div>

      <div className="relative z-10 px-4 py-8 md:py-16 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
              $OIL
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 tracking-[0.3em] uppercase font-medium">
            Meme Generator
          </p>
          <div className="mt-4 h-px w-32 md:w-48 mx-auto bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">

          {/* Meme Preview */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-8">
              <h2 className="text-xs md:text-sm text-zinc-600 uppercase tracking-widest mb-3 md:mb-4 font-semibold">Preview</h2>

              <div
                ref={memeRef}
                className="relative aspect-square w-full max-w-md mx-auto bg-black rounded-lg overflow-hidden"
                style={{
                  boxShadow: `
                    0 0 0 2px rgba(234, 179, 8, 0.3),
                    0 0 40px rgba(234, 179, 8, 0.1),
                    inset 0 0 60px rgba(0,0,0,0.5)
                  `
                }}
              >
                {/* Oil splatter frame */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Template Image */}
                <img
                  src={selectedTemplate.url}
                  alt={selectedTemplate.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />

                {/* Text Overlays */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
                  <div
                    className="text-center break-words"
                    style={{
                      fontSize: `${fontSize}px`,
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: 'white',
                      textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 0 4px 8px rgba(0,0,0,0.8)',
                      letterSpacing: '0.05em',
                      lineHeight: 1.1,
                    }}
                  >
                    {topText || 'TOP TEXT'}
                  </div>
                  <div
                    className="text-center break-words"
                    style={{
                      fontSize: `${fontSize}px`,
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: 'white',
                      textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 0 4px 8px rgba(0,0,0,0.8)',
                      letterSpacing: '0.05em',
                      lineHeight: 1.1,
                    }}
                  >
                    {bottomText || 'BOTTOM TEXT'}
                  </div>
                </div>

                {/* $OIL Watermark */}
                <div className="absolute bottom-2 right-2 z-30 text-amber-500/60 text-xs font-bold tracking-wider">
                  $OIL
                </div>
              </div>

              {/* Export Button */}
              <motion.button
                onClick={handleExport}
                disabled={isExporting}
                className="mt-6 w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-black text-lg uppercase tracking-wider rounded-lg relative overflow-hidden group disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {isExporting ? 'EXTRACTING...' : 'DOWNLOAD MEME'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            className="order-2 lg:order-1 space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Template Selection */}
            <div>
              <h2 className="text-xs md:text-sm text-zinc-600 uppercase tracking-widest mb-3 md:mb-4 font-semibold">Select Template</h2>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <AnimatePresence>
                  {MEME_TEMPLATES.map((template) => (
                    <motion.button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedTemplate.id === template.id
                          ? 'border-amber-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                          : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={template.url}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1 left-1 right-1 text-[10px] md:text-xs font-bold text-white truncate">
                        {template.name}
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Text Inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-xs md:text-sm text-zinc-600 uppercase tracking-widest mb-2 block font-semibold">
                  Top Text
                </label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value.toUpperCase())}
                  placeholder="ENTER TOP TEXT..."
                  className="w-full bg-zinc-900/80 border-2 border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none transition-colors font-bold tracking-wide"
                />
              </div>
              <div>
                <label className="text-xs md:text-sm text-zinc-600 uppercase tracking-widest mb-2 block font-semibold">
                  Bottom Text
                </label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value.toUpperCase())}
                  placeholder="ENTER BOTTOM TEXT..."
                  className="w-full bg-zinc-900/80 border-2 border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none transition-colors font-bold tracking-wide"
                />
              </div>
            </div>

            {/* Font Size Slider */}
            <div>
              <label className="text-xs md:text-sm text-zinc-600 uppercase tracking-widest mb-3 block font-semibold">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="16"
                max="64"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Preset Captions */}
            <div>
              <h2 className="text-xs md:text-sm text-zinc-600 uppercase tracking-widest mb-3 font-semibold">Quick Captions</h2>
              <div className="flex flex-wrap gap-2">
                {PRESET_CAPTIONS.map((caption) => (
                  <motion.button
                    key={caption}
                    onClick={() => applyPreset(caption)}
                    className="px-3 py-2 bg-zinc-900/80 border border-zinc-700 rounded-lg text-xs md:text-sm text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {caption}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-12 md:mt-16 pt-6 border-t border-zinc-900 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-zinc-600 text-xs tracking-wide">
            Requested by <span className="text-zinc-500">@BASECRUDE</span> · Built by <span className="text-zinc-500">@clonkbot</span>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
