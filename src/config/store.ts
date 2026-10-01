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
  theme: { accent: '#b94f4a', ink: '#20242b', canvas: '#f3f4f6' },
} as const

export const money = (value: number) =>
  new Intl.NumberFormat(store.locale, { style: 'currency', currency: store.currency, maximumFractionDigits: 0 }).format(value)
