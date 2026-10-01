import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartDrawer } from '../commerce/CartDrawer'
import { SearchOverlay } from '../commerce/SearchOverlay'

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return <><Header/><main><Outlet/></main><Footer/><CartDrawer/><SearchOverlay/></>
}
