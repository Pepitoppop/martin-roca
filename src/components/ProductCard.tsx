import React, { useState } from 'react';
import { Plus, Check, Eye, Box, AlertCircle, Sparkles } from 'lucide-react';
import type { Producto } from '../lib/supabase';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Producto;
  onQuickView: (product: Producto) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1400);
  };

  const stock = product.stock ?? 10;
  const isOutOfStock = stock <= 0;

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col overflow-hidden rounded-xl border-2 border-fuchsia-950 bg-[#120c24] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 cursor-pointer"
    >
      {/* 80s Laser Grid Card Header Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#ff2a85] via-[#a855f7] to-[#00f0ff] opacity-80" />

      {/* Product Image Slot */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#090614] flex items-center justify-center">
        {!imageError && product.imagen_url ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#160f2e] to-[#0a0716] retro-grid-dense">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#201440] text-[#00f0ff] border border-cyan-500/50 mb-3 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              <Box className="h-7 w-7 stroke-[1.8]" />
            </div>
            <span className="font-arcade text-[10px] text-fuchsia-400">3D MODEL</span>
            <span className="font-mono text-xs text-cyan-300 mt-1">{product.material || 'PLA'}</span>
          </div>
        )}

        {/* 80s Stock Tag */}
        <div className="absolute top-3 left-3">
          {isOutOfStock ? (
            <span className="font-arcade text-[9px] text-red-400 bg-red-950/80 px-2 py-1 rounded border border-red-500/50">
              GAME OVER
            </span>
          ) : (
            <span className="font-arcade text-[8px] text-[#00f0ff] bg-black/80 px-2 py-1 rounded border border-cyan-500/60 shadow-sm">
              STOCK: {stock}
            </span>
          )}
        </div>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-[#0b0817]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <span className="inline-flex items-center gap-2 px-3.5 py-2 font-display text-xs font-bold text-white bg-[#1a1133] rounded-lg border border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)]">
            <Eye className="h-3.5 w-3.5 text-[#00f0ff]" />
            <span>INSPECCIONAR</span>
          </span>
        </div>
      </div>

      {/* Content Block */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Unboxed 80s Metadata */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold">
          <span className="text-[#00f0ff] tracking-wider">{product.material || 'PLA'}</span>
          {product.color && (
            <>
              <span aria-hidden="true" className="text-fuchsia-600">/</span>
              <span className="text-fuchsia-300 capitalize">{product.color.toLowerCase()}</span>
            </>
          )}
          <span aria-hidden="true" className="text-fuchsia-600">/</span>
          <span className="text-slate-400">PRECISIÓN 3D</span>
        </div>

        {/* Product Name */}
        <h3 className="mt-2 text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors font-display tracking-wide line-clamp-1">
          {product.nombre}
        </h3>

        {/* Description snippet */}
        {product.descripcion && (
          <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed font-tech">
            {product.descripcion}
          </p>
        )}

        {/* Price & Add to Cart footer */}
        <div className="mt-4 pt-3 border-t border-fuchsia-950 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">PRECIO</span>
            <span className="font-display text-lg font-black text-white tabular-nums neon-glow-yellow">
              {formatCurrency(product.precio)}
            </span>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.nombre} al carrito`}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all font-tech ${
              addedRecently
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                : isOutOfStock
                ? 'bg-[#181126] text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-fuchsia-600 to-[#ff2a85] text-white hover:from-fuchsia-500 hover:to-pink-500 shadow-[0_0_14px_rgba(255,42,133,0.4)] hover:shadow-[0_0_20px_rgba(255,42,133,0.7)] active:scale-95'
            }`}
          >
            {addedRecently ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>¡LISTO!</span>
              </>
            ) : isOutOfStock ? (
              <>
                <AlertCircle className="h-3.5 w-3.5" />
                <span>AGOTADO</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>AGREGAR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
