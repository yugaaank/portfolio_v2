import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei'
import { useRef } from 'react'

const AnimatedShape = () => {
    const meshRef = useRef(null)

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime()

            // Base continuous rotation
            meshRef.current.rotation.z = t * 0.1

            // Interactive rotation based on mouse/pointer position
            meshRef.current.rotation.x = (t * 0.2) + (state.pointer.y * 0.5)
            meshRef.current.rotation.y = (t * 0.3) + (state.pointer.x * 0.5)
        }
    })

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
            <Sphere args={[1, 100, 200]} scale={0.6} ref={meshRef}>
                <MeshDistortMaterial
                    color="#f0e9d6" // Cream color from the design system
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={1}
                    envMapIntensity={1}
                />
            </Sphere>
        </Float>
    )
}

export default function Scene() {
    return (
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
                {/* Ambient light for base illumination */}
                <ambientLight intensity={0.5} />

                {/* Key light */}
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />

                {/* Fill light with the accent color */}
                <pointLight position={[-10, -5, -10]} intensity={2} color="#d4f53c" />

                {/* Add environment reflection for the metallic look */}
                <Environment preset="city" />

                <AnimatedShape />
            </Canvas>
        </div>
    )
}
