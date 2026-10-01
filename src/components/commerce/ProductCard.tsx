import { Heart, Plus } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import type { Product } from '../../types/product'
import { money } from '../../config/store'
import { useCommerce } from '../../context/CommerceContext'
import { ProductImage } from '../ui/ProductImage'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useCommerce()
  const liked = favorites.includes(product.id)
  const reduce = useReducedMotion()
  return (
    <motion.article className="product-card group" whileHover={reduce ? undefined : { y:-4 }} transition={{type:'spring',stiffness:350,damping:30}}>
      <div className="product-card__visual">
        <Link to={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}><ProductImage index={product.imageIndex} /></Link>
        {(product.newArrival || product.bestseller) && <span className="product-card__badge">{product.newArrival ? 'Nuevo' : 'Más elegido'}</span>}
        <motion.button whileTap={reduce ? undefined : {scale:.88}} className={`icon-button product-card__favorite ${liked ? 'is-liked' : ''}`} aria-pressed={liked} aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'} onClick={() => toggleFavorite(product.id)}>
          <Heart size={19} weight={liked ? 'fill' : 'regular'} />
        </motion.button>
        <button className="product-card__quick" onClick={() => addToCart(product)}><Plus size={17} /> Agregar</button>
      </div>
      <Link className="product-card__info" to={`/producto/${product.id}`}>
        <p className="product-card__brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <p className="product-card__meta">{product.concentration}</p>
        <p className="product-card__sizes">{product.sizes.map((size) => `${size} ml`).join(' / ')}</p>
        <p className="product-card__price">{money(product.price)}</p>
      </Link>
    </motion.article>
  )
}
