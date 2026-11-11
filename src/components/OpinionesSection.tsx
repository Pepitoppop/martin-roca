import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Trophy } from 'lucide-react';

interface Review {
  id: string;
  autor: string;
  rol: string;
  ciudad: string;
  estrellas: number;
  fecha: string;
  proyecto: string;
  comentario: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    autor: 'Ignacio Morales',
    rol: 'Ingeniero Mecánico',
    ciudad: 'San Salvador de Jujuy',
    estrellas: 5,
    fecha: 'Marzo 2026',
    proyecto: 'Engranajes y carcasas en PETG',
    comentario: 'Excelente nivel de tolerancia dimensional en las piezas para el prototipo. Las roscas y encastres quedaron perfectos a la primera, sin necesidad de retocar con lija. Atención impecable por WhatsApp.'
  },
  {
    id: '2',
    autor: 'Luciana Herrera',
    rol: 'Emprendedora / Eventos',
    ciudad: 'Salta Capital',
    estrellas: 5,
    fecha: 'Febrero 2026',
    proyecto: 'Lote de 50 Porta Celulares personalizados',
    comentario: 'Pedí una tanda de 50 soportes con el logo de mi marca grabado para un congreso. Me los despacharon en menos de 48 horas súper bien embalados y con colores uniformes.'
  },
  {
    id: '3',
    autor: 'Martín Benítez',
    rol: 'Diseñador Industrial',
    ciudad: 'Córdoba',
    estrellas: 5,
    fecha: 'Enero 2026',
    proyecto: 'Prototipo ergonómico y Ta Te Ti 3D',
    comentario: 'Compré el juego Ta Te Ti de muestra y encargué la impresión de un diseño propio en PLA+. La calidad de acabado superficial en 0.16mm superó mis expectativas para FDM.'
  },
  {
    id: '4',
    autor: 'Camila Villafañe',
    rol: 'Coleccionista / Cosplay',
    ciudad: 'Tucumán',
    estrellas: 5,
    fecha: 'Marzo 2026',
    proyecto: 'Máscara y accesorios en PLA Silk',
    comentario: 'Súper amables para asesorarme con el relleno necesario para que la pieza fuera liviana pero no se quebrara. El envío por Andreani llegó en perfecto estado.'
  }
];

export const OpinionesSection: React.FC = () => {
  return (
    <section id="opiniones" className="relative scroll-mt-20 py-16 sm:py-24 bg-[#0d091a] border-t-2 border-fuchsia-500/40">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b-2 border-fuchsia-950">
          <div>
            <div className="flex items-center gap-2 font-arcade text-[10px] text-[#ff2a85] tracking-widest uppercase">
              <span>TESTIMONIOS // HALL OF FAME</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#00f0ff]">CLIENTES 100% REALES</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-display">
              OPINIONES & HIGH SCORES
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl font-tech">
              Más de 140 misiones de impresión 3D completadas con éxito en todo el país.
            </p>
          </div>

          {/* 80s High Score Scoreboard */}
          <div className="flex items-center gap-4 bg-[#140e26] p-4 rounded-xl border-2 border-cyan-500/40 shadow-[0_0_18px_rgba(0,240,255,0.2)]">
            <div className="text-center pr-4 border-r border-fuchsia-900/80">
              <span className="font-display text-3xl font-black text-amber-300 tabular-nums neon-glow-yellow">4.9</span>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-amber-400 drop-shadow-[0_0_4px_#facc15]" />
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-300 font-tech">
              <span className="block font-display text-sm font-bold text-white">SCORE PERFECTO</span>
              <span className="text-cyan-400 font-mono text-[11px]">100% ENTREGAS A TÉRMINO</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 font-tech">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl border-2 border-fuchsia-950 bg-[#120b24] flex flex-col justify-between hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all"
            >
              <div>
                {/* Author info & Stars */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-white tracking-wide">{rev.autor}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                      <span className="text-[#00f0ff]">{rev.rol}</span>
                      <span aria-hidden="true" className="text-fuchsia-600">/</span>
                      <span>{rev.ciudad}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 shrink-0">
                    {[...Array(rev.estrellas)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current drop-shadow-[0_0_3px_#facc15]" />
                    ))}
                  </div>
                </div>

                {/* Project context tag */}
                <div className="mt-3.5 flex items-center gap-2 text-xs text-[#ff2a85] font-bold">
                  <span>PROYECTO: {rev.proyecto}</span>
                  <span aria-hidden="true" className="text-fuchsia-800">·</span>
                  <span className="text-slate-400 font-normal">{rev.fecha}</span>
                </div>

                {/* Review Text */}
                <p className="mt-3 text-sm leading-relaxed text-slate-200">
                  "{rev.comentario}"
                </p>
              </div>

              {/* Verified Trust footer */}
              <div className="mt-5 pt-3 border-t border-fuchsia-950 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>ORDEN VERIFICADA</span>
                </span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>RECOMENDADO</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* User Direct Feedback Prompt */}
        <div className="mt-10 p-5 rounded-xl border border-fuchsia-500/40 bg-[#150e28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-300">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-[#ff2a85] shrink-0" />
            <span>¿Ya recibiste tu encargo 3D? Podés compartirnos fotos de tu proyecto directamente a nuestro WhatsApp oficial.</span>
          </div>
          <a
            href="https://wa.me/5493888507496?text=Hola%20ryouku%203D!%20Quiero%20compartir%20mi%20experiencia%20y%20fotos%20de%20mi%20pedido%203D"
            target="_blank"
            rel="noreferrer"
            className="text-[#00f0ff] hover:text-cyan-300 font-bold font-mono whitespace-nowrap underline underline-offset-4"
          >
            ENVIAR RESEÑA →
          </a>
        </div>
      </div>
    </section>
  );
};
