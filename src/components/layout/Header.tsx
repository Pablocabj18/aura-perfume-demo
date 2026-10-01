import { Heart, List, MagnifyingGlass, ShoppingBag, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link, NavLink } from 'react-router-dom'
import { store } from '../../config/store'
import { useCommerce } from '../../context/CommerceContext'
import { useDialogFocus } from '../ui/useDialogFocus'

export function Header() {
  const { cart, favorites, setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useCommerce()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const menu = useDialogFocus<HTMLElement>(menuOpen,() => setMenuOpen(false))
  const reduce = useReducedMotion()
  return <>
    <div className="announcement">Envío sin cargo desde $180.000 <span>Asesoramiento personalizado por WhatsApp</span></div>
    <header className="site-header">
      <button className="header-mobile-button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <List />}</button>
      <nav className="desktop-nav" aria-label="Navegación principal">{store.navigation.slice(0,3).map((item) => <NavLink key={item.label} to={item.href}>{item.label}</NavLink>)}</nav>
      <Link to="/" className="brand" onClick={() => setMenuOpen(false)}><strong>{store.name}</strong><span>{store.descriptor}</span></Link>
      <nav className="header-actions" aria-label="Acciones">
        <NavLink className="desktop-link" to="/catalogo?categoria=Arabian">Árabes</NavLink>
        <button aria-label="Buscar" onClick={() => {setMenuOpen(false);setSearchOpen(true)}}><MagnifyingGlass /></button>
        <Link className="desktop-icon" to="/favoritos" aria-label={`Favoritos, ${favorites.length}`}><Heart weight={favorites.length ? 'fill' : 'regular'} /></Link>
        <button className="bag-button" aria-label={`Carrito, ${count} productos`} onClick={() => {setMenuOpen(false);setCartOpen(true)}}><ShoppingBag /><span>{count}</span></button>
      </nav>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav ref={menu} aria-label="Menú móvil" className="mobile-menu" initial={reduce ? false : { opacity: 0, clipPath:'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath:'inset(0 0 0% 0)' }} exit={reduce ? {opacity:0} : { opacity: 0, clipPath:'inset(0 0 100% 0)' }} transition={{duration:reduce?0:.25}}>
      {store.navigation.map((item) => <Link key={item.label} to={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
      <Link to="/favoritos" onClick={() => setMenuOpen(false)}>Favoritos <span>{favorites.length}</span></Link>
      <p>{store.descriptor}<br/>{store.address}</p>
    </motion.nav>}</AnimatePresence>
  </>
}
