import { ArrowLeft, ArrowRight, Check, Star } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { products } from '../../data/products'
import type { Occasion } from '../../types/product'
import { ProductCard } from './ProductCard'
import { ProductImage } from '../ui/ProductImage'
import { ScentIcon } from '../ui/ScentIcon'

const ScentSculpture = lazy(() => import('../three/ScentSculpture').then((module) => ({ default: module.ScentSculpture })))
const moods = [{id:'fresco',label:'Fresco',detail:'Cítricos y notas acuáticas'},{id:'floral',label:'Floral',detail:'Flores y notas suaves'},{id:'amaderado',label:'Amaderado',detail:'Cedro, vetiver y sándalo'},{id:'dulce',label:'Dulce',detail:'Vainilla y notas gourmand'},{id:'especiado',label:'Especiado',detail:'Canela y especias cálidas'}]
const occasions: {id:Occasion;detail:string}[] = [{id:'Diario',detail:'Para acompañarte todos los días'},{id:'Noche',detail:'Para salir y cambiar de ritmo'},{id:'Especial',detail:'Para una ocasión particular'}]

export function FragranceFinder() {
  const [mood,setMood] = useState('')
  const [occasion,setOccasion] = useState<Occasion | ''>('')
  const [step,setStep] = useState(0)
  const [visible,setVisible] = useState(false)
  const section = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if(entry.isIntersecting) {setVisible(true);observer.disconnect()} },{rootMargin:'200px'}); if(section.current) observer.observe(section.current); return () => observer.disconnect() },[])
  const matches = useMemo(() => products.filter((product) => product.moods.includes(mood) && product.occasions.includes(occasion as Occasion)).slice(0,3),[mood,occasion])
  const restart = () => {setMood('');setOccasion('');setStep(0)}
  return <section className={`finder ${step === 2 ? 'finder--results' : ''}`} id="finder" ref={section}>
    <div className="finder__visual"><div className="finder__identity"><span>Tu guía de fragancias</span><h2>Empezá por<br/>lo que te gusta.</h2><p>Dos preguntas para explorar nuestro catálogo. Sin fórmulas complicadas.</p></div>{visible && !reduce ? <Suspense fallback={<ProductImage index={6}/>}><ScentSculpture/></Suspense> : <div className="scent-canvas scent-canvas--static"><ProductImage index={6}/></div>}<p>Recomendaciones según notas y ocasión. No utiliza IA.</p></div>
    <div className="finder__content"><div className="finder-progress" aria-label={`Paso ${step+1} de 3`}>{['Aroma','Ocasión','Tu selección'].map((label,index) => <span className={step>=index?'active':''} key={label}><i>{step>index ? <Check/> : index+1}</i>{label}</span>)}</div>
      <div className="finder-heading" aria-live="polite"><h3>{step===0?'¿Qué aromas te gustan?':step===1?'¿Cuándo lo usarías?':'Tu selección personal.'}</h3><p>{step===0?'Elegí la familia que más te atrae.':step===1?'El momento también ayuda a elegir.':`${moods.find((item) => item.id===mood)?.label} · ${occasion}`}</p></div>
      <AnimatePresence mode="wait"><motion.div key={step} initial={reduce ? false : {opacity:0,x:16}} animate={{opacity:1,x:0}} exit={reduce ? {opacity:1} : {opacity:0,x:-16}} transition={{duration:.22}}>
        {step===0 && <fieldset><legend className="sr-only">Familia de aroma</legend><div className="choice-grid">{moods.map((item) => <button aria-pressed={mood===item.id} className={mood===item.id?'selected':''} onClick={() => setMood(item.id)} key={item.id}><ScentIcon family={item.id}/><span><b>{item.label}</b><small>{item.detail}</small></span>{mood===item.id && <Check className="choice-check"/>}</button>)}</div></fieldset>}
        {step===1 && <fieldset><legend className="sr-only">Ocasión</legend><div className="choice-grid choice-grid--occasions">{occasions.map((item,index) => <button aria-pressed={occasion===item.id} className={occasion===item.id?'selected':''} onClick={() => setOccasion(item.id)} key={item.id}><span className="occasion-mark">{index===0?'AM':index===1?'PM':<Star/>}</span><span><b>{item.id}</b><small>{item.detail}</small></span>{occasion===item.id && <Check className="choice-check"/>}</button>)}</div></fieldset>}
        {step===2 && (matches.length ? <div className="finder-results">{matches.map((product) => <ProductCard product={product} key={product.id}/>)}</div> : <div className="finder-empty"><p>No tenemos una coincidencia exacta para esta combinación.</p><a className="button button--dark" href="/catalogo">Explorar el catálogo</a></div>)}
        <div className="finder-actions">{step===1 && <button className="text-button" onClick={() => setStep(0)}><ArrowLeft/> Atrás</button>}{step<2 ? <button className="button button--dark" disabled={step===0 ? !mood : !occasion} onClick={() => setStep(step+1)}>{step===0?'Continuar':'Ver recomendaciones'}<ArrowRight/></button> : <button className="text-button" onClick={restart}>Volver a empezar <ArrowRight/></button>}</div>
      </motion.div></AnimatePresence>
    </div>
  </section>
}
