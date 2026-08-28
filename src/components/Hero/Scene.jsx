import { useRef, useEffect, useState } from 'react'
import { DitheringShader } from '@/components/ui/dithering-shader.tsx'

export default function Scene() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const requestRef = useRef()
    const targetMousePos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Calculate mouse position relative to center (-1 to 1)
            targetMousePos.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            }
        }

        const animate = () => {
            setMousePos(prev => ({
                x: prev.x + (targetMousePos.current.x - prev.x) * 0.05,
                y: prev.y + (targetMousePos.current.y - prev.y) * 0.05
            }))
            requestRef.current = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', handleMouseMove)
        requestRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(requestRef.current)
        }
    }, [])

    return (
        <div 
            className="hero-scene-wrap"
            style={{
                transform: `
                    perspective(1000px) 
                    rotateX(${-mousePos.y * 10}deg) 
                    rotateY(${mousePos.x * 10}deg)
                    translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)
                `,
                transition: 'transform 0.15s var(--ease-snap)',
                willChange: 'transform'
            }}
        >
            <DitheringShader 
                shape="sphere"
                type="random"
                colorBack="transparent"
                colorFront="#f0e9d6"
                pxSize={2}
                speed={2.5}
                className="hero-shader"
            />
        </div>
    )
}
