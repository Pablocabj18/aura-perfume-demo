import { Check, Heart, Minus, Plus, ShieldCheck, WhatsappLogo } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ScentIcon } from '../components/ui/ScentIcon'
import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/commerce/ProductCard'
import { ProductImage } from '../components/ui/ProductImage'
import { money, store } from '../config/store'
import { useCommerce } from '../context/CommerceContext'
import { productById, products } from '../data/products'

export function ProductPage() {
  const { id } = useParams()
  const product = productById(id)
  const { addToCart, favorites, toggleFavorite } = useCommerce()
  const [size,setSize] = useState(product?.sizes[0] || 50)
  const [quantity,setQuantity] = useState(1)
  const [view,setView] = useState('full')
  const reduce = useReducedMotion()
  useEffect(() => {setSize(product?.sizes[0] || 50);setQuantity(1);setView('full')},[product?.id])
  const related = useMemo(() => products.filter((item) => item.id !== product?.id && (item.family === product?.family || item.gender === product?.gender)).slice(0,4),[product])
  if (!product) return <div className="not-found"><h1>Esta fragancia no está disponible.</h1><Link className="button button--dark" to="/catalogo">Volver al catálogo</Link></div>
  const liked = favorites.includes(product.id)
  return <div className="product-page">
    <div className="product-detail shell"><div className="product-gallery"><div className={`product-gallery__stage ${view==='detail'?'is-detail':''}`}><motion.div animate={{scale:view==='detail'?1.22:1}} transition={{duration:reduce?0:.45,ease:[.16,1,.3,1]}}><ProductImage index={product.imageIndex}/></motion.div><span className="gallery-family">{product.family}</span></div><div className="gallery-toolbar"><div>{[['full','Vista completa'],['detail','Acercar']].map(([value,label]) => <button key={value} aria-pressed={view===value} className={view===value?'active':''} onClick={() => setView(value)}>{label}</button>)}</div><span>Imagen ilustrativa de la demo</span></div></div>
      <div className="product-buy"><nav><Link to="/catalogo">Perfumes</Link><span>/</span><span>{product.brand}</span></nav><p className="product-buy__brand">{product.brand}</p><h1>{product.name}</h1><p className="product-buy__concentration">{product.concentration}</p><strong className="product-buy__price">{money(product.price)}</strong><p className="product-buy__description">{product.description}</p>
        <div className="product-profile"><ScentIcon family={product.moods[0]}/><span>{product.family}</span><span>{product.gender}</span></div>
        <fieldset className="size-picker"><legend>Tamaño <span>{size} ml seleccionado</span></legend><div>{product.sizes.map((item) => <button aria-pressed={size===item} onClick={() => setSize(item)} className={size===item?'selected':''} key={item}>{size===item && <Check/>}{item} ml</button>)}</div></fieldset>
        <div className="buy-actions"><div className="quantity quantity--large"><button aria-label="Restar" onClick={() => setQuantity(Math.max(1,quantity-1))}><Minus/></button><b>{quantity}</b><button aria-label="Sumar" onClick={() => setQuantity(quantity+1)}><Plus/></button></div><button className="button button--accent" onClick={() => addToCart(product,size,quantity)}>Agregar al carrito</button><button className="icon-button favorite-large" aria-label="Favorito" onClick={() => toggleFavorite(product.id)}><Heart weight={liked?'fill':'regular'}/></button></div>
        <a className="whatsapp-link" href={`https://wa.me/${store.whatsapp}?text=Hola, quisiera consultar por ${product.brand} ${product.name}`} target="_blank" rel="noreferrer"><WhatsappLogo/> Consultar por WhatsApp</a><div className="purchase-note"><ShieldCheck/><span><b>Compra protegida</b> Envíos con seguimiento y atención personalizada.</span></div>
      </div></div>
    <section className="notes-section"><div className="shell"><div className="notes-intro"><h2>Conocé sus notas.</h2><p>Salida, corazón y fondo: las tres etapas de una fragancia sobre la piel.</p><span className="notes-family">{product.family}</span></div><div className="note-pyramid">{[{label:'Salida',notes:product.notes.top,description:'La primera impresión'},{label:'Corazón',notes:product.notes.heart,description:'El carácter de la fragancia'},{label:'Fondo',notes:product.notes.base,description:'Las notas que permanecen'}].map((note) => <div key={note.label}><ScentIcon family={note.label}/><div><span>{note.label}</span><h3>{note.notes.join(', ')}</h3><p>{note.description}</p></div></div>)}</div></div></section>
    <section className="section shell"><div className="section-heading"><h2>También pueden gustarte.</h2></div><div className="product-grid product-grid--four">{related.map((item) => <ProductCard product={item} key={item.id}/>)}</div></section>
  </div>
}
