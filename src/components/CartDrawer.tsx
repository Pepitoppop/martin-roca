import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, Truck, Store, Box } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalAmount,
    customerInfo,
    setCustomerInfo,
    handleCheckout
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details'>('cart');

  if (!isCartOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden font-tech"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120b24] border-l-2 border-fuchsia-500/70 shadow-[0_0_50px_rgba(255,42,133,0.3)] flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b-2 border-fuchsia-950 flex items-center justify-between bg-[#0e081c]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-[#00f0ff]" />
              <h2 className="font-display text-base font-bold text-white tracking-wide">
                CARRITO 80s ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Cerrar carrito"
              className="p-1.5 text-slate-400 hover:text-[#ff2a85] rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#191030] text-[#00f0ff] border border-cyan-500/40 mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Box className="h-8 w-8" />
                </div>
                <h3 className="font-display text-base font-bold text-white tracking-wider">CARRITO VACÍO</h3>
                <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">
                  Agregá productos del catálogo de ryouku 3D para encargar tu pedido personalizado.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00f0ff] hover:bg-cyan-300 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-colors"
                >
                  VER CATÁLOGO DISPONIBLE
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              /* Step 1: Item list */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-fuchsia-950 font-mono">
                  <span>MODELOS EN MEMORIA</span>
                  <button
                    onClick={clearCart}
                    className="text-[#ff2a85] hover:text-pink-300 font-bold transition-colors"
                  >
                    VACIAR
                  </button>
                </div>

                <ul className="divide-y divide-fuchsia-950/80">
                  {items.map((item) => {
                    const subtotal = item.quantity * item.product.precio;
                    return (
                      <li key={item.product.id} className="py-3.5 flex gap-3.5 items-start">
                        {/* Thumbnail */}
                        <div className="h-16 w-16 rounded-lg bg-black overflow-hidden shrink-0 border border-fuchsia-900/60 flex items-center justify-center">
                          {item.product.imagen_url ? (
                            <img
                              src={item.product.imagen_url}
                              alt={item.product.nombre}
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                                if (e.currentTarget.parentElement) {
                                  e.currentTarget.parentElement.innerHTML = '<span class="text-[#00f0ff] font-arcade text-[10px]">3D</span>';
                                }
                              }}
                              className="h-full w-full object-cover object-center"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Box className="h-6 w-6 text-[#00f0ff]" />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-sm font-bold text-white truncate tracking-wide">
                            {item.product.nombre}
                          </h4>

                          <div className="flex items-center gap-2 text-xs font-mono mt-0.5">
                            <span className="text-[#00f0ff]">{item.product.material || 'PLA'}</span>
                            {item.selectedColor && (
                              <>
                                <span className="text-fuchsia-600">/</span>
                                <span className="text-fuchsia-300">{item.selectedColor}</span>
                              </>
                            )}
                          </div>

                          {item.customNote && (
                            <p className="text-[11px] text-slate-400 italic mt-0.5 truncate">
                              "{item.customNote}"
                            </p>
                          )}

                          <div className="mt-2.5 flex items-center justify-between">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-fuchsia-800 rounded bg-black/60">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-2.5 py-0.5 text-xs text-slate-300 hover:text-white"
                                aria-label="Disminuir"
                              >
                                -
                              </button>
                              <span className="px-2 font-display text-xs font-bold text-white tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2.5 py-0.5 text-xs text-slate-300 hover:text-white"
                                aria-label="Aumentar"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="font-display text-sm font-bold text-white tabular-nums neon-glow-yellow">
                                {formatCurrency(subtotal)}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                aria-label="Eliminar producto"
                                className="text-slate-500 hover:text-[#ff2a85] transition-colors p-1"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              /* Step 2: Customer & Delivery Details */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-fuchsia-950 font-mono">
                  <span className="font-bold text-white">DATOS DEL DESTINATARIO</span>
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="text-[#00f0ff] hover:underline"
                  >
                    ← VOLVER A PRODUCTOS
                  </button>
                </div>

                {/* Delivery Method */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2 font-mono">
                    MODALIDAD DE ENTREGA:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomerInfo((prev) => ({ ...prev, deliveryMethod: 'envio' }))}
                      className={`flex items-center justify-center gap-2 p-3 text-xs font-bold uppercase rounded-xl border transition-all ${
                        customerInfo.deliveryMethod === 'envio'
                          ? 'bg-fuchsia-950/80 border-[#ff2a85] text-[#ff2a85] shadow-[0_0_12px_rgba(255,42,133,0.4)]'
                          : 'bg-black/60 border-fuchsia-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Truck className="h-4 w-4" />
                      <span>ENVÍO DOMICILIO</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCustomerInfo((prev) => ({ ...prev, deliveryMethod: 'retiro' }))}
                      className={`flex items-center justify-center gap-2 p-3 text-xs font-bold uppercase rounded-xl border transition-all ${
                        customerInfo.deliveryMethod === 'retiro'
                          ? 'bg-cyan-950/80 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                          : 'bg-black/60 border-fuchsia-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Store className="h-4 w-4" />
                      <span>RETIRO EN TALLER</span>
                    </button>
                  </div>
                </div>

                {/* Customer Name */}
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1 font-mono">
                    NOMBRE COMPLETO:
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    placeholder="Ej: Marcos Alarcón"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#180e30] border border-fuchsia-900/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                {/* Customer Phone */}
                <div>
                  <label htmlFor="customer-phone" className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1 font-mono">
                    TELÉFONO / WHATSAPP:
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    placeholder="Ej: +54 9 388 1234567"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#180e30] border border-fuchsia-900/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                {/* Address if delivery */}
                {customerInfo.deliveryMethod === 'envio' && (
                  <div>
                    <label htmlFor="delivery-address" className="block text-xs font-bold uppercase tracking-wider text-fuchsia-300 mb-1 font-mono">
                      DIRECCIÓN Y CIUDAD:
                    </label>
                    <input
                      id="delivery-address"
                      type="text"
                      placeholder="Calle, Número, Ciudad, Código Postal..."
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 text-xs font-mono bg-[#180e30] border border-fuchsia-900/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff]"
                    />
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label htmlFor="order-notes" className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1 font-mono">
                    ESPECIFICACIONES ADICIONALES:
                  </label>
                  <textarea
                    id="order-notes"
                    rows={2}
                    placeholder="Colores especiales, acabado mate o consultas..."
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#180e30] border border-fuchsia-900/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer with Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t-2 border-fuchsia-950 bg-[#0e081c] space-y-3">
              <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span>SUBTOTAL:</span>
                  <span className="font-display text-white tabular-nums">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>DESPACHO / ENVÍO:</span>
                  <span className="text-[#00f0ff]">A coordinar por WhatsApp</span>
                </div>
                <div className="pt-2 border-t border-fuchsia-950 flex justify-between items-baseline">
                  <span className="font-display text-sm font-bold text-white">TOTAL A ABONAR:</span>
                  <span className="font-display text-2xl font-black text-amber-300 tabular-nums neon-glow-yellow">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  type="button"
                  onClick={() => setCheckoutStep('details')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#00f0ff] hover:bg-cyan-300 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all active:scale-[0.98]"
                >
                  <span>CONTINUAR CON DATOS DE PEDIDO</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>ENVIAR PEDIDO A WHATSAPP</span>
                </button>
              )}

              <p className="text-[10px] text-center text-slate-400 font-mono leading-tight">
                Se abrirá el WhatsApp oficial <strong className="text-cyan-300">+54 9 3888 507496</strong> con el desglose exacto de tu pedido.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
