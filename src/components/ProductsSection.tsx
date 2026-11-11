import React, { useEffect, useState, useMemo } from 'react';
import { Search, Database, RefreshCw, AlertCircle, Sparkles, Terminal } from 'lucide-react';
import { getProductos, type Producto } from '../lib/supabase';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

export const ProductsSection: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromRemote, setFromRemote] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedMaterial, setSelectedMaterial] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [activeModalProduct, setActiveModalProduct] = useState<Producto | null>(null);

  const fetchCatalog = async () => {
    setLoading(true);
    setErrorMsg(null);
    const res = await getProductos();
    setProductos(res.data);
    setFromRemote(res.fromRemote);
    if (res.error) {
      setErrorMsg(res.error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  // Compute materials list dynamically
  const materialsList = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => {
      if (p.material) {
        set.add(p.material.trim().toUpperCase());
      }
    });
    return Array.from(set);
  }, [productos]);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    return productos
      .filter((item) => {
        const matchesMaterial =
          selectedMaterial === 'todos' ||
          (item.material && item.material.toUpperCase().includes(selectedMaterial.toUpperCase()));

        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.nombre.toLowerCase().includes(query) ||
          (item.descripcion && item.descripcion.toLowerCase().includes(query)) ||
          (item.material && item.material.toLowerCase().includes(query));

        return matchesMaterial && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.precio - b.precio;
        if (sortBy === 'price-desc') return b.precio - a.precio;
        return 0;
      });
  }, [productos, selectedMaterial, searchQuery, sortBy]);

  return (
    <section id="productos" className="relative scroll-mt-20 py-16 sm:py-24 bg-[#0d091a]">
      {/* Laser grid pattern */}
      <div className="pointer-events-none absolute inset-0 retro-grid-dense opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b-2 border-fuchsia-950">
          <div>
            <div className="flex items-center gap-2 font-arcade text-[10px] text-[#ff2a85] tracking-widest uppercase">
              <span>CATÁLOGO // ARCADE 1984</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#00f0ff]">STOCK EN VIVO</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-display">
              PRODUCTOS DISPONIBLES
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl font-tech">
              Piezas impresas con tolerancias micrométricas, estética ochentera y materiales de alta tenacidad.
            </p>
          </div>

          {/* Supabase 80s BBS Status Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-cyan-500/50 bg-[#140e26] text-xs font-mono text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
              <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span>
                {fromRemote === true
                  ? 'SUPABASE BBS: ONLINE'
                  : fromRemote === false
                  ? 'CATÁLOGO LOCAL CARGADO'
                  : 'CONECTANDO A SUPABASE...'}
              </span>
            </div>

            <button
              onClick={fetchCatalog}
              disabled={loading}
              title="Recargar catálogo desde Supabase"
              className="p-2.5 text-slate-400 hover:text-[#00f0ff] bg-[#140e26] border border-fuchsia-500/40 rounded-lg hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-[#ff2a85]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 font-tech">
          {/* Material Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#140e26] border border-fuchsia-900/60 rounded-xl">
            <button
              onClick={() => setSelectedMaterial('todos')}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                selectedMaterial === 'todos'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TODOS ({productos.length})
            </button>
            {materialsList.map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(mat)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  selectedMaterial === mat
                    ? 'bg-gradient-to-r from-cyan-600 to-[#00f0ff] text-black font-extrabold shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fuchsia-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="BUSCAR PIEZA O MATERIAL..."
                className="w-full pl-9 pr-3 py-2 text-xs font-mono uppercase bg-[#140e26] border border-fuchsia-900/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-mono uppercase bg-[#140e26] border border-fuchsia-900/80 rounded-lg text-slate-300 focus:outline-none focus:border-[#ff2a85] cursor-pointer"
            >
              <option value="default">ORDEN: POR DEFECTO</option>
              <option value="price-asc">PRECIO: MENOR A MAYOR</option>
              <option value="price-desc">PRECIO: MAYOR A MENOR</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border-2 border-fuchsia-950 bg-[#120c24] p-4"
                >
                  <div className="aspect-square w-full rounded-lg bg-[#1c1338] mb-4" />
                  <div className="h-4 w-2/3 bg-[#221645] rounded mb-2" />
                  <div className="h-3 w-1/3 bg-[#221645] rounded mb-4" />
                  <div className="h-9 w-full bg-[#221645] rounded" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-fuchsia-900/60 rounded-2xl bg-[#120c24]/80">
              <AlertCircle className="mx-auto h-12 w-12 text-[#ff2a85] mb-3" />
              <h3 className="font-display text-base font-bold text-white tracking-wider">NO ENCONTRADO EN LA MEMORIA</h3>
              <p className="mt-1 text-xs text-slate-400 font-tech max-w-sm mx-auto">
                No hay modelos que coincidan con la búsqueda. Modificá el filtro o resetealo.
              </p>
              <button
                onClick={() => {
                  setSelectedMaterial('todos');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#00f0ff] rounded-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all font-tech"
              >
                REINICIAR FILTROS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={(p) => setActiveModalProduct(p)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 80s Synthwave Custom Order Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-r from-[#180e33] via-[#150d2c] to-[#0c081a] shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-[#00f0ff] border border-cyan-400/40 shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <Terminal className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wider">
                ¿TENÉS UN ARCHIVO STL O PROYECTO CUSTOM?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-tech mt-1">
                Subí tu diseño 3D, archivo de CAD o link de Thingiverse y te enviamos la cotización en minutos vía WhatsApp.
              </p>
            </div>
          </div>
          <a
            href="#contacto"
            className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#00f0ff] hover:bg-cyan-300 rounded-lg shadow-[0_0_18px_rgba(0,240,255,0.5)] transition-all shrink-0 font-tech"
          >
            COTIZAR PIEZA CUSTOM
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
};
