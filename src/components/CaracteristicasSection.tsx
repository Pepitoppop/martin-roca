import React, { useState } from 'react';
import { Layers, ShieldCheck, Cog, Gauge, CheckCircle2, Disc, Box } from 'lucide-react';
import retroArtifactImage from '../assets/images/retro_80s_3d_artifact_1794328135637.jpg';

interface MaterialSpec {
  nombre: string;
  resistencia: string;
  flexibilidad: string;
  resistenciaTermica: string;
  usoPrincipal: string;
  colores: string;
}

const MATERIALES: MaterialSpec[] = [
  {
    nombre: 'PLA+ (Ácido Poliláctico Reforzado)',
    resistencia: 'Media - Alta rigidez estructural',
    flexibilidad: 'Baja (rígido y fiel)',
    resistenciaTermica: 'Hasta 60 °C',
    usoPrincipal: 'Figuras, soportes, cajas de consolas, accesorios synth y prototipado rápido',
    colores: '+18 tonos (Neón magenta, cian, amarillo, negro mate, silk)'
  },
  {
    nombre: 'PETG (Polietileno Tereftalato)',
    resistencia: 'Muy Alta (impacto y tracción mecánica)',
    flexibilidad: 'Media (absorbe vibraciones)',
    resistenciaTermica: 'Hasta 80 °C',
    usoPrincipal: 'Mecanismos, engranajes, carcasas de audio, piezas para vehículos y drones',
    colores: 'Negro, Blanco, Naranja Neón, Translúcido Ciber'
  },
  {
    nombre: 'Resina SLA 8K (Fotopolímero UV)',
    resistencia: 'Máxima definición sin líneas visibles',
    flexibilidad: 'Rígido / Opcional Tough',
    resistenciaTermica: 'Hasta 70 °C',
    usoPrincipal: 'Miniaturas coleccionables, joyería, dioramas retro y maquetas de precisión',
    colores: 'Gris modelado mate, Blanco, Negro profundo'
  },
  {
    nombre: 'TPU Flexible (Termoplástico Poliuretano)',
    resistencia: 'Alta amortiguación y resistencia química',
    flexibilidad: 'Muy Alta (Shore 95A elástico)',
    resistenciaTermica: 'Hasta 90 °C',
    usoPrincipal: 'Fundas de cassettes, protectores antigolpes, bujes y juntas estancas',
    colores: 'Negro, Rojo Neón, Azul Eléctrico'
  }
];

export const CaracteristicasSection: React.FC = () => {
  const [selectedMaterialIdx, setSelectedMaterialIdx] = useState(1);

  const [artifactImg, setArtifactImg] = useState<string>(retroArtifactImage);
  const [artifactErrorCount, setArtifactErrorCount] = useState<number>(0);

  const handleArtifactError = () => {
    if (artifactErrorCount === 0) {
      setArtifactImg('/images/retro_80s_3d_artifact_1794328135637.jpg');
      setArtifactErrorCount(1);
    } else if (artifactErrorCount === 1) {
      setArtifactImg('/images/macro_3d_layers_1794327049307.jpg');
      setArtifactErrorCount(2);
    } else {
      setArtifactErrorCount(3);
    }
  };

  return (
    <section id="caracteristicas" className="relative scroll-mt-20 py-16 sm:py-24 border-t-2 border-fuchsia-500/40 bg-[#090614]">
      {/* 80s Laser Grid */}
      <div className="pointer-events-none absolute inset-0 retro-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-arcade text-[10px] text-[#00f0ff] tracking-widest uppercase">
            <span>ESPECIFICACIONES // VINTAGE LAB</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#ff2a85]">HARDWARE COREXY</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-display">
            CAPACIDADES TÉCNICAS RYOUKU 3D
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed font-tech">
            Unimos la precisión de la manufactura aditiva contemporánea con el espíritu de la ingeniería de los 80s. Tolerancias milimétricas en cama calefaccionada para encastres perfectos.
          </p>
        </div>

        {/* Feature Split Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 80s Retro Mechanical Cassette Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-gradient-to-tr from-[#ff2a85] via-fuchsia-600 to-[#00f0ff] shadow-[0_0_35px_rgba(0,240,255,0.25)]">
              <div className="relative overflow-hidden rounded-xl bg-[#090614] min-h-[360px] flex items-center justify-center">
                {artifactErrorCount < 3 ? (
                  <img
                    src={artifactImg}
                    alt="Dispositivo mecánico de casete y engranajes 3D estilo 80s synthwave con neón cian y magenta"
                    onError={handleArtifactError}
                    className="h-[380px] w-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-[380px] w-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#180f33] via-[#0d071d] to-[#080413] retro-grid relative">
                    <div className="h-16 w-16 rounded-2xl bg-[#231549] border-2 border-[#ff2a85] text-[#ff2a85] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,42,133,0.5)]">
                      <Box className="h-8 w-8 stroke-[1.8]" />
                    </div>
                    <span className="font-display text-sm font-bold text-white tracking-wider">
                      MECANISMO 3D PRECISO
                    </span>
                    <span className="font-arcade text-[10px] text-[#00f0ff] mt-1.5">
                      TOLERANCIA ±0.15MM
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/85 backdrop-blur-md border border-fuchsia-500/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-arcade text-[10px] text-[#00f0ff]">CASSETTE DATA SYSTEM</p>
                    <span className="font-mono text-[10px] text-[#ff2a85]">80 MIN HI-FI</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-tech mt-1">Tolerancia de encastre: ±0.15mm · Relleno giroide 30%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Technical Pillars with 80s styling */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 font-tech">
            <div className="p-5 rounded-xl border border-cyan-500/30 bg-[#140e26] hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-[#00f0ff] border border-cyan-400/40 mb-3 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                <Gauge className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white">RESOLUCIÓN DE CAPA FINA</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Rango seleccionable de 0.12 a 0.28 mm para acabados lisos sin marcas escalonadas visibles.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-fuchsia-500/30 bg-[#140e26] hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(255,42,133,0.25)] transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-500/20 text-[#ff2a85] border border-fuchsia-400/40 mb-3 shadow-[0_0_10px_rgba(255,42,133,0.3)]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white">ESTRUCTURAS GIROIDE</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Distribución tridimensional de tensión que resiste torsiones y golpes mecánicos sin añadir peso inútil.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-fuchsia-500/30 bg-[#140e26] hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(255,42,133,0.25)] transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-500/20 text-[#ff2a85] border border-fuchsia-400/40 mb-3 shadow-[0_0_10px_rgba(255,42,133,0.3)]">
                <Cog className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white">CALIBRACIÓN POR LÁSER</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Comprobación dimensional con calibre de micras antes de cada despacho para garantizar que tus piezas encastren.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-cyan-500/30 bg-[#140e26] hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-[#00f0ff] border border-cyan-400/40 mb-3 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white">FILAMENTOS PUROS</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Polímeros vírgenes conservados en secadores de filamento para evitar deslaminado por humedad o atascos.
              </p>
            </div>
          </div>
        </div>

        {/* 80s Matrix Guide for Materials */}
        <div className="mt-14 pt-10 border-t-2 border-fuchsia-950">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-lg font-bold text-white tracking-wide">
                MATRIZ DE POLÍMEROS 80s
              </h3>
              <p className="text-xs text-slate-400 font-tech">Hacé clic en un material para cargar su ficha técnica.</p>
            </div>

            <div className="flex flex-wrap gap-2 font-tech">
              {MATERIALES.map((mat, idx) => (
                <button
                  key={mat.nombre}
                  onClick={() => setSelectedMaterialIdx(idx)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    selectedMaterialIdx === idx
                      ? 'bg-gradient-to-r from-fuchsia-600 to-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.6)]'
                      : 'bg-[#140e26] border border-fuchsia-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {mat.nombre.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Material Detailed 80s Card */}
          <div className="p-6 rounded-2xl border-2 border-cyan-500/40 bg-[#120b24] shadow-[0_0_20px_rgba(0,240,255,0.15)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-tech">
            <div>
              <span className="text-[10px] font-arcade uppercase text-cyan-400">POLÍMERO</span>
              <h4 className="font-display text-base font-bold text-[#00f0ff] mt-1.5">{MATERIALES[selectedMaterialIdx].nombre}</h4>
              <p className="text-xs text-slate-300 mt-2">{MATERIALES[selectedMaterialIdx].usoPrincipal}</p>
            </div>

            <div>
              <span className="text-[10px] font-arcade uppercase text-fuchsia-400">RESISTENCIA</span>
              <p className="text-sm font-bold text-white mt-1.5">{MATERIALES[selectedMaterialIdx].resistencia}</p>
              <div className="mt-2 text-xs text-slate-400">Flexibilidad: {MATERIALES[selectedMaterialIdx].flexibilidad}</div>
            </div>

            <div>
              <span className="text-[10px] font-arcade uppercase text-amber-400">TEMP. MÁXIMA</span>
              <p className="font-display text-lg font-black text-amber-300 mt-1.5 tabular-nums">{MATERIALES[selectedMaterialIdx].resistenciaTermica}</p>
              <div className="mt-2 text-xs text-slate-400">Resistente a deformación térmica</div>
            </div>

            <div>
              <span className="text-[10px] font-arcade uppercase text-emerald-400">PALETA DE TONOS</span>
              <p className="text-xs font-semibold text-slate-200 mt-1.5">{MATERIALES[selectedMaterialIdx].colores}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>En stock para producción</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
