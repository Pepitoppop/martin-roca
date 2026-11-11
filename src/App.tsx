/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { CaracteristicasSection } from './components/CaracteristicasSection';
import { OpinionesSection } from './components/OpinionesSection';
import { NovedadesSection } from './components/NovedadesSection';
import { ContactoSection } from './components/ContactoSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MessageSquare, Radio } from 'lucide-react';

export default function App() {
  const [crtActive, setCrtActive] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className={`relative min-h-screen bg-[#0b0817] text-slate-100 flex flex-col font-tech selection:bg-fuchsia-600 selection:text-white ${crtActive ? 'scanlines' : ''}`}>
        {/* Navigation Bar */}
        <Navbar
          onOpenQuoteModal={scrollToContact}
          crtActive={crtActive}
          onToggleCrt={() => setCrtActive(!crtActive)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero onQuoteClick={scrollToContact} />

          {/* Catálogo de Productos (Supabase) */}
          <ProductsSection />

          {/* Características Técnicas & Materiales */}
          <CaracteristicasSection />

          {/* Opiniones de Clientes */}
          <OpinionesSection />

          {/* Novedades del Taller */}
          <NovedadesSection />

          {/* Cotizador & Contacto */}
          <ContactoSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Cart Slide-Over Drawer */}
        <CartDrawer />

        {/* Floating Quick WhatsApp Action with 80s neon styling */}
        <a
          href="https://wa.me/5493888507496?text=Hola%20ryouku%203D!%20Quisiera%20hacer%20una%20consulta%20por%20un%20trabajo%20de%20impresi%C3%B3n%203D"
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar a ryouku 3D por WhatsApp"
          className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-black font-black shadow-[0_0_25px_rgba(52,211,153,0.7)] hover:scale-110 active:scale-95 transition-all border-2 border-emerald-300"
        >
          <MessageSquare className="h-7 w-7 text-black fill-current" />
          <span className="sr-only">WhatsApp ryouku 3D</span>
        </a>
      </div>
    </CartProvider>
  );
}
