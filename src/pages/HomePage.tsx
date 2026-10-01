import { ArrowRight, Gift, Package, ShieldCheck, Sparkle, WhatsappLogo } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/commerce/ProductCard'
import { FragranceFinder } from '../components/commerce/FragranceFinder'
import { Reveal } from '../components/motion/Reveal'
import { ProductImage } from '../components/ui/ProductImage'
import { store } from '../config/store'
import { products } from '../data/products'

const categories = [
  { name:'Para ella', sub:'Florales, gourmand y luminosos', href:'/catalogo?genero=Mujer', image:3 },
  { name:'Para él', sub:'Frescos, aromáticos y amaderados', href:'/catalogo?genero=Hombre', image:4 },
  { name:'Unisex', sub:'Fragancias para todos', href:'/catalogo?genero=Unisex', image:10 },
]

export function HomePage() {
  const reduce = useReducedMotion()
  const trending = products.filter((product) => product.featured).slice(0,8)
  const arabian = products.filter((product) => product.arabian).slice(0,4)
  const arrivals = products.filter((product) => product.newArrival).slice(0,4)
  const featured = products.find((product) => product.id === 'coco-mademoiselle')!
  return <>
    <section className="hero">
      <img className="hero__image" src="/images/aura-hero.png" alt="Tres frascos de perfume sobre piedra gris" />
      <motion.div className="hero__copy" initial={reduce ? false : { opacity:0, x:-26 }} animate={{ opacity:1,x:0 }} transition={{ duration:.8,ease:[.16,1,.3,1] }}>
        <span className="eyebrow">Perfumes y belleza</span>
        <h1>Tu próximo perfume<br/>está en AURA.</h1>
        <p>Explorá nuestras marcas y encontrá el perfume que buscás.</p>
        <div className="hero__actions"><Link className="button button--dark" to="/catalogo">Comprar perfumes <ArrowRight /></Link><a className="button button--light" href="#finder">Encontrar mi fragancia</a></div>
      </motion.div>
    </section>

    <section className="brand-rail" aria-label="Marcas destacadas"><span>DIOR</span><span>CHANEL</span><span>YVES SAINT LAURENT</span><span>GIVENCHY</span><span>RABANNE</span><span>VALENTINO</span></section>

    <section className="section shell category-section"><Reveal><h2>Comprá por categoría</h2><p>Perfumes para mujer, hombre y unisex.</p></Reveal>
      <div className="category-grid">{categories.map((category, index) => <Reveal key={category.name} delay={index*.06}><Link className="category-card" to={category.href}><ProductImage index={category.image}/><div><span>{category.sub}</span><h3>{category.name}</h3><ArrowRight /></div></Link></Reveal>)}</div>
    </section>

    <section className="section shell"><Reveal className="section-heading"><h2>Perfumes destacados</h2><Link to="/catalogo">Ver todos <ArrowRight /></Link></Reveal><div className="product-grid">{trending.map((product) => <ProductCard product={product} key={product.id}/>)}</div></section>

    <section className="arabian-section">
      <div className="arabian-section__copy"><Reveal><h2>Perfumes árabes</h2><p>Conocé Khamrah, Yara y otras fragancias de Lattafa, Afnan y Armaf.</p><Link className="button button--light" to="/catalogo?categoria=Arabian">Ver perfumes árabes <ArrowRight /></Link></Reveal></div>
      <div className="arabian-row">{arabian.map((product) => <ProductCard product={product} key={product.id}/>)}</div>
    </section>

    <FragranceFinder />

    <section className="editorial-feature shell">
      <Reveal className="editorial-feature__visual"><ProductImage index={featured.imageIndex}/><span className="editorial-feature__letter">A</span></Reveal>
      <Reveal className="editorial-feature__copy"><p className="editorial-kicker">Conocé sus notas</p><h2>{featured.name}</h2><p className="editorial-feature__brand">{featured.brand}</p><p>Un perfume floral con salida cítrica y fondo de pachulí. Consultá sus tamaños y notas antes de elegir.</p><div className="note-row"><span>Naranja</span><span>Rosa</span><span>Pachulí</span></div><Link className="button button--dark" to={`/producto/${featured.id}`}>Ver producto <ArrowRight /></Link></Reveal>
    </section>

    <section className="section shell arrivals"><Reveal className="section-heading"><h2>Nuevos ingresos</h2><p>Las últimas incorporaciones al catálogo.</p></Reveal><div className="product-grid product-grid--four">{arrivals.map((product) => <ProductCard product={product} key={product.id}/>)}</div></section>

    <section className="gifting shell"><Reveal className="gifting__main"><div><Gift size={32}/><h2>Perfumes para regalar</h2><p>Elegí por marca, notas o presupuesto. Podemos ayudarte a encontrar una opción.</p><Link className="button button--light" to="/catalogo?categoria=Regalos">Ver ideas para regalar</Link></div></Reveal><Reveal className="gifting__side"><Sparkle size={26}/><h3>Presentación para regalo</h3><p>Consultá por estuche y tarjeta personalizada.</p></Reveal></section>

    <section className="benefits shell" id="envios"><div><Package/><h3>Envíos a todo el país</h3><p>Seguimiento online en cada etapa.</p></div><div><ShieldCheck/><h3>Compra segura</h3><p>Datos protegidos y atención real.</p></div><div><Sparkle/><h3>Selección cuidada</h3><p>Un catálogo curado, fácil de explorar.</p></div></section>

    <section className="contact-section" id="contacto"><div><h2>Te ayudamos a elegir</h2><p>Consultanos por notas, tamaños o ideas para regalar.</p></div><a className="button button--accent" href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer"><WhatsappLogo size={21}/> Consultar por WhatsApp</a></section>
  </>
}
