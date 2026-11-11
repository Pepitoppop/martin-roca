import React from 'react';
import { Layers, MessageSquare, MapPin, ShieldCheck, Disc } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-fuchsia-500/40 bg-[#080512] text-slate-400 text-xs font-tech">
      {/* 80s Neon accent line on top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#00f0ff] via-[#ff2a85] to-[#facc15]" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1130] border-2 border-fuchsia-500 text-[#00f0ff] font-bold shadow-[0_0_12px_rgba(255,42,133,0.5)]">
                <Layers className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-white tracking-widest">
                RYOUKU <span className="text-[#00f0ff] neon-glow-cyan">3D</span>
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Taller de manufactura aditiva y prototipado rápido estilo retro-futurista 80s. Materiales técnicos de alta densidad y acabado profesional.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-mono">
              <MapPin className="h-3.5 w-3.5 text-[#ff2a85] shrink-0" />
              <span>Jujuy, Argentina · Envíos nacionales</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-3">NAVEGACIÓN</h4>
            <ul className="space-y-2 font-mono">
              <li>
                <a href="#productos" className="hover:text-[#00f0ff] transition-colors">
                  Catálogo de Productos
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="hover:text-[#00f0ff] transition-colors">
                  Características & Materiales
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-[#00f0ff] transition-colors">
                  Opiniones & High Scores
                </a>
              </li>
              <li>
                <a href="#novedades" className="hover:text-[#00f0ff] transition-colors">
                  Novedades del Taller
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[#00f0ff] transition-colors">
                  Cotización & Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Guarantees */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-3">PAGOS & ENVÍOS</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00f0ff]" />
                <span>Transferencia Bancaria (Alias / CBU)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-[#ff2a85]" />
                <span>Mercado Pago & Débito</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>Embalaje antigolpes reforzado</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00f0ff]" />
                <span>Despacho por Andreani & Correo Argentino</span>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-3">CANAL WHATSAPP</h4>
            <p className="text-slate-300 mb-3">
              ¿Tenés un archivo 3D o querés consultar un presupuesto? Escribinos directamente al WhatsApp oficial:
            </p>
            <a
              href="https://wa.me/5493888507496"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/60 rounded-lg hover:bg-emerald-900/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>+54 9 3888 507496</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-fuchsia-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <p>© 2026 RYOUKU 3D · RETRO-TECH LAB · TODOS LOS DERECHOS RESERVADOS</p>
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <Disc className="h-3.5 w-3.5 text-[#ff2a85] animate-spin" />
            <span>SUPABASE CONNECTED // 1984 STEREO SYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
