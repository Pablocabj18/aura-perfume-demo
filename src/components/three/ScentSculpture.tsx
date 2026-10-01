import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import { useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { Group } from 'three'
import { ProductImage } from '../ui/ProductImage'
import { store } from '../../config/store'

function Bottle() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.24) * 0.32
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.04
  })
  return <group ref={group}>
    <RoundedBox args={[1.5, 2.1, .62]} radius={.18} smoothness={6} position={[0,-.1,0]}>
      <meshPhysicalMaterial color={store.theme.accent} roughness={.1} transmission={.82} thickness={1.6} ior={1.45} transparent opacity={.88} />
    </RoundedBox>
    <mesh position={[0,1.12,0]}><cylinderGeometry args={[.38,.38,.38,48]} /><meshStandardMaterial color="#343a40" metalness={.8} roughness={.2}/></mesh>
    <mesh position={[0,.84,0]}><cylinderGeometry args={[.18,.18,.22,32]} /><meshStandardMaterial color="#d8dde2" metalness={.9} roughness={.12}/></mesh>
  </group>
}

export function ScentSculpture() {
  const reduce = useReducedMotion()
  const visual = useRef<HTMLDivElement>(null)
  const inView = useInView(visual)
  if (reduce) return <div className="scent-canvas scent-canvas--static"><ProductImage index={6} /></div>
  return <div ref={visual} className="scent-canvas" aria-hidden="true"><Canvas frameloop={inView?'always':'never'} camera={{ position:[0,0,5], fov:36 }} dpr={[1,1.5]}><ambientLight intensity={1.4}/><directionalLight position={[3,4,5]} intensity={2.8}/><directionalLight position={[-4,1,2]} color={store.theme.champagne} intensity={1.2}/><pointLight position={[0,-2,3]} color={store.theme.blush} intensity={1.4}/><Float speed={1.2} floatIntensity={.22} rotationIntensity={.1}><Bottle /></Float></Canvas></div>
}
