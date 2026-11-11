import React, { useState } from 'react';
import { ArrowDown, Cpu, Sparkles, Terminal, Disc, Zap, Radio, Box } from 'lucide-react';
import hero80sImage from '../assets/images/hero_80s_synthwave_3d_1794328121699.jpg';

interface HeroProps {
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  const [currentImg, setCurrentImg] = useState<string>(hero80sImage);
  const [imgErrorCount, setImgErrorCount] = useState<number>(0);

  const handleImageError = () => {
    if (imgErrorCount === 0) {
      setCurrentImg('/images/hero_80s_synthwave_3d_1794328121699.jpg');
      setImgErrorCount(1);
    } else if (imgErrorCount === 1) {
      setCurrentImg('/images/hero_3d_workshop_1794327037714.jpg');
      setImgErrorCount(2);
    } else {
      setImgErrorCount(3);
    }
  };
  return (
    <section className="relative overflow-hidden border-b-2 border-fuchsia-500/40 bg-[#0d091a] pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* 80s Synthwave Perspective Laser Grid Backdrop */}
      <div className="pointer-events-none absolute inset-0 retro-grid opacity-75" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0b0817] via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d091a] to-transparent" />

      {/* Subtle neon horizon light rays */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-fuchsia-600/15 blur-3xl rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: 80s Synthwave Copy & Controls */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* 80s Retro Arcade Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00f0ff] uppercase mb-4">
              <span className="font-arcade text-[10px] text-[#ff2a85] bg-fuchsia-950/80 px-2.5 py-1 border border-fuchsia-500/60 rounded">
                1980s SYNTH-LAB
              </span>
              <span className="text-fuchsia-400">·</span>
              <span className="text-cyan-300 font-semibold tracking-wider">
                MANUFACTURA ADITIVA DIGITAL
              </span>
            </div>

            {/* Main Headline - Crystal clear, NO yellow block, pure 80s neon impact */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display tracking-wide">
              FABRICACIÓN 3D CON{' '}
              <span className="inline-block text-[#00f0ff] neon-glow-cyan font-black">
                PRECISIÓN MICRÓNICA
              </span>
            </h1>

            {/* 80s Retro Tagline */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl font-tech">
              Llevamos el espíritu analógico de los 80s a la era del prototipado CoreXY. En <strong className="text-fuchsia-400 font-bold">ryouku 3D</strong> convertimos tus archivos STL y diseños vectoriales en piezas sólidas de alta durabilidad en PLA+, PETG, TPU flexible y resina foto-polimérica.
            </p>

            {/* 80s Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#productos"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#00f0ff] via-cyan-300 to-[#00f0ff] rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-105 active:scale-95 transition-all"
              >
                <Zap className="h-4 w-4 text-black fill-current" />
                <span>Explorar Catálogo</span>
                <ArrowDown className="h-4 w-4 text-black group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-fuchsia-200 bg-[#19122c] border-2 border-fuchsia-500/80 rounded-lg shadow-[0_0_15px_rgba(255,42,133,0.3)] hover:shadow-[0_0_25px_rgba(255,42,133,0.6)] hover:border-[#ff2a85] hover:text-white hover:scale-105 active:scale-95 transition-all"
              >
                <Terminal className="h-4 w-4 text-[#ff2a85]" />
                <span>Cotizar Archivo STL / OBJ</span>
              </button>
            </div>

            {/* 80s Synthwave Equalizer / Spec strip */}
            <div className="mt-10 pt-6 border-t-2 border-fuchsia-900/60 grid grid-cols-2 sm:grid-cols-3 gap-6 font-tech">
              <div className="p-3 rounded-lg bg-[#140e26] border border-cyan-500/40 shadow-sm">
                <span className="block text-[11px] font-mono uppercase text-cyan-400">RESOLUCIÓN DE CAPA</span>
                <span className="font-display text-lg font-bold text-white tabular-nums">0.12 - 0.28 mm</span>
                <span className="block text-[10px] text-slate-400">Tolerancia FDM fina</span>
              </div>

              <div className="p-3 rounded-lg bg-[#140e26] border border-fuchsia-500/40 shadow-sm">
                <span className="block text-[11px] font-mono uppercase text-fuchsia-400">FILAMENTOS 80s</span>
                <span className="font-display text-lg font-bold text-white">PLA · PETG · RESINA</span>
                <span className="block text-[10px] text-slate-400">+15 colores neón & mate</span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-[#140e26] border border-amber-500/40 shadow-sm">
                <span className="block text-[11px] font-mono uppercase text-amber-400">TIEMPO DE ESPERA</span>
                <span className="font-display text-lg font-bold text-white tabular-nums">24 / 48 HORAS</span>
                <span className="block text-[10px] text-slate-400">Despacho express a todo el país</span>
              </div>
            </div>
          </div>

          {/* Right Column: 80s Synthwave 3D Workshop Image Frame */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative w-full rounded-2xl p-1 bg-gradient-to-b from-[#00f0ff] via-fuchsia-500 to-[#ff2a85] shadow-[0_0_35px_rgba(255,42,133,0.35)]">
              <div className="relative overflow-hidden rounded-xl bg-[#090614] min-h-[360px] flex items-center justify-center">
                {imgErrorCount < 3 ? (
                  <img
                    src={currentImg}
                    alt="Taller de impresión 3D ryouku 3D estilo ochentero synthwave con monitores CRT y luces neón"
                    onError={handleImageError}
                    className="h-[360px] sm:h-[420px] lg:h-[460px] w-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                ) : (
                  <div className="h-[360px] sm:h-[420px] lg:h-[460px] w-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#180f33] via-[#0d071d] to-[#080413] retro-grid relative">
                    <div className="h-20 w-20 rounded-2xl bg-[#231549] border-2 border-[#00f0ff] text-[#00f0ff] flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,240,255,0.6)]">
                      <Cpu className="h-10 w-10 animate-pulse" />
                    </div>
                    <span className="font-display text-lg font-bold text-white tracking-widest">
                      RYOUKU 3D LAB
                    </span>
                    <span className="font-arcade text-[10px] text-[#ff2a85] mt-2">
                      VOLTAIC 1984 COREXY
                    </span>
                    <div className="mt-4 flex items-center gap-2 font-mono text-xs text-cyan-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>SISTEMA DE IMPRESIÓN ACTIVO</span>
                    </div>
                  </div>
                )}

                {/* 80s VHS / Retro Monitor HUD Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#00f0ff] bg-black/75 backdrop-blur-md px-3 py-1.5 rounded border border-cyan-500/40">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-arcade text-[9px] text-red-400">REC</span>
                    <span className="text-slate-300">SP 0:19:84</span>
                  </div>
                  <span className="text-yellow-400 font-arcade text-[9px]">VOLTAIC CORE-XY</span>
                </div>

                {/* Bottom Retro Info Tag */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/85 backdrop-blur-md border border-fuchsia-500/50 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <p className="font-display text-sm font-bold text-white">RYOUKU 3D LAB</p>
                    <p className="text-[11px] text-fuchsia-300 font-mono">Impresión CoreXY & Curado UV</p>
                  </div>
                  <span className="font-arcade text-[10px] text-[#00f0ff] bg-cyan-950/60 px-2 py-1 rounded border border-cyan-500/50">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 80s Arcade Feature Badges Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t-2 border-fuchsia-900/50">
          <div className="p-3.5 rounded-xl bg-[#150f28] border border-cyan-500/30 flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-cyan-500/20 text-[#00f0ff] flex items-center justify-center shrink-0 border border-cyan-400/40">
              <Zap className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <strong className="block font-display text-white text-[13px]">TURBO COREXY</strong>
              <span className="text-slate-400 font-tech">Velocidad y firmeza</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#150f28] border border-fuchsia-500/30 flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-fuchsia-500/20 text-[#ff2a85] flex items-center justify-center shrink-0 border border-fuchsia-400/40">
              <Radio className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <strong className="block font-display text-white text-[13px]">FILAMENTO HI-FI</strong>
              <span className="text-slate-400 font-tech">Sin poros ni burbujas</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#150f28] border border-cyan-500/30 flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-cyan-500/20 text-[#00f0ff] flex items-center justify-center shrink-0 border border-cyan-400/40">
              <Disc className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <strong className="block font-display text-white text-[13px]">SLA 8K RESINA</strong>
              <span className="text-slate-400 font-tech">Detalles hiperfinos</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#150f28] border border-fuchsia-500/30 flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-fuchsia-500/20 text-[#ff2a85] flex items-center justify-center shrink-0 border border-fuchsia-400/40">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <strong className="block font-display text-white text-[13px]">POST-PROCESO</strong>
              <span className="text-slate-400 font-tech">Lijado y acabado pro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
