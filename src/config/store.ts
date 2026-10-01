export const store = {
  name: 'AURA',
  descriptor: 'Parfums & Beauty',
  currency: 'ARS',
  locale: 'es-AR',
  whatsapp: '5491123456789',
  instagram: '@auraparfums.demo',
  address: 'Buenos Aires, Argentina',
  navigation: [
    { label: 'Perfumes', href: '/catalogo' },
    { label: 'Mujer', href: '/catalogo?genero=Mujer' },
    { label: 'Hombre', href: '/catalogo?genero=Hombre' },
    { label: 'Árabes', href: '/catalogo?categoria=Arabian' },
    { label: 'Novedades', href: '/catalogo?categoria=Nuevos' },
  ],
  categories: [
    { name: 'Mujer', sub: 'Florales y gourmand', href: '/catalogo?genero=Mujer', image: 3 },
    { name: 'Hombre', sub: 'Frescos y amaderados', href: '/catalogo?genero=Hombre', image: 4 },
    { name: 'Unisex', sub: 'Sin distinción', href: '/catalogo?genero=Unisex', image: 10 },
    { name: 'Árabes', sub: 'Lattafa, Afnan y Armaf', href: '/catalogo?categoria=Arabian', image: 0 },
    { name: 'Regalos', sub: 'Una elección personal', href: '/catalogo?categoria=Regalos', image: 6 },
  ],
  featuredBrands: ['Dior', 'Chanel', 'Yves Saint Laurent', 'Givenchy', 'Rabanne', 'Valentino'],
  editorialProductId: 'coco-mademoiselle',
  theme: {
    accent: '#925b60', accentDark: '#75454a', ink: '#292724', canvas: '#f7f4ee',
    surface: '#fffcf7', surfaceMuted: '#eae3d9', muted: '#70675f', border: '#d9d0c4',
    blush: '#eadbd6', champagne: '#d9c3a3', glass: 'rgba(255,252,247,.78)',
    shadow: '0 16px 40px rgba(62,43,31,.09)', radius: '14px',
    displayFont: 'Manrope', interfaceFont: 'Public Sans', wordmarkFont: 'Instrument Serif',
  },
} as const

export const money = (value: number) =>
  new Intl.NumberFormat(store.locale, { style: 'currency', currency: store.currency, maximumFractionDigits: 0 }).format(value)
