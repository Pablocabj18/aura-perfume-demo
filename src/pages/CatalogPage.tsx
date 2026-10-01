import { SlidersHorizontal, X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/commerce/ProductCard'
import { products } from '../data/products'

const genders = ['Todos','Mujer','Hombre','Unisex']
const families = ['Todas','Fresco','Floral','Dulce','Amaderado','Arabian']

export function CatalogPage() {
  const [params] = useSearchParams()
  const initialGender = params.get('genero') || 'Todos'
  const initialCategory = params.get('categoria') || 'Todas'
  const [gender,setGender] = useState(initialGender)
  const [family,setFamily] = useState(initialCategory === 'Nuevos' || initialCategory === 'Regalos' ? 'Todas' : initialCategory)
  const [sort,setSort] = useState('featured')
  const [mobileFilters,setMobileFilters] = useState(false)
  const visible = useMemo(() => {
    let result = products.filter((product) => (gender === 'Todos' || product.gender === gender) && (family === 'Todas' || product.category === family))
    if (initialCategory === 'Nuevos') result = result.filter((product) => product.newArrival)
    if (sort === 'price-low') result = [...result].sort((a,b) => a.price-b.price)
    if (sort === 'price-high') result = [...result].sort((a,b) => b.price-a.price)
    if (sort === 'name') result = [...result].sort((a,b) => a.name.localeCompare(b.name))
    return result
  },[gender,family,sort,initialCategory])

  const controls = <div className="filter-controls"><div><h3>Para quién</h3>{genders.map((item) => <button className={gender===item?'active':''} onClick={() => setGender(item)} key={item}>{item}<span>{item === 'Todos' ? products.length : products.filter((p) => p.gender===item).length}</span></button>)}</div><div><h3>Familia</h3>{families.map((item) => <button className={family===item?'active':''} onClick={() => setFamily(item)} key={item}>{item}</button>)}</div></div>
  return <div className="catalog-page shell">
    <header className="catalog-header"><div><span className="eyebrow">Colección completa</span><h1>Perfumes para descubrir.</h1><p>{visible.length} fragancias seleccionadas</p></div><div className="catalog-tools"><button className="mobile-filter-button" onClick={() => setMobileFilters(true)}><SlidersHorizontal/> Filtrar</button><label>Ordenar<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Destacados</option><option value="price-low">Menor precio</option><option value="price-high">Mayor precio</option><option value="name">Nombre</option></select></label></div></header>
    <div className="catalog-layout"><aside className="filters">{controls}</aside><div><div className="active-filters">{gender!=='Todos' && <button onClick={() => setGender('Todos')}>{gender}<X/></button>}{family!=='Todas' && <button onClick={() => setFamily('Todas')}>{family}<X/></button>}</div>{visible.length ? <div className="product-grid catalog-grid">{visible.map((product) => <ProductCard product={product} key={product.id}/>)}</div> : <div className="empty-state"><SlidersHorizontal size={36}/><h3>No hay coincidencias</h3><p>Probá otra combinación de filtros.</p><button className="button button--dark" onClick={() => {setGender('Todos');setFamily('Todas')}}>Limpiar filtros</button></div>}</div></div>
    <AnimatePresence>{mobileFilters && <motion.div className="mobile-filter-drawer" initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:320,damping:34}}><div className="drawer__header"><h2>Filtros</h2><button className="icon-button" onClick={() => setMobileFilters(false)}><X/></button></div>{controls}<button className="button button--accent" onClick={() => setMobileFilters(false)}>Ver {visible.length} productos</button></motion.div>}</AnimatePresence>
  </div>
}
