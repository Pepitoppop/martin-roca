import React, { useState } from 'react';
import { ShoppingBag, Layers, Menu, X, Terminal, Monitor, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
  crtActive?: boolean;
  onToggleCrt?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, crtActive, onToggleCrt }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'PRODUCTOS', href: '#productos' },
    { label: 'CARACTERÍSTICAS', href: '#caracteristicas' },
    { label: 'OPINIONES', href: '#opiniones' },
    { label: 'NOVEDADES', href: '#novedades' },
    { label: 'CONTACTO', href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-fuchsia-500/40 bg-[#0d091a]/95 backdrop-blur-md">
      {/* 80s Neon accent line on top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#00f0ff] via-[#ff2a85] to-[#facc15]" />

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: 80s Synthwave Brand Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-3 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a1130] border-2 border-fuchsia-500 text-[#00f0ff] shadow-[0_0_12px_rgba(255,42,133,0.5)] group-hover:scale-105 group-hover:border-[#00f0ff] transition-all">
            <Layers className="h-5 w-5" strokeWidth={2.4} />
          </div>
          <span className="font-display tracking-widest text-lg sm:text-xl text-white">
            RYOUKU <span className="text-[#00f0ff] neon-glow-cyan font-black">3D</span>
          </span>
          <span className="hidden lg:inline-block font-arcade text-[9px] text-[#ff2a85] bg-fuchsia-950/80 px-2 py-0.5 rounded border border-fuchsia-600/40">
            EST. 1984
          </span>
        </a>

        {/* Zone 2: Single-line 80s Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider text-slate-300 font-tech">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#00f0ff] hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.7)] transition-all whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: CRT Toggle, Cotizar & Cart */}
        <div className="flex items-center gap-3 shrink-0">
          {/* CRT Scanline Toggle */}
          {onToggleCrt && (
            <button
              onClick={onToggleCrt}
              title="Alternar filtro CRT 80s"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono font-bold rounded border transition-all ${
                crtActive
                  ? 'bg-fuchsia-950 text-[#ff2a85] border-fuchsia-500 shadow-[0_0_10px_rgba(255,42,133,0.4)]'
                  : 'bg-[#150f28] text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="font-arcade text-[8px]">{crtActive ? 'CRT ON' : 'CRT OFF'}</span>
            </button>
          )}

          <button
            onClick={() => {
              if (onOpenQuoteModal) onOpenQuoteModal();
              else document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#00f0ff] bg-[#140e26] border border-cyan-500/60 rounded-lg hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:text-white transition-all whitespace-nowrap font-tech"
          >
            <Terminal className="h-3.5 w-3.5 text-[#00f0ff]" />
            <span>Cotizar STL</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir carrito de compras"
            className="relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-fuchsia-600 to-[#ff2a85] rounded-lg shadow-[0_0_18px_rgba(255,42,133,0.5)] hover:shadow-[0_0_26px_rgba(255,42,133,0.8)] hover:scale-105 active:scale-95 transition-all whitespace-nowrap shrink-0 font-tech"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden xs:inline">CARRITO</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 font-arcade text-[10px] text-black bg-[#00f0ff] rounded font-bold shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white md:hidden"
            aria-label="Alternar menú móvil"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-[#ff2a85]" /> : <Menu className="h-6 w-6 text-[#00f0ff]" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b-2 border-fuchsia-500/40 bg-[#0d091a]/98 px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-bold text-slate-200 font-tech tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#00f0ff] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-fuchsia-900/60 flex flex-col gap-2.5">
              {onToggleCrt && (
                <button
                  onClick={onToggleCrt}
                  className="flex items-center justify-center gap-2 py-2 px-4 text-xs font-mono font-bold bg-[#140e26] border border-cyan-500 rounded-lg text-[#00f0ff]"
                >
                  <Monitor className="h-4 w-4" />
                  <span>MODO CRT: {crtActive ? 'ACTIVADO' : 'DESACTIVADO'}</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuoteModal) onOpenQuoteModal();
                  else document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#191130] border border-fuchsia-500 rounded-lg"
              >
                <Terminal className="h-4 w-4 text-[#ff2a85]" />
                <span>Cotizar archivo STL / OBJ</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
