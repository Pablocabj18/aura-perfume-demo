import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { CommerceProvider } from './context/CommerceContext'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App(){return <MotionConfig reducedMotion="user"><BrowserRouter><CommerceProvider><Routes><Route element={<Layout/>}><Route path="/" element={<HomePage/>}/><Route path="/catalogo" element={<CatalogPage/>}/><Route path="/producto/:id" element={<ProductPage/>}/><Route path="/favoritos" element={<FavoritesPage/>}/><Route path="*" element={<NotFoundPage/>}/></Route></Routes></CommerceProvider></BrowserRouter></MotionConfig>}
