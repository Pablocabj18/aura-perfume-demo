import { Heart } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/commerce/ProductCard'
import { useCommerce } from '../context/CommerceContext'
import { products } from '../data/products'

export function FavoritesPage() {
  const { favorites } = useCommerce()
  const selected = products.filter((product) => favorites.includes(product.id))
  return <div className="simple-page shell"><span className="eyebrow">Tu selección</span><h1>Favoritos.</h1>{selected.length ? <div className="product-grid">{selected.map((product) => <ProductCard product={product} key={product.id}/>)}</div> : <div className="empty-state"><Heart size={40}/><h2>Todavía no guardaste perfumes</h2><p>Usá el corazón en cualquier producto para tenerlo siempre a mano.</p><Link className="button button--dark" to="/catalogo">Explorar perfumes</Link></div>}</div>
}
