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
    await page.screenshot({ path: `screenshots/${viewport.name}.png`, fullPage: viewport.name !== 'tablet-768' })
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
