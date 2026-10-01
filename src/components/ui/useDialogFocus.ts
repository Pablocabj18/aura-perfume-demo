import { useEffect, useRef } from 'react'

/** Keeps keyboard navigation in the open surface and returns focus to its trigger. */
export function useDialogFocus<T extends HTMLElement>(open: boolean, close: () => void) {
  const ref = useRef<T>(null)
  const closeRef = useRef(close)
  closeRef.current = close
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const dialog = ref.current
    if (!dialog) return
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,[tabindex="0"]')).filter((element) => element.getClientRects().length > 0)
    const first = focusable()[0]
    first?.focus()
    const keydown = (event: KeyboardEvent) => {
      if(event.key==='Escape') {event.preventDefault();closeRef.current();return}
      if(event.key!=='Tab') return
      const elements = focusable()
      if(!elements.length) {event.preventDefault();return}
      const firstElement = elements[0], lastElement = elements[elements.length-1]
      if(event.shiftKey && (document.activeElement===firstElement || !dialog.contains(document.activeElement))) {event.preventDefault();lastElement.focus()}
      else if(!event.shiftKey && (document.activeElement===lastElement || !dialog.contains(document.activeElement))) {event.preventDefault();firstElement.focus()}
    }
    document.addEventListener('keydown',keydown)
    return () => {document.removeEventListener('keydown',keydown);previous?.focus()}
  },[open])
  return ref
}
