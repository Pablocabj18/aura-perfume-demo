import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { useCommerce } from '../../context/CommerceContext'
import { money } from '../../config/store'
import { ProductImage } from '../ui/ProductImage'
import { useDialogFocus } from '../ui/useDialogFocus'

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useCommerce()
  const [query, setQuery] = useState('')
  const reduce = useReducedMotion()
  const dialog = useDialogFocus<HTMLDivElement>(searchOpen,() => setSearchOpen(false))
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('es')
    if (!normalized) return products.filter((product) => product.bestseller).slice(0, 5)
    return products.filter((product) => `${product.brand} ${product.name} ${product.family}`.toLocaleLowerCase('es').includes(normalized)).slice(0, 8)
  }, [query])
  return <AnimatePresence>{searchOpen && <motion.div ref={dialog} className="search-overlay" role="dialog" aria-modal="true" aria-label="Buscar productos" initial={reduce ? false : { opacity: 0, clipPath:'inset(0 0 12% 0)' }} animate={{ opacity: 1, clipPath:'inset(0 0 0% 0)' }} exit={{ opacity: 0 }} transition={{duration:.25}}>
    <div className="search-overlay__top"><div className="search-field"><MagnifyingGlass size={22}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscá por perfume, marca o familia" aria-label="Buscar" /></div><button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda"><X /></button></div>
    <div className="search-overlay__content"><p className="search-label">{query ? `${results.length} resultados` : 'Más buscados'}</p>
      {results.length ? <div className="search-results">{results.map((product) => <Link to={`/producto/${product.id}`} onClick={() => setSearchOpen(false)} className="search-result" key={product.id}><ProductImage index={product.imageIndex}/><div><span>{product.brand}</span><h3>{product.name}</h3><p>{product.family}</p></div><strong>{money(product.price)}</strong></Link>)}</div> : <div className="empty-state"><MagnifyingGlass size={34}/><h3>No encontramos esa fragancia</h3><p>Probá con una marca, un aroma como “amaderado” o un nombre más corto.</p></div>}
    </div>
  </motion.div>}</AnimatePresence>
}
