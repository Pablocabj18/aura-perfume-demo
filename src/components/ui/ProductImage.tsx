import type { CSSProperties } from 'react'

export function ProductImage({ index, className = '' }: { index: number; className?: string }) {
  const column = index % 4
  const row = Math.floor((index % 12) / 4)
  const style = {
    backgroundImage: 'url(/images/perfume-grid.png)',
    backgroundSize: '400% 300%',
    backgroundPosition: `${column * 33.333}% ${row * 50}%`,
  } as CSSProperties
  return <div role="img" aria-label="Fotografía de frasco de perfume" className={`product-image ${className}`} style={style} />
}
