/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useStore } from '../utils/store'

useGLTF.preload('/models/chassis-draco.glb')

const c = new THREE.Color()
const Chassis = forwardRef(({ args = [1.7, 1, 4], mass = 500, children, ...props }, ref) => {
  const glass = useRef()
  const brake = useRef()
  const wheel = useRef()
  const { nodes, materials } = useGLTF('/models/chassis-draco.glb')
  const [, api] = useBox(() => ({ mass, args, allowSleep: false, onCollide: (e) => console.log('bonk', e.body.userData), ...props }), ref)

  useFrame((_, delta) => {
    const state = useStore.getState()
    const isBreaking = state.controls.brake
    const isCockpit = state.cockpit
    const controls = state.controls
    brake.current.material.color.lerp(c.set(isBreaking ? '#555' : 'white'), delta * 10)
    brake.current.material.emissive.lerp(c.set(isBreaking ? 'red' : 'red'), delta * 10)
    brake.current.material.opacity = THREE.MathUtils.lerp(brake.current.material.opacity, isBreaking ? 1 : 0.3, delta * 10)
    glass.current.material.opacity = THREE.MathUtils.lerp(glass.current.material.opacity, isCockpit ? 0.1 : 0.6, delta)
    wheel.current.rotation.z = THREE.MathUtils.lerp(wheel.current.rotation.z, controls.left ? -Math.PI : controls.right ? Math.PI : 0, delta)
  })

  return (
    <group ref={ref} api={api} dispose={null}>
      <group>
        <mesh castShadow receiveShadow geometry={nodes.Chassis_1.geometry} material={materials.BodyPaint} material-color="#f0c050" />
        <mesh castShadow geometry={nodes.Chassis_2.geometry} material={nodes.Chassis_2.material} material-color="#353535" />
        <mesh castShadow ref={glass} geometry={nodes.Glass.geometry} material={materials.Glass} material-transparent material-color="black" />
        <mesh ref={brake} geometry={nodes.BrakeLights.geometry} material={materials.BrakeLight} material-transparent />
        <mesh geometry={nodes.HeadLights.geometry} material={materials.HeadLight} />
        <mesh geometry={nodes.Cabin_Grilles.geometry} material={materials.Black} />
        <mesh geometry={nodes.Undercarriage.geometry} material={materials.Undercarriage} />
        <mesh geometry={nodes.TurnSignals.geometry} material={materials.TurnSignal} />
        <mesh geometry={nodes.Chrome.geometry} material={nodes.Chrome.material} />
        <group ref={wheel} position={[0.37, 0.25, 0.46]}>
          <mesh geometry={nodes.Wheel_1.geometry} material={nodes.Wheel_1.material} />
          <mesh geometry={nodes.Wheel_2.geometry} material={nodes.Wheel_2.material} />
        </group>
        <group position={[0, 0, 0]}>
          <mesh geometry={nodes.License_1.geometry} material={materials.License} />
          <mesh geometry={nodes.License_2.geometry} material={nodes.License_2.material} />
        </group>
      </group>
      {children}
    </group>
  )
})

export { Chassis }
