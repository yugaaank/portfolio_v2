
import { ReactLenis } from 'lenis/react'

function SmoothScrolling({ children }) {
    return (
        <ReactLenis root options={{ 
            lerp: 0.12, 
            duration: 1.5, 
            smoothTouch: true,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        }}>
            {children}
        </ReactLenis>
    )
}

export default SmoothScrolling;
