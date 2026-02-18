import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

const AnimatedShape = ({ mouse }) => {
    const meshRef = useRef(null)

    // Use a ref for distort material to animate it
    const materialRef = useRef(null)

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime()

            // 1. ROTATION
            // Mouse x -> Rotation y 
            // Mouse y -> Rotation x
            // Increased sensitivity for better "shape interaction" feel
            const targetRotX = (mouse.current.y * 1.2) + (t * 0.2)
            const targetRotY = (mouse.current.x * 1.2) + (t * 0.2)

            // Smooth rotation
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05)
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05)

            // 2. DYNAMIC DISTORTION (Optional enhancement)
            // Make the shape distort more when the mouse is further from center?
            // Or just keep it steady. Let's vary speed slightly based on mouse movement speed if possible, 
            // but for now, let's just make the distortion itself slightly responsive to time/mouse.

            // No positional updates (Parallax removed)
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[1, 100, 200]} scale={0.6} ref={meshRef}>
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#f0e9d6"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.1}
                    metalness={1}
                    envMapIntensity={1}
                />
            </Sphere>
        </Float>
    )
}

export default function Scene() {
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event) => {
            mouse.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -5, -10]} intensity={2} color="#d4f53c" />
                <Environment preset="city" />
                <AnimatedShape mouse={mouse} />
            </Canvas>
        </div>
    )
}
