import { Minus, Plus, ShoppingBag, Trash, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { money } from '../../config/store'
import { useCommerce } from '../../context/CommerceContext'
import { ProductImage } from '../ui/ProductImage'
import { useDialogFocus } from '../ui/useDialogFocus'
import { useEffect, useState } from 'react'

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart } = useCommerce()
  const reduce = useReducedMotion()
  const dialog = useDialogFocus<HTMLElement>(cartOpen,() => setCartOpen(false))
  const [demoComplete,setDemoComplete] = useState(false)
  useEffect(() => { if(cartOpen) setDemoComplete(false) },[cartOpen])
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  return <AnimatePresence>{cartOpen && <>
    <motion.button aria-label="Cerrar carrito" className="drawer-backdrop" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
    <motion.aside ref={dialog} className="drawer" role="dialog" aria-modal="true" aria-label="Carrito" initial={reduce ? false : { x: '100%' }} animate={{ x: 0 }} exit={reduce ? {opacity:0} : { x: '100%' }} transition={{ type: 'spring', stiffness: 330, damping: 34 }}>
      <div className="drawer__header"><div><span>Tu selección</span><h2>Carrito</h2></div><button className="icon-button" aria-label="Cerrar" onClick={() => setCartOpen(false)}><X size={21} /></button></div>
      <div className="drawer__body">
        {cart.length === 0 ? <div className="empty-state"><ShoppingBag size={36} /><h3>Tu carrito está vacío</h3><p>Explorá la colección y elegí una fragancia para empezar.</p><button className="button button--dark" onClick={() => setCartOpen(false)}>Seguir comprando</button></div> : cart.map((item) => <div className="cart-item" key={`${item.product.id}-${item.size}`}>
          <ProductImage index={item.product.imageIndex} className="cart-item__image" />
          <div className="cart-item__main"><p>{item.product.brand}</p><h3>{item.product.name}</h3><span>{item.size} ml</span><div className="quantity"><button aria-label="Restar" onClick={() => updateQuantity(item.product.id,item.size,item.quantity-1)}><Minus /></button><b>{item.quantity}</b><button aria-label="Sumar" onClick={() => updateQuantity(item.product.id,item.size,item.quantity+1)}><Plus /></button></div></div>
          <div className="cart-item__side"><b>{money(item.product.price * item.quantity)}</b><button aria-label="Eliminar" onClick={() => removeFromCart(item.product.id,item.size)}><Trash /></button></div>
        </div>)}
      </div>
      {cart.length > 0 && <div className="drawer__footer"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>{demoComplete ? 'Recorrido completado. Es una demostración: no se generó ningún pedido ni cobro.' : 'Demo sin pagos reales. En una tienda activa, aquí se completa el envío y el pago.'}</p>{demoComplete ? <p role="status" className="demo-confirmation">Tu selección está lista. Gracias por probar la experiencia.</p> : <button className="button button--accent" onClick={() => setDemoComplete(true)}>Finalizar compra demo</button>}<button className="text-button" onClick={() => setCartOpen(false)}>Continuar comprando</button></div>}
    </motion.aside>
  </>}</AnimatePresence>
}
