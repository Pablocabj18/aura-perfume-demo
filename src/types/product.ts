export type Gender = 'Hombre' | 'Mujer' | 'Unisex'
export type Occasion = 'Diario' | 'Noche' | 'Especial'

export interface Product {
  id: string
  brand: string
  name: string
  concentration: string
  gender: Gender
  category: string
  sizes: number[]
  price: number
  imageIndex: number
  notes: { top: string[]; heart: string[]; base: string[] }
  family: string
  description: string
  moods: string[]
  occasions: Occasion[]
  featured?: boolean
  newArrival?: boolean
  arabian?: boolean
  bestseller?: boolean
}

export interface CartItem { product: Product; size: number; quantity: number }
