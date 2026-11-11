import React, { useState } from 'react';
import { X, ShoppingBag, Box, Check, Shield, Layers, Sparkles } from 'lucide-react';
import type { Producto } from '../lib/supabase';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Producto | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const stock = product.stock ?? 10;
  const isOutOfStock = stock <= 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity, selectedColor || product.color || undefined, customNote || undefined);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-fuchsia-500/80 bg-[#120b24] shadow-[0_0_50px_rgba(255,42,133,0.4)] z-10 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalles del producto"
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-slate-300 hover:text-[#00f0ff] border border-fuchsia-500/50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left: Product Media */}
        <div className="relative md:w-1/2 bg-[#080512] flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-[420px] border-b md:border-b-0 md:border-r border-fuchsia-950">
          {!imageError && product.imagen_url ? (
            <img
              src={product.imagen_url}
              alt={product.nombre}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center retro-grid">
              <div className="h-16 w-16 rounded-xl bg-[#1c1138] border-2 border-cyan-400 text-[#00f0ff] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <Box className="h-8 w-8 stroke-[1.8]" />
              </div>
              <p className="font-display text-sm font-bold text-white tracking-wider">PIEZA IMPRESA 3D</p>
              <p className="font-mono text-xs text-fuchsia-400 mt-1">{product.material || 'PLA'} ALTA DENSIDAD</p>
            </div>
          )}
        </div>

        {/* Right: Purchase Module */}
        <div className="flex flex-1 flex-col justify-between p-6 overflow-y-auto font-tech">
          <div>
            {/* Metadata Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#00f0ff] font-bold">{product.material || 'PLA'}</span>
              <span aria-hidden="true" className="text-fuchsia-600">/</span>
              <span className="text-slate-400">RYOUKU LAB</span>
              <span aria-hidden="true" className="text-fuchsia-600">/</span>
              <span className={stock > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {stock > 0 ? `STOCK: ${stock} U.` : 'SIN STOCK'}
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-bold text-white font-display tracking-wide">
              {product.nombre}
            </h2>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-amber-300 tabular-nums neon-glow-yellow">
                {formatCurrency(product.precio)}
              </span>
              <span className="font-mono text-xs text-slate-400">ARS</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {product.descripcion || 'Pieza fabricada en manufactura aditiva con infill giroide reforzado para soportar esfuerzos mecánicos y uso continuo.'}
            </p>

            {/* Technical specs grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs bg-[#191030] p-3.5 rounded-xl border border-fuchsia-900/60 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">POLÍMERO</span>
                <span className="font-bold text-[#00f0ff]">{product.material || 'PLA Grado Técnico'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">COLOR BASE</span>
                <span className="font-bold text-fuchsia-300">{product.color || 'A coordinar'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">RESOLUCIÓN</span>
                <span className="font-bold text-white tabular-nums">0.16 mm</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">PATRÓN RELLENO</span>
                <span className="font-bold text-white tabular-nums">25% Giroide</span>
              </div>
            </div>

            {/* Custom note */}
            <div className="mt-5">
              <label htmlFor="modal-custom-notes" className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5 font-mono">
                COLOR PREFERIDO O NOTAS (OPCIONAL):
              </label>
              <input
                id="modal-custom-notes"
                type="text"
                placeholder="Ej: Negro mate, o color neón..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-[#180e30] border border-fuchsia-900/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff]"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-5 border-t border-fuchsia-950">
            <div className="flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-fuchsia-700 rounded-lg bg-black/60">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-300 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 font-display text-sm font-bold text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                  className="px-3 py-2 text-slate-300 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg transition-all ${
                  justAdded
                    ? 'bg-emerald-500 text-black'
                    : isOutOfStock
                    ? 'bg-[#181126] text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-fuchsia-600 to-[#ff2a85] text-white hover:from-fuchsia-500 hover:to-pink-500 shadow-[0_0_20px_rgba(255,42,133,0.5)] active:scale-95'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>¡AGREGADO AL CARRITO!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>AGREGAR · {formatCurrency(product.precio * quantity)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
