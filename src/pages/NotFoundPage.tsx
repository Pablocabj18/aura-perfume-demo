import { Link } from 'react-router-dom'
export function NotFoundPage(){return <div className="not-found"><span>404</span><h1>Esta página perdió el rastro.</h1><p>Volvamos a la colección.</p><Link className="button button--dark" to="/">Ir al inicio</Link></div>}
