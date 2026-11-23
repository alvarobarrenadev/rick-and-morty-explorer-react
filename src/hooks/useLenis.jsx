import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Activa el scroll suave de Lenis en toda la página
// Mientras `paused` es true (modal abierto) se detiene para que solo haga scroll el modal
export function useLenis(paused) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      // Deja que el contenido del modal haga scroll nativo
      prevent: (node) => node.closest('.modal__dialog') !== null,
    })
    lenisRef.current = lenis

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (paused) lenisRef.current?.stop()
    else lenisRef.current?.start()
  }, [paused])

  return lenisRef
}
