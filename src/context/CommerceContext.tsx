import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartItem, Product } from '../types/product'

interface CommerceState {
  cart: CartItem[]
  favorites: string[]
  cartOpen: boolean
  searchOpen: boolean
  menuOpen: boolean
  addToCart: (product: Product, size?: number, quantity?: number) => void
  updateQuantity: (productId: string, size: number, quantity: number) => void
  removeFromCart: (productId: string, size: number) => void
  toggleFavorite: (id: string) => void
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setMenuOpen: (open: boolean) => void
}

const CommerceContext = createContext<CommerceState | null>(null)

const read = <T,>(key: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(key) || '') as T } catch { return fallback }
}

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => read('aura-cart', []))
  const [favorites, setFavorites] = useState<string[]>(() => read('aura-favorites', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { localStorage.setItem('aura-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('aura-favorites', JSON.stringify(favorites)) }, [favorites])

  const value = useMemo<CommerceState>(() => ({
    cart, favorites, cartOpen, searchOpen, menuOpen, setCartOpen, setSearchOpen, setMenuOpen,
    addToCart(product, size = product.sizes[0], quantity = 1) {
      setCart((items) => {
        const existing = items.find((item) => item.product.id === product.id && item.size === size)
        return existing
          ? items.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item)
          : [...items, { product, size, quantity }]
      })
      setCartOpen(true)
    },
    updateQuantity(productId, size, quantity) {
      setCart((items) => items.map((item) => item.product.id === productId && item.size === size ? { ...item, quantity: Math.max(1, quantity) } : item))
    },
    removeFromCart(productId, size) {
      setCart((items) => items.filter((item) => !(item.product.id === productId && item.size === size)))
    },
    toggleFavorite(id) {
      setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
    },
  }), [cart, favorites, cartOpen, searchOpen, menuOpen])

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>
}

export const useCommerce = () => {
  const context = useContext(CommerceContext)
  if (!context) throw new Error('useCommerce must be used inside CommerceProvider')
  return context
}
