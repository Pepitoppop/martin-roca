import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://ijvpguetofcigexstnbz.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_t9FlcUwM3GZ97Pr1lsUMsA_kUzv6t0Z';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Producto {
  id: number | string;
  nombre: string;
  precio: number;
  imagen_url?: string | null;
  material?: string | null;
  stock?: number | null;
  color?: string | null;
  descripcion?: string | null;
  created_at?: string;
  categoria?: string | null;
}

// Fallback products representing 3D printing workshop inventory if database is offline or supplementary
export const FALLBACK_PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: "Ta Te Ti 3D",
    material: "PLA",
    color: "Blanco / Negro",
    precio: 10000,
    stock: 12,
    imagen_url: "https://ijvpguetofcigexstnbz.supabase.co/storage/v1/object/public/imagenes/4.jfif",
    descripcion: "Juego de mesa clásico de estrategia con tablero encastrable y fichas impresas en alta densidad. Ideal para viajes, escritorio y decoración."
  },
  {
    id: 2,
    nombre: "Porta Celular Ajustable",
    material: "PLA",
    color: "Verde Militar",
    precio: 5000,
    stock: 20,
    imagen_url: "https://ijvpguetofcigexstnbz.supabase.co/storage/v1/object/public/imagenes/1.jfif",
    descripcion: "Soporte ergonómico para smartphones y tablets de hasta 11 pulgadas. Ángulo optimizado para videollamadas, streaming y carga con ranura para cable."
  },
  {
    id: 3,
    nombre: "Engranaje Planetario Mecánico",
    material: "PETG",
    color: "Negro & Naranja",
    precio: 12500,
    stock: 8,
    imagen_url: "/images/macro_3d_layers_1794327049307.jpg",
    descripcion: "Mecanismo cinemático funcional de engranajes planetarios con rodamientos sellados. Pieza técnica de exhibición antiestrés y prototipado mecánico."
  },
  {
    id: 4,
    nombre: "Organizador Modular Hexagonal",
    material: "PLA+",
    color: "Gris Grafito",
    precio: 7800,
    stock: 15,
    imagen_url: "https://ijvpguetofcigexstnbz.supabase.co/storage/v1/object/public/imagenes/4.jfif",
    descripcion: "Sistema modular magnético para herramientas, cables, tarjetas SD y bolígrafos. Se acopla de manera infinita para personalizar tu escritorio de trabajo."
  },
  {
    id: 5,
    nombre: "Lámpara Litofanía Personalizada",
    material: "PETG / LED",
    color: "Blanco Lunar",
    precio: 18000,
    stock: 6,
    imagen_url: "https://ijvpguetofcigexstnbz.supabase.co/storage/v1/object/public/imagenes/1.jfif",
    descripcion: "Lámpara cilíndrica con fotografía o grabado personalizado que se revela con la luz interna. Incluye base de madera y cable USB con dimmer táctil."
  },
  {
    id: 6,
    nombre: "Soporte para Auriculares Gamer",
    material: "PLA Reforzado",
    color: "Negro Mate",
    precio: 9500,
    stock: 10,
    imagen_url: "/images/macro_3d_layers_1794327049307.jpg",
    descripcion: "Base robusta con contrapeso interior y almohadilla de silicona para no deformar la vincha de auriculares inalámbricos o de estudio."
  }
];

export async function getProductos(): Promise<{ data: Producto[]; fromRemote: boolean; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase query error, using fallback products:', error);
      return { data: FALLBACK_PRODUCTOS, fromRemote: false, error: new Error(error.message) };
    }

    if (data && data.length > 0) {
      // Map and guarantee stock default if not populated in table
      const formatted: Producto[] = data.map((item: any, idx: number) => ({
        id: item.id ?? idx + 1,
        nombre: item.nombre || 'Producto 3D',
        precio: typeof item.precio === 'number' ? item.precio : Number(item.precio) || 0,
        imagen_url: item.imagen_url || null,
        material: item.material || 'PLA',
        stock: item.stock !== undefined && item.stock !== null ? Number(item.stock) : 15,
        color: item.color || null,
        descripcion: item.descripcion || '',
        created_at: item.created_at
      }));
      return { data: formatted, fromRemote: true, error: null };
    }

    return { data: FALLBACK_PRODUCTOS, fromRemote: false, error: null };
  } catch (err: any) {
    console.error('Error fetching productos:', err);
    return { data: FALLBACK_PRODUCTOS, fromRemote: false, error: err };
  }
}
