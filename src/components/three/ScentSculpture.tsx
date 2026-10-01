import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { Group } from 'three'
import { ProductImage } from '../ui/ProductImage'

function Bottle() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.16
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.04
  })
  return <group ref={group}>
    <RoundedBox args={[1.5, 2.1, .62]} radius={.18} smoothness={6} position={[0,-.1,0]}>
      <meshPhysicalMaterial color="#b94f4a" roughness={.1} transmission={.82} thickness={1.6} ior={1.45} transparent opacity={.88} />
    </RoundedBox>
    <mesh position={[0,1.12,0]}><cylinderGeometry args={[.38,.38,.38,48]} /><meshStandardMaterial color="#343a40" metalness={.8} roughness={.2}/></mesh>
    <mesh position={[0,.84,0]}><cylinderGeometry args={[.18,.18,.22,32]} /><meshStandardMaterial color="#d8dde2" metalness={.9} roughness={.12}/></mesh>
  </group>
}

export function ScentSculpture() {
  const reduce = useReducedMotion()
  if (reduce) return <div className="scent-canvas scent-canvas--static"><ProductImage index={6} /></div>
  return <div className="scent-canvas" aria-hidden="true"><Canvas camera={{ position:[0,0,5], fov:36 }} dpr={[1,1.5]}><ambientLight intensity={1.4}/><directionalLight position={[3,4,5]} intensity={2.8}/><directionalLight position={[-4,1,2]} color="#dbe8f2" intensity={1.2}/><pointLight position={[0,-2,3]} color="#d76861" intensity={1.4}/><Float speed={1.2} floatIntensity={.22} rotationIntensity={.1}><Bottle /></Float></Canvas></div>
}
