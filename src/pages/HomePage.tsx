import { ArrowDown, ArrowRight, ArrowUpRight, Gift, Package, ShieldCheck, WhatsappLogo } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/commerce/ProductCard'
import { FragranceFinder } from '../components/commerce/FragranceFinder'
import { Reveal } from '../components/motion/Reveal'
import { ProductImage } from '../components/ui/ProductImage'
import { ScentIcon } from '../components/ui/ScentIcon'
import { store } from '../config/store'
import { products } from '../data/products'

export function HomePage() {
  const reduce = useReducedMotion()
  const trending = products.filter((product) => product.featured).slice(0,8)
  const arabian = products.filter((product) => product.arabian).slice(0,4)
  const arrivals = products.filter((product) => product.newArrival).slice(0,4)
  const featured = products.find((product) => product.id === store.editorialProductId) || products[0]
  return <>
    <section className="hero hero--atelier">
      <motion.img className="hero__image" src="/images/aura-hero.png" alt="Composición ilustrativa de frascos de perfume sobre piedra" initial={reduce ? false : {scale:1.055}} animate={{scale:1}} transition={{duration:1.6,ease:[.16,1,.3,1]}}/>
      <div className="hero__masthead"><h1>{store.name}</h1><span>{store.descriptor}<br/>Perfumes de diseñador y árabes</span></div>
      <nav className="hero__categories" aria-label="Explorar categorías">{store.categories.slice(0,4).map((category) => <Link key={category.name} to={category.href}>{category.name}<ArrowUpRight/></Link>)}</nav>
      <motion.div className="hero__commerce" initial={reduce ? false : {clipPath:'inset(100% 0 0 0)'}} animate={{clipPath:'inset(0% 0 0 0)'}} transition={{duration:.75,delay:.15,ease:[.16,1,.3,1]}}>
        <div><h2>Tu próximo perfume<br/>empieza acá.</h2><p>Marcas que conocés. Aromas por descubrir.</p></div>
        <div className="hero__actions"><Link className="button button--dark" to="/catalogo">Comprar perfumes <ArrowRight/></Link><a className="hero__finder-link" href="#finder">Encontrar mi fragancia <ArrowUpRight/></a></div>
        <a className="hero__scroll" href="#coleccion" aria-label="Explorar la colección"><ArrowDown/></a>
      </motion.div>
    </section>
    <section className="brand-section shell"><div className="brand-section__intro"><p>Las casas de nuestra selección</p><Link to="/catalogo">Explorar marcas <ArrowUpRight/></Link></div><div className="brand-rail" aria-label="Marcas destacadas">{store.featuredBrands.map((brand) => <Link to={`/catalogo?marca=${encodeURIComponent(brand)}`} key={brand}>{brand}</Link>)}</div></section>
    <section className="section shell featured-section" id="coleccion"><Reveal className="section-heading"><div><h2>La selección de {store.name}</h2><p>Una primera mirada a nuestro catálogo.</p></div><Link to="/catalogo">Ver todos los perfumes <ArrowRight/></Link></Reveal><div className="product-grid">{trending.map((product) => <ProductCard product={product} key={product.id}/>)}</div></section>
    <section className="section shell category-section"><div className="section-heading"><h2>Encontrá tu estilo.</h2><p>Elegí dónde empezar.</p></div><div className="category-grid">{store.categories.map((category) => <Link className="category-card" to={category.href} key={category.name}><ProductImage index={category.image}/><div><span>{category.sub}</span><h3>{category.name}</h3><ArrowUpRight/></div></Link>)}</div></section>
    <section className="arabian-section"><div className="arabian-section__copy"><h2>Otra forma de<br/><span>descubrir el perfume.</span></h2><p>Perfumería árabe. Especias, vainilla y maderas en nuestra selección de Lattafa, Afnan y Armaf.</p><Link className="button button--dark" to="/catalogo?categoria=Arabian">Explorar perfumes árabes <ArrowRight/></Link><div className="arabian-signature"><ScentIcon family="especiado"/><span>Especias · Ámbar · Vainilla</span></div></div><div className="arabian-row">{arabian.map((product) => <ProductCard product={product} key={product.id}/>)}</div></section>
    <FragranceFinder/>
    <section className="editorial-feature shell"><Reveal className="editorial-feature__visual"><ProductImage index={featured.imageIndex}/><div className="editorial-feature__caption"><span>{featured.brand}</span><span>{featured.concentration}</span></div></Reveal><div className="editorial-feature__copy"><h2>{featured.name}</h2><p className="editorial-feature__brand">{featured.brand}</p><p>Un perfume floral con salida cítrica y fondo de pachulí. Descubrí cómo cambia su composición sobre la piel.</p><div className="editorial-notes">{[['Salida','Naranja'],['Corazón','Rosa'],['Fondo','Pachulí']].map(([label,note]) => <div key={label}><ScentIcon family={label}/><span>{label}</span><b>{note}</b></div>)}</div><Link className="button button--dark" to={`/producto/${featured.id}`}>Conocer la fragancia <ArrowRight/></Link></div></section>
    <section className="section shell arrivals"><div className="section-heading"><h2>Recién llegados.</h2><Link to="/catalogo?categoria=Nuevos">Ver novedades <ArrowRight/></Link></div><div className="product-grid product-grid--four">{arrivals.map((product) => <ProductCard product={product} key={product.id}/>)}</div></section>
    <section className="gifting shell"><div className="gifting__main"><div><Gift size={28}/><h2>Un regalo.<br/>Muchas posibilidades.</h2><p>Elegí por marca, notas o presupuesto. Te ayudamos con la elección.</p><Link className="button button--light" to="/catalogo?categoria=Regalos">Encontrar un regalo <ArrowUpRight/></Link></div></div><div className="gifting__side"><ProductImage index={6}/><div><h3>El detalle también cuenta.</h3><p>Consultá por estuche y tarjeta personalizada.</p></div></div></section>
    <section className="benefits shell" id="envios"><div><Package/><h3>Envíos a todo el país</h3><p>Seguimiento online en cada etapa.</p></div><div><ShieldCheck/><h3>Compra segura</h3><p>Datos protegidos y atención real.</p></div><div><Gift/><h3>Asesoramiento para regalar</h3><p>Encontrá una opción para cada ocasión.</p></div></section>
    <section className="contact-section" id="contacto"><div><h2>Hablemos de perfumes.</h2><p>Consultanos por notas, tamaños o ideas para regalar.</p></div><a className="button button--accent" href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer"><WhatsappLogo size={21}/> Consultar por WhatsApp</a></section>
  </>
}
