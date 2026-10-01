import { expect, test } from '@playwright/test'

for (const viewport of [
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
]) {
  test(`visual ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
    await page.screenshot({ path: `screenshots/${viewport.name}.png`, fullPage: viewport.name !== 'tablet-768' })
    await page.screenshot({ path: `screenshots/hero-${viewport.name}.png` })
    await page.locator('.category-section').screenshot({ path:`screenshots/categories-${viewport.name}.png` })
    await page.locator('#finder').screenshot({ path:`screenshots/finder-${viewport.name}.png` })
  })
}

test('commerce journey works', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Tu próximo perfume/i })).toBeVisible()
  await page.getByRole('button', { name: 'Buscar' }).click()
  await page.getByRole('textbox', { name: 'Buscar' }).fill('Chanel')
  await expect(page.locator('.search-result').filter({ hasText: 'Coco Mademoiselle' })).toBeVisible()
  await page.getByRole('button', { name: 'Cerrar búsqueda' }).click()
  await expect(page.locator('.search-overlay')).toBeHidden()
  const firstCard = page.locator('.product-card').first()
  await firstCard.hover()
  await firstCard.getByRole('button', { name: 'Agregar', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Carrito' })).toBeVisible()
  await expect(page.getByText('Subtotal')).toBeVisible()
  await page.getByRole('button', { name: 'Cerrar', exact: true }).click()
})

test('finder progresses, recommends and restarts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'reduce' })
  await page.goto('/#finder')
  const finder = page.locator('#finder')
  await expect(finder.getByRole('button', { name:'Continuar' })).toBeDisabled()
  await finder.getByRole('button', { name:/Fresco/ }).click()
  await finder.getByRole('button', { name:'Continuar' }).click()
  await finder.getByRole('button', { name:/Diario/ }).click()
  await finder.getByRole('button', { name:'Ver recomendaciones' }).click()
  await expect(finder.locator('.product-card')).toHaveCount(3)
  await finder.screenshot({path:'screenshots/finder-results.png'})
  await finder.getByRole('button', { name:'Volver a empezar' }).click()
  await expect(finder.getByRole('heading',{name:'¿Qué aromas te gustan?'})).toBeVisible()
})

test('brand and same-route category navigation filter correctly', async ({ page }) => {
  await page.goto('/')
  await page.locator('.brand-rail').getByRole('link',{name:'Chanel',exact:true}).click()
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(2)
  await page.locator('.desktop-nav').getByRole('link',{name:'Mujer',exact:true}).click()
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(9)
  await page.locator('.desktop-nav').getByRole('link',{name:'Hombre',exact:true}).click()
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(12)
})

for (const width of [390,768,1440]) {
  test(`shopping surfaces ${width}`, async ({page}) => {
    await page.setViewportSize({width,height:900})
    await page.emulateMedia({reducedMotion:'reduce'})
    const errors:string[]=[]
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/catalogo')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
    await page.screenshot({path:`screenshots/catalog-${width}.png`})
    if(width===390) {
      await page.getByRole('button',{name:'Filtrar',exact:true}).click()
      await expect(page.getByRole('dialog',{name:'Filtros'})).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('dialog',{name:'Filtros'})).toBeHidden()
    }
    await page.goto('/producto/dior-sauvage')
    await page.getByRole('button',{name:'Acercar',exact:true}).click()
    await expect(page.locator('.product-gallery__stage')).toHaveClass(/is-detail/)
    await page.getByRole('button',{name:'Vista completa'}).click()
    await page.getByRole('button',{name:'100 ml',exact:true}).click()
    await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}))
    await page.screenshot({path:`screenshots/detail-${width}.png`,fullPage:true})
    await page.screenshot({path:`screenshots/detail-top-${width}.png`})
    await page.getByRole('button',{name:'Agregar al carrito',exact:true}).click()
    await expect(page.getByRole('dialog',{name:'Carrito'})).toBeVisible()
    await expect(page.locator('.cart-item__main')).toContainText('100 ml')
    await page.screenshot({path:`screenshots/cart-${width}.png`})
    await page.getByRole('button',{name:'Finalizar compra demo'}).click()
    await expect(page.getByRole('status')).toContainText('Gracias por probar')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog',{name:'Carrito'})).toBeHidden()
    await page.getByRole('button',{name:'Buscar',exact:true}).click()
    await page.getByRole('textbox',{name:'Buscar',exact:true}).fill('Chanel')
    await expect(page.locator('.search-result')).toHaveCount(2)
    await page.screenshot({path:`screenshots/search-${width}.png`})
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog',{name:'Buscar productos'})).toBeHidden()
    expect(errors).toEqual([])
  })
}

test('motion and the selective 3D finder render without runtime errors', async ({page}) => {
  const errors:string[]=[]
  page.on('pageerror',error => errors.push(error.message))
  await page.setViewportSize({width:1440,height:1000})
  await page.goto('/')
  await expect(page.locator('.hero__commerce')).toBeVisible()
  await page.locator('#finder').scrollIntoViewIfNeeded()
  await expect(page.locator('#finder canvas')).toBeVisible({timeout:20000})
  await page.screenshot({path:'screenshots/finder-motion-1440.png'})
  expect(errors).toEqual([])
})

test('mobile menu, favorites and keyboard focus remain usable', async ({page}) => {
  await page.setViewportSize({width:390,height:844})
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.goto('/')
  await page.getByRole('button',{name:'Abrir menú'}).click()
  await expect(page.getByRole('navigation',{name:'Menú móvil'})).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button',{name:'Abrir menú'})).toBeFocused()
  const card = page.locator('.product-card').first()
  await card.getByRole('button',{name:'Agregar a favoritos'}).click()
  await expect(card.getByRole('button',{name:'Quitar de favoritos'})).toHaveAttribute('aria-pressed','true')
  await page.getByRole('button',{name:'Abrir menú'}).click()
  await page.getByRole('navigation',{name:'Menú móvil'}).getByRole('link',{name:/Favoritos/}).click()
  await expect(page.locator('.product-card')).toHaveCount(1)
  await page.getByRole('button',{name:'Buscar',exact:true}).click()
  await expect(page.getByRole('textbox',{name:'Buscar',exact:true})).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.locator('.search-result').last()).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('textbox',{name:'Buscar',exact:true})).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button',{name:'Buscar',exact:true})).toBeFocused()
})

test('catalog filters and product detail work', async ({ page }) => {
  await page.goto('/catalogo')
  await page.locator('.filters').getByRole('button', { name: /Mujer/ }).click()
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(9)
  await page.locator('.catalog-grid a[aria-label^="Ver"]').first().click()
  await expect(page).toHaveURL(/\/producto\//)
  await expect(page.locator('.product-buy h1')).toBeVisible()
  await page.getByRole('button', { name: 'Agregar al carrito' }).click()
  await expect(page.getByRole('dialog', { name: 'Carrito' })).toBeVisible()
})
