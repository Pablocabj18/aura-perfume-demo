import { Heart, List, MagnifyingGlass, ShoppingBag, X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, NavLink } from 'react-router-dom'
import { store } from '../../config/store'
import { useCommerce } from '../../context/CommerceContext'

export function Header() {
  const { cart, favorites, setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useCommerce()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  return <>
    <div className="announcement">Envío sin cargo desde $180.000 <span>Asesoramiento personalizado por WhatsApp</span></div>
    <header className="site-header">
      <button className="header-mobile-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <List />}</button>
      <nav className="desktop-nav" aria-label="Navegación principal">{store.navigation.slice(0,3).map((item) => <NavLink key={item.label} to={item.href}>{item.label}</NavLink>)}</nav>
      <Link to="/" className="brand"><strong>{store.name}</strong><span>{store.descriptor}</span></Link>
      <nav className="header-actions" aria-label="Acciones">
        <NavLink className="desktop-link" to="/catalogo?categoria=Arabian">Árabes</NavLink>
        <button aria-label="Buscar" onClick={() => setSearchOpen(true)}><MagnifyingGlass /></button>
        <Link className="desktop-icon" to="/favoritos" aria-label={`Favoritos, ${favorites.length}`}><Heart weight={favorites.length ? 'fill' : 'regular'} /></Link>
        <button className="bag-button" aria-label={`Carrito, ${count} productos`} onClick={() => setCartOpen(true)}><ShoppingBag /><span>{count}</span></button>
      </nav>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      {store.navigation.map((item) => <Link key={item.label} to={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
      <Link to="/favoritos" onClick={() => setMenuOpen(false)}>Favoritos <span>{favorites.length}</span></Link>
    </motion.nav>}</AnimatePresence>
  </>
}
