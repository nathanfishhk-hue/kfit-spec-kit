'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function GymScene() {
  return (
    <Canvas>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#f97316"
          distort={0.3}
          speed={1}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Canvas>
  )
}