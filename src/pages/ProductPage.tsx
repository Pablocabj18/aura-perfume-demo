import { Check, Heart, Minus, Plus, ShieldCheck, WhatsappLogo } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
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
  const related = useMemo(() => products.filter((item) => item.id !== product?.id && (item.family === product?.family || item.gender === product?.gender)).slice(0,4),[product])
  if (!product) return <div className="not-found"><h1>Esta fragancia no está disponible.</h1><Link className="button button--dark" to="/catalogo">Volver al catálogo</Link></div>
  const liked = favorites.includes(product.id)
  return <div className="product-page">
    <div className="product-detail shell"><div className="product-gallery"><ProductImage index={product.imageIndex}/><div className="product-gallery__mini"><ProductImage index={(product.imageIndex+1)%12}/><ProductImage index={(product.imageIndex+4)%12}/></div></div>
      <div className="product-buy"><nav><Link to="/catalogo">Perfumes</Link><span>/</span><span>{product.brand}</span></nav><p className="product-buy__brand">{product.brand}</p><h1>{product.name}</h1><p className="product-buy__concentration">{product.concentration}</p><strong className="product-buy__price">{money(product.price)}</strong><p className="product-buy__description">{product.description}</p>
        <fieldset className="size-picker"><legend>Tamaño <span>{size} ml seleccionado</span></legend><div>{product.sizes.map((item) => <button onClick={() => setSize(item)} className={size===item?'selected':''} key={item}>{size===item && <Check/>}{item} ml</button>)}</div></fieldset>
        <div className="buy-actions"><div className="quantity quantity--large"><button aria-label="Restar" onClick={() => setQuantity(Math.max(1,quantity-1))}><Minus/></button><b>{quantity}</b><button aria-label="Sumar" onClick={() => setQuantity(quantity+1)}><Plus/></button></div><button className="button button--accent" onClick={() => addToCart(product,size,quantity)}>Agregar al carrito</button><button className="icon-button favorite-large" aria-label="Favorito" onClick={() => toggleFavorite(product.id)}><Heart weight={liked?'fill':'regular'}/></button></div>
        <a className="whatsapp-link" href={`https://wa.me/${store.whatsapp}?text=Hola, quisiera consultar por ${product.brand} ${product.name}`} target="_blank" rel="noreferrer"><WhatsappLogo/> Consultar por WhatsApp</a><div className="purchase-note"><ShieldCheck/><span><b>Compra protegida</b> Envíos con seguimiento y atención personalizada.</span></div>
      </div></div>
    <section className="notes-section"><div className="shell"><div className="notes-intro"><p>Familia olfativa</p><h2>{product.family}</h2><p>Una composición construida en capas. Cada una aparece en un momento distinto sobre la piel.</p></div><div className="note-pyramid"><div><span>Salida</span><h3>{product.notes.top.join(', ')}</h3><p>La primera impresión</p></div><div><span>Corazón</span><h3>{product.notes.heart.join(', ')}</h3><p>El carácter de la fragancia</p></div><div><span>Fondo</span><h3>{product.notes.base.join(', ')}</h3><p>La huella que permanece</p></div></div></div></section>
    <section className="section shell"><div className="section-heading"><h2>También pueden gustarte.</h2></div><div className="product-grid product-grid--four">{related.map((item) => <ProductCard product={item} key={item.id}/>)}</div></section>
  </div>
}
