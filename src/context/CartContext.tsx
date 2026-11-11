import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Producto } from '../lib/supabase';
import confetti from 'canvas-confetti';

export interface CartItem {
  product: Producto;
  quantity: number;
  selectedColor?: string;
  customNote?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  deliveryMethod: 'envio' | 'retiro';
  address: string;
  notes: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Producto, quantity?: number, selectedColor?: string, customNote?: string) => void;
  removeItem: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  generateWhatsAppUrl: () => string;
  handleCheckout: () => void;
}

const CART_STORAGE_KEY = 'ryouku3d_cart_items_v2';
const CUSTOMER_STORAGE_KEY = 'ryouku3d_customer_info_v2';
const WHATSAPP_PHONE = '5493888507496';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [];
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    try {
      const stored = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load customer info from localStorage', e);
    }
    return {
      name: '',
      phone: '',
      deliveryMethod: 'envio',
      address: '',
      notes: ''
    };
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerInfo));
    } catch (e) {
      console.error('Failed to save customer info to localStorage', e);
    }
  }, [customerInfo]);

  const addItem = (product: Producto, quantity = 1, selectedColor?: string, customNote?: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        const currentQty = next[existingIndex].quantity;
        const maxStock = product.stock ?? 99;
        const newQty = Math.min(currentQty + quantity, maxStock);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
          selectedColor: selectedColor || next[existingIndex].selectedColor || product.color || 'Estándar',
          customNote: customNote || next[existingIndex].customNote
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: Math.max(1, quantity),
            selectedColor: selectedColor || product.color || 'Estándar',
            customNote
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: number | string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stock ?? 99;
          return {
            ...item,
            quantity: Math.min(quantity, maxStock)
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.product.precio, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const generateWhatsAppUrl = () => {
    let message = `*¡Hola ryouku 3D! Quiero realizar el siguiente pedido:* 🛒🚀\n\n`;

    message += `*📋 Detalle de Productos:*\n`;
    items.forEach((item, index) => {
      const subtotal = item.quantity * item.product.precio;
      message += `${index + 1}. *${item.product.nombre}*\n`;
      message += `   • Cantidad: ${item.quantity} un.\n`;
      message += `   • Precio unitario: ${formatCurrency(item.product.precio)}\n`;
      if (item.product.material) {
        message += `   • Material: ${item.product.material}\n`;
      }
      if (item.selectedColor || item.product.color) {
        message += `   • Color: ${item.selectedColor || item.product.color}\n`;
      }
      if (item.customNote) {
        message += `   • Detalle personalizado: ${item.customNote}\n`;
      }
      message += `   • Subtotal: ${formatCurrency(subtotal)}\n\n`;
    });

    message += `💰 *TOTAL DEL PEDIDO: ${formatCurrency(totalAmount)}*\n\n`;

    message += `*👤 Información del Cliente:*\n`;
    message += `• Nombre: ${customerInfo.name.trim() || 'A coordinar'}\n`;
    if (customerInfo.phone.trim()) {
      message += `• Teléfono: ${customerInfo.phone.trim()}\n`;
    }
    message += `• Modalidad: ${customerInfo.deliveryMethod === 'envio' ? 'Envío a domicilio' : 'Retiro en taller'}\n`;
    if (customerInfo.deliveryMethod === 'envio' && customerInfo.address.trim()) {
      message += `• Dirección de entrega: ${customerInfo.address.trim()}\n`;
    }
    if (customerInfo.notes.trim()) {
      message += `• Observaciones / Especificaciones 3D: ${customerInfo.notes.trim()}\n`;
    }

    message += `\n¿Tienen disponibilidad para coordinar la producción o el envío? ¡Muchas gracias!`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore in headless
    }

    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        customerInfo,
        setCustomerInfo,
        generateWhatsAppUrl,
        handleCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
