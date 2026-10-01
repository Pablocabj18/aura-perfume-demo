import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, type CSSProperties } from 'react'
import { store } from '../../config/store'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartDrawer } from '../commerce/CartDrawer'
import { SearchOverlay } from '../commerce/SearchOverlay'

export function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null
      if(target) target.scrollIntoView({behavior:'instant'})
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname,hash])
  const theme = { '--accent':store.theme.accent, '--accent-dark':store.theme.accentDark, '--ink':store.theme.ink, '--canvas':store.theme.canvas, '--surface':store.theme.surface, '--surface-2':store.theme.surfaceMuted, '--muted':store.theme.muted, '--line':store.theme.border, '--blush':store.theme.blush, '--champagne':store.theme.champagne, '--glass':store.theme.glass, '--shadow':store.theme.shadow, '--radius':store.theme.radius, '--sans':`'${store.theme.interfaceFont}', sans-serif`, '--display':`'${store.theme.displayFont}', sans-serif`, '--serif':`'${store.theme.wordmarkFont}', serif` } as CSSProperties
  return <div className="storefront" style={theme}><Header/><main><Outlet/></main><Footer/><CartDrawer/><SearchOverlay/></div>
}
