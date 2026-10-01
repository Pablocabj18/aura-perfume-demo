import { ArrowRight, Check } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useMemo, useState } from 'react'
import { products } from '../../data/products'
import type { Occasion } from '../../types/product'
import { ProductCard } from './ProductCard'

const ScentSculpture = lazy(() => import('../three/ScentSculpture').then((module) => ({ default: module.ScentSculpture })))
const moods = ['fresco','dulce','amaderado','floral','especiado']
const occasions: Occasion[] = ['Diario','Noche','Especial']

export function FragranceFinder() {
  const [mood, setMood] = useState('')
  const [occasion, setOccasion] = useState<Occasion | ''>('')
  const [done, setDone] = useState(false)
  const matches = useMemo(() => products.filter((product) => (!mood || product.moods.includes(mood)) && (!occasion || product.occasions.includes(occasion))).slice(0,3), [mood, occasion])
  const restart = () => { setMood(''); setOccasion(''); setDone(false) }
  return <section className="finder" id="finder">
    <div className="finder__visual"><Suspense fallback={<div className="scent-canvas scent-canvas--loading" />}><ScentSculpture /></Suspense><p>Elegí un tipo de aroma y una ocasión.</p></div>
    <div className="finder__content"><h2>¿Qué perfume buscás?</h2>
      <AnimatePresence mode="wait">{!done ? <motion.div key="questions" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
        <fieldset><legend>¿Qué sensación buscás?</legend><div className="choice-grid">{moods.map((item) => <button className={mood === item ? 'selected' : ''} onClick={() => setMood(item)} key={item}>{mood === item && <Check />} {item}</button>)}</div></fieldset>
        <fieldset><legend>¿Para qué momento?</legend><div className="choice-grid choice-grid--three">{occasions.map((item) => <button className={occasion === item ? 'selected' : ''} onClick={() => setOccasion(item)} key={item}>{occasion === item && <Check />} {item}</button>)}</div></fieldset>
        <button className="button button--accent" disabled={!mood || !occasion} onClick={() => setDone(true)}>Ver recomendaciones <ArrowRight /></button>
      </motion.div> : <motion.div key="results" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}><div className="finder-results">{matches.map((product) => <ProductCard product={product} key={product.id}/>)}</div><button className="text-button" onClick={restart}>Volver a empezar</button></motion.div>}</AnimatePresence>
    </div>
  </section>
}
