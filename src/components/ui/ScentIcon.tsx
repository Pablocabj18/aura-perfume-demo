export function ScentIcon({ family, className = '' }: { family: string; className?: string }) {
  const paths: Record<string,string> = {
    fresco: 'M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12Z M8 15a4 4 0 0 0 4 4',
    floral: 'M12 9c-7-10-12 1-4 3-10 6 1 12 4 4 3 8 14 2 4-4 8-2 3-13-4-3Z M12 11v3',
    dulce: 'M12 3 21 12 12 21 3 12 12 3Z M8 12h8 M12 8v8',
    amaderado: 'M12 3 5 13h4l-4 5h14l-4-5h4L12 3Z M12 18v4',
    especiado: 'M6 18 18 6 M5 14l5 5 M9 10l5 5 M13 6l5 5 M4 20l2-2 M18 6l2-2',
    Salida: 'M12 20V4 M6 10l6-6 6 6 M5 20h14',
    Corazón: 'M12 19 4 11C-1 4 9 1 12 7c3-6 13-3 8 4l-8 8Z',
    Fondo: 'M4 8h16 M6 12h12 M8 16h8 M10 20h4',
  }
  return <svg className={`scent-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[family] || paths.floral}/></svg>
}
