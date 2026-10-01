import { ArrowUpRight, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { store } from '../../config/store'

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><Link to="/" className="brand brand--footer"><strong>{store.name}</strong><span>{store.descriptor}</span></Link><p>Perfumes que se sienten propios.</p></div>
      <div><h3>Descubrí</h3><Link to="/catalogo">Todos los perfumes</Link><Link to="/catalogo?genero=Mujer">Mujer</Link><Link to="/catalogo?genero=Hombre">Hombre</Link><Link to="/catalogo?categoria=Arabian">Perfumería árabe</Link></div>
      <div><h3>Ayuda</h3><a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight /></a><a href="#envios">Envíos y devoluciones</a><a href="#contacto">Contacto</a></div>
      <div className="footer-social"><h3>Seguinos</h3><a href="https://instagram.com" target="_blank" rel="noreferrer"><InstagramLogo /> {store.instagram}</a><a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer"><WhatsappLogo /> Consulta personalizada</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 AURA</span><p>AURA es una tienda ficticia creada como proyecto de demostración. No está afiliada ni respaldada por las marcas de fragancias exhibidas.</p><span>{store.address}</span></div>
  </footer>
}
