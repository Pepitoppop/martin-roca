import React from 'react';
import { ArrowRight, Flame, Disc, Radio, Sparkles } from 'lucide-react';

interface Novedad {
  id: string;
  fecha: string;
  categoria: string;
  titulo: string;
  descripcion: string;
  whatsappTopic: string;
  destacado?: boolean;
}

const NOVEDADES: Novedad[] = [
  {
    id: 'nov-1',
    fecha: 'Marzo 2026',
    categoria: 'NUEVO POLÍMERO',
    titulo: 'Llegada de filamento PETG Fibra de Carbono',
    descripcion: 'Incorporamos bobinas con 15% de micro-fibras de carbono para piezas automotrices, soportes de drones y carcasas que exigen máxima rigidez y acabado negro mate texturado sin deformación.',
    whatsappTopic: 'Hola ryouku 3D! Quisiera consultar sobre impresiones en PETG Fibra de Carbono',
    destacado: true
  },
  {
    id: 'nov-2',
    fecha: 'Febrero 2026',
    categoria: 'HARDWARE VINTAGE/TURBO',
    titulo: 'Actualización a impresoras CoreXY de 350 mm/s',
    descripcion: 'Duplicamos nuestra capacidad de producción reduciendo a la mitad los tiempos de espera. Ahora podés tener tus pedidos de prototipos o repuestos en 24 a 48 hs hábiles.',
    whatsappTopic: 'Hola ryouku 3D! Tengo un pedido urgente para entrega en 24/48hs'
  },
  {
    id: 'nov-3',
    fecha: 'Febrero 2026',
    categoria: 'GUÍA CAD 3D',
    titulo: 'Tips para exportar archivos STL / OBJ perfectos',
    descripcion: 'Recomendamos exportar con desviación angular menor a 1° y tolerancia de 0.01mm en tu software CAD (Fusion 360, SolidWorks, Blender) para evitar facetas poligonales en curvas circulares.',
    whatsappTopic: 'Hola ryouku 3D! Tengo dudas con la malla de mi archivo STL'
  },
  {
    id: 'nov-4',
    fecha: 'Enero 2026',
    categoria: 'PROMO MAYORISTA',
    titulo: 'Descuento escalonado en tandas desde 10 unidades',
    descripcion: 'Precios preferenciales para diseñadores, colegios, ferias y empresas que necesiten regalos corporativos, souvenirs o soportes técnicos en serie.',
    whatsappTopic: 'Hola ryouku 3D! Me interesa la lista de precios mayoristas por 10+ unidades'
  }
];

export const NovedadesSection: React.FC = () => {
  return (
    <section id="novedades" className="relative scroll-mt-20 py-16 sm:py-24 bg-[#090614] border-t-2 border-fuchsia-500/40">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-arcade text-[10px] text-[#00f0ff] tracking-widest uppercase">
            <span>BOLETÍN SYNTHWAVE // NEWS</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#ff2a85]">EDICIÓN 1984/2026</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-display">
            NOVEDADES DE RYOUKU 3D
          </h2>
          <p className="mt-2 text-sm text-slate-300 font-tech">
            Lanzamiento de nuevos filamentos, actualizaciones de taller y promociones exclusivas.
          </p>
        </div>

        {/* Novedades Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 font-tech">
          {NOVEDADES.map((item) => (
            <article
              key={item.id}
              className={`p-6 sm:p-7 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                item.destacado
                  ? 'bg-gradient-to-br from-[#1b1035] to-[#120a24] border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                  : 'bg-[#120b24] border-fuchsia-950 hover:border-fuchsia-500/70 hover:shadow-[0_0_15px_rgba(255,42,133,0.2)]'
              }`}
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-[#00f0ff]">{item.categoria}</span>
                    <span aria-hidden="true" className="text-fuchsia-600">/</span>
                    <span>{item.fecha}</span>
                  </div>
                  {item.destacado && (
                    <span className="flex items-center gap-1 font-arcade text-[9px] text-[#ff2a85] bg-fuchsia-950/80 px-2 py-0.5 rounded border border-fuchsia-500/50">
                      <Flame className="h-3 w-3" />
                      <span>DESTACADO</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-3 font-display text-lg font-bold text-white tracking-wide">
                  {item.titulo}
                </h3>

                {/* Body */}
                <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.descripcion}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-6 pt-4 border-t border-fuchsia-950">
                <a
                  href={`https://wa.me/5493888507496?text=${encodeURIComponent(item.whatsappTopic)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00f0ff] hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all font-mono"
                >
                  <span>CONSULTAR EN WHATSAPP</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
