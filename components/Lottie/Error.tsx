
import React, { useRef, useEffect } from 'react'
import Lottie from 'lottie-web'
import animationData from 'assets/error.json'

export default function Error() {
    const animation = useRef<any>()

    useEffect(() => {
        Lottie.loadAnimation({
            container: animation.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
        });
        return () => Lottie.stop()
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <div ref={animation} style={{ height: 350, width: 350 }} />
        </div>
    )
}