import React, { useState } from 'react';
import { MessageSquare, Phone, MapPin, Clock, Send, Calculator, CheckCircle, ExternalLink, Terminal, Cpu } from 'lucide-react';

export const ContactoSection: React.FC = () => {
  // Estimator state
  const [calcMaterial, setCalcMaterial] = useState<'PLA' | 'PLA+' | 'PETG' | 'Resina' | 'TPU'>('PLA');
  const [calcGrams, setCalcGrams] = useState<number>(80);
  const [calcInfill, setCalcInfill] = useState<number>(20);
  const [calcQuantity, setCalcQuantity] = useState<number>(1);
  const [modelLink, setModelLink] = useState('');

  // Cost calculation formula
  const materialRate = {
    PLA: 55,
    'PLA+': 65,
    PETG: 75,
    TPU: 90,
    Resina: 120
  }[calcMaterial];

  const estimatedUnitCost = Math.round(1500 + calcGrams * materialRate * (1 + (calcInfill - 20) * 0.005));
  const estimatedTotal = estimatedUnitCost * calcQuantity;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSendEstimatorQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*¡Hola ryouku 3D! Quisiera cotizar una impresión 3D a medida:* 🕹️⚙️\n\n` +
      `• *Material:* ${calcMaterial}\n` +
      `• *Peso estimado:* ${calcGrams} gramos\n` +
      `• *Relleno deseado:* ${calcInfill}%\n` +
      `• *Cantidad:* ${calcQuantity} unidad(es)\n` +
      `• *Estimado aproximado calculado:* ${formatCurrency(estimatedTotal)}\n` +
      (modelLink.trim() ? `• *Enlace de modelo (Drive / Printables / STL):* ${modelLink.trim()}\n` : '') +
      `\n¿Me indican cómo enviarles el archivo STL/OBJ para confirmar la cotización exacta? ¡Gracias!`;

    window.open(`https://wa.me/5493888507496?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="relative scroll-mt-20 py-16 sm:py-24 bg-[#0d091a] border-t-2 border-fuchsia-500/40">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-arcade text-[10px] text-[#ff2a85] tracking-widest uppercase">
            <span>TERMINAL DE COMUNICACIÓN // UPLINK</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#00f0ff]">WHATSAPP DIRECTO</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-display">
            CONTACTO & COTIZADOR 3D
          </h2>
          <p className="mt-2 text-sm text-slate-300 font-tech">
            Comunicate directamente con la consola de nuestro taller o calculá una estimación rápida para tu pieza personalizada.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-tech">
          {/* Column 1: Contact Details & Direct WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct WhatsApp Callout */}
            <div className="p-6 sm:p-7 rounded-2xl border-2 border-emerald-500/60 bg-gradient-to-br from-[#0c1f19] via-[#120f28] to-[#0a0718] shadow-[0_0_25px_rgba(16,185,129,0.25)]">
              <div className="flex items-center gap-3 text-emerald-400">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white tracking-wide">CANAL OFICIAL WHATSAPP</h3>
                  <p className="text-xs text-slate-300 font-mono">Respuesta humana & asesoramiento técnico</p>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-black/70 border border-emerald-900/60">
                <span className="text-[10px] font-arcade uppercase text-emerald-400">LÍNEA DIRECTA</span>
                <p className="font-mono text-xl sm:text-2xl font-black text-white mt-1 tabular-nums tracking-wider">
                  +54 9 3888 507496
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Atención de consultas, recepción de archivos STL/OBJ y coordinación de envíos.
                </p>
              </div>

              <a
                href="https://wa.me/5493888507496?text=Hola%20ryouku%203D!%20Quisiera%20hacer%20una%20consulta%20sobre%20sus%20servicios%20de%20impresi%C3%B3n%203D"
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-[0_0_18px_rgba(52,211,153,0.5)] transition-all active:scale-[0.98]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>ABRIR CHAT DE WHATSAPP</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>

            {/* Workshop Info */}
            <div className="p-6 rounded-2xl border-2 border-fuchsia-950 bg-[#120b24] space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-display text-sm">TALLER & DESPACHO</strong>
                  <span>Jujuy, Argentina. Envíos nacionales con seguimiento por Andreani y Correo Argentino.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-fuchsia-950">
                <Clock className="h-4 w-4 text-[#ff2a85] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-display text-sm">HORARIOS DE PRODUCCIÓN</strong>
                  <span>Lunes a Sábados: 09:00 a 20:00 hs. Recepción continua de archivos y cotizaciones.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-fuchsia-950">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-display text-sm">FORMATOS ADMITIDOS</strong>
                  <span>Archivos STL, OBJ, STEP, 3MF y enlaces directos de Thingiverse, Cults3D o Printables.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: 80s Retro Console Quote Estimator */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border-2 border-cyan-500/50 bg-[#120b24] shadow-[0_0_25px_rgba(0,240,255,0.15)]">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-fuchsia-950">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-[#00f0ff] border border-cyan-400/40">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white tracking-wide">
                  CALCULADORA DE PRESUPUESTO 3D
                </h3>
                <p className="text-xs text-slate-400 font-mono">Configurá los parámetros para estimar tu trabajo</p>
              </div>
            </div>

            <form onSubmit={handleSendEstimatorQuote} className="mt-6 space-y-5">
              {/* Material Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2 font-mono">
                  1. SELECCIONAR POLÍMERO:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {(['PLA', 'PLA+', 'PETG', 'Resina', 'TPU'] as const).map((mat) => (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => setCalcMaterial(mat)}
                      className={`py-2 text-xs font-bold uppercase rounded-lg border transition-all ${
                        calcMaterial === mat
                          ? 'bg-gradient-to-r from-cyan-600 to-[#00f0ff] border-cyan-400 text-black shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                          : 'bg-[#180f30] border-fuchsia-900/60 text-slate-300 hover:text-white'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-mono">
                  <span className="font-bold text-fuchsia-300">2. PESO ESTIMADO:</span>
                  <span className="font-display text-sm text-[#00f0ff] font-bold tabular-nums neon-glow-cyan">{calcGrams} GRAMOS</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={calcGrams}
                  onChange={(e) => setCalcGrams(Number(e.target.value))}
                  className="w-full accent-[#00f0ff] h-2 bg-[#1b1236] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>10g (llavero)</span>
                  <span>150g (figura mediana)</span>
                  <span>500g (pieza grande)</span>
                </div>
              </div>

              {/* Infill and Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="infill-density" className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5 font-mono">
                    3. DENSIDAD DE RELLENO:
                  </label>
                  <select
                    id="infill-density"
                    value={calcInfill}
                    onChange={(e) => setCalcInfill(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#180f30] border border-fuchsia-900/80 rounded-lg text-white focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value={15}>15% (Ligero - Decorativo)</option>
                    <option value={20}>20% (Estándar recomendado)</option>
                    <option value={40}>40% (Reforzado mecánico)</option>
                    <option value={80}>80% (Industrial alto impacto)</option>
                    <option value={100}>100% (Macizo total)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-units" className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5 font-mono">
                    4. CANTIDAD DE UNIDADES:
                  </label>
                  <input
                    id="quote-units"
                    type="number"
                    min="1"
                    max="200"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#180f30] border border-fuchsia-900/80 rounded-lg text-white tabular-nums focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              {/* Model Link */}
              <div>
                <label htmlFor="model-link" className="block text-xs font-bold uppercase tracking-wider text-fuchsia-300 mb-1.5 font-mono">
                  5. ENLACE A TU ARCHIVO STL / DRIVE (OPCIONAL):
                </label>
                <input
                  id="model-link"
                  type="url"
                  placeholder="https://drive.google.com/... o enlace de Thingiverse / STL"
                  value={modelLink}
                  onChange={(e) => setModelLink(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-[#180f30] border border-fuchsia-900/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              {/* Estimate Result Box */}
              <div className="p-4 rounded-xl bg-black/80 border-2 border-fuchsia-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-arcade uppercase text-fuchsia-400">TOTAL ESTIMADO</span>
                  <p className="font-display text-2xl sm:text-3xl font-black text-amber-300 tabular-nums mt-0.5 neon-glow-yellow">
                    {formatCurrency(estimatedTotal)}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Incluye calibración de parámetros y material {calcMaterial}.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#00f0ff] hover:bg-cyan-300 rounded-lg shadow-[0_0_18px_rgba(0,240,255,0.5)] transition-all active:scale-95 whitespace-nowrap"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>COTIZAR EN WHATSAPP</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
