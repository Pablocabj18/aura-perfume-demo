import { Heart, Plus } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { money } from '../../config/store'
import { useCommerce } from '../../context/CommerceContext'
import { ProductImage } from '../ui/ProductImage'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useCommerce()
  const liked = favorites.includes(product.id)
  return (
    <article className="product-card group">
      <div className="product-card__visual">
        <Link to={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}><ProductImage index={product.imageIndex} /></Link>
        <button className="icon-button product-card__favorite" aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'} onClick={() => toggleFavorite(product.id)}>
          <Heart size={19} weight={liked ? 'fill' : 'regular'} />
        </button>
        <button className="product-card__quick" onClick={() => addToCart(product)}><Plus size={17} /> Agregar</button>
      </div>
      <Link className="product-card__info" to={`/producto/${product.id}`}>
        <p className="product-card__brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <p className="product-card__meta">{product.concentration} · {product.sizes[0]} ml</p>
        <p className="product-card__price">{money(product.price)}</p>
      </Link>
    </article>
  )
}
